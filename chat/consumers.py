import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.utils import timezone
from django.db.models import Count
from .models import ChatRoom, Message, SharedFile, Reaction


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = f'chat_{self.room_id}'

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get('action')
        user = self.scope['user']

        # -----------------------
        # SEND MESSAGE
        # -----------------------
        if action == 'send':
            content = data.get('content')
            message = await self.db_create_message(content)

            # ✅ TRIGGER NOTIFICATIONS FOR OTHER MEMBERS
            await self.notify_other_members(user)

            profile_pic = None
            if hasattr(user, 'profile') and user.profile.image:
                profile_pic = user.profile.image.url

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message_handler',  # Renamed to avoid collision
                    'action': 'new_message',
                    'msgId': str(message.id),
                    'username': user.username,
                    'profile_pic': profile_pic,
                    'content': message.content,
                    'timestamp': str(message.timestamp)
                }
            )

        # -----------------------
        # EDIT/DELETE/REACTION (Unchanged logic)
        # -----------------------
        elif action == 'edit':
            msg_id = data.get('msgId')
            content = data.get('content')
            updated = await self.db_edit_message(msg_id, user, content)
            if updated:
                await self.broadcast({'action': 'edit', 'msgId': str(msg_id), 'content': content})

        elif action == 'delete':
            msg_id = data.get('msgId')
            deleted = await self.db_delete_message(msg_id, user)
            if deleted:
                await self.broadcast({'action': 'delete', 'msgId': str(msg_id)})

        elif action == 'react':
            msg_id = data.get('msgId')
            emoji = data.get('emoji')
            reactions = await self.db_toggle_reaction(msg_id, user, emoji)
            await self.broadcast({'action': 'reaction_update', 'msgId': str(msg_id), 'reactions': reactions})

        # -----------------------
        # CALL & WebRTC LOGIC
        # -----------------------
        elif action == 'call':
            is_member = await self.is_group_member(user)
            if not is_member:
                await self.send(text_data=json.dumps({'action': 'call_denied', 'message': 'Unauthorized'}))
                return

            allowed = await self.is_call_allowed()
            if allowed:
                await self.broadcast({'action': 'call', 'sender': user.username, 'data': data.get('data')})
            else:
                await self.send(
                    text_data=json.dumps({'action': 'call_denied', 'message': 'Only allowed during study time.'}))

        elif action in ["webrtc_offer", "webrtc_answer", "webrtc_ice_candidate"]:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": f"handle_{action}",
                    "data": data,
                    "sender": user.id,
                }
            )

    # ------------------------------------------------------------------
    # ✅ NOTIFICATION DISPATCHER
    # ------------------------------------------------------------------
    async def notify_other_members(self, sender):
        """
        Calls trigger_notification_update for every member EXCEPT the sender.
        """
        from core.models import GroupMembership
        from core.utils import trigger_notification_update

        @database_sync_to_async
        def get_members():
            room = ChatRoom.objects.get(id=self.room_id)
            # Find all members except sender
            return list(GroupMembership.objects.filter(
                group=room.group
            ).exclude(student__user=sender).select_related('student__user'))

        memberships = await get_members()

        for member in memberships:
            # We pass group_id so it calculates group-specific unread badges too
            trigger_notification_update(
                member.student.user,
                message_text=f"New message from {sender.username}",
                group_id=member.group.id
            )

    # ------------------------------------------------------------------
    # BROADCAST HELPERS
    # ------------------------------------------------------------------
    async def chat_message_handler(self, event):
        # This handles the 'chat_message_handler' type sent in the 'send' action
        await self.send(text_data=json.dumps(event))

    async def broadcast(self, data):
        await self.channel_layer.group_send(
            self.room_group_name,
            {'type': 'simple_broadcast', 'data': data}
        )

    async def simple_broadcast(self, event):
        await self.send(text_data=json.dumps(event['data']))

    # WebRTC Handlers
    async def handle_webrtc_offer(self, event):
        if self.scope["user"].id != event["sender"]:
            await self.send(text_data=json.dumps({"action": "webrtc_offer", **event["data"]}))

    async def handle_webrtc_answer(self, event):
        if self.scope["user"].id != event["sender"]:
            await self.send(text_data=json.dumps({"action": "webrtc_answer", **event["data"]}))

    async def handle_webrtc_ice_candidate(self, event):
        if self.scope["user"].id != event["sender"]:
            await self.send(text_data=json.dumps({"action": "webrtc_ice_candidate", **event["data"]}))

    # ------------------------------------------------------------------
    # DATABASE ACCESS (SYNC TO ASYNC)
    # ------------------------------------------------------------------
    @database_sync_to_async
    def db_create_message(self, content):
        room = ChatRoom.objects.get(id=self.room_id)
        return Message.objects.create(room=room, sender=self.scope['user'], content=content)

    @database_sync_to_async
    def is_call_allowed(self):
        try:
            room = ChatRoom.objects.get(id=self.room_id)
            group = room.group
            now = timezone.localtime(timezone.now())
            day_map = {'Mon': 0, 'Tue': 1, 'Wed': 2, 'Thu': 3, 'Fri': 4, 'Sat': 5, 'Sun': 6}
            allowed_weekday = day_map.get(group.study_day)

            if allowed_weekday is None or now.weekday() != allowed_weekday:
                return False
            if not (group.start_time and group.end_time):
                return False
            return group.start_time <= now.time() <= group.end_time
        except:
            return False

    @database_sync_to_async
    def is_group_member(self, user):
        from core.models import GroupMembership
        try:
            room = ChatRoom.objects.get(id=self.room_id)
            group = room.group
            return group.creator == user or GroupMembership.objects.filter(group=group, student__user=user).exists()
        except:
            return False

    @database_sync_to_async
    def db_edit_message(self, msg_id, user, content):
        return Message.objects.filter(id=msg_id, sender=user).update(content=content)

    @database_sync_to_async
    def db_delete_message(self, msg_id, user):
        try:
            import os
            msg = Message.objects.get(id=msg_id, sender=user)
            # ... existing file deletion logic ...
            msg.delete()
            return True
        except:
            return False

    @database_sync_to_async
    def db_toggle_reaction(self, msg_id, user, emoji):
        try:
            msg = Message.objects.get(id=msg_id)
            react, created = Reaction.objects.get_or_create(message=msg, user=user, emoji=emoji)
            if not created: react.delete()
            counts = Reaction.objects.filter(message=msg).values('emoji').annotate(total=Count('id'))
            return list(counts)
        except:
            return None