import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import ChatRoom, Message, SharedFile, Reaction

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import ChatRoom, Message, Reaction
from django.db.models import Count

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

            profile_pic = None
            if hasattr(user, 'profile') and user.profile.image:
                # Ensure we get the URL string correctly
                profile_pic = user.profile.image.url

            # Broadcast to the group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',  # This calls a method named chat_message
                    'action': 'new_message',
                    'msgId': str(message.id),
                    'username': user.username,
                    'profile_pic': profile_pic,
                    'content': message.content,
                    'timestamp': str(message.timestamp)
                }
            )

        # -----------------------
        # EDIT MESSAGE
        # -----------------------
        elif action == 'edit':
            msg_id = data.get('msgId')
            content = data.get('content')

            updated = await self.db_edit_message(msg_id, user, content)

            if updated:
                await self.broadcast({
                    'action': 'edit',
                    'msgId': str(msg_id),
                    'content': content
                })

        # -----------------------
        # DELETE MESSAGE
        # -----------------------
        elif action == 'delete':
            msg_id = data.get('msgId')

            deleted = await self.db_delete_message(msg_id, user)

            if deleted:
                await self.broadcast({
                    'action': 'delete',
                    'msgId': str(msg_id)
                })

        # -----------------------
        # REACTION (NO REFRESH)
        # -----------------------
        elif action == 'react':
            msg_id = data.get('msgId')
            emoji = data.get('emoji')

            reactions = await self.db_toggle_reaction(msg_id, user, emoji)

            await self.broadcast({
                'action': 'reaction_update',
                'msgId': str(msg_id),
                'reactions': reactions
            })




        elif action == 'call':

            # Check if user is group member or creator

            is_member = await self.is_group_member(user)

            if not is_member:
                await self.send(text_data=json.dumps({

                    'action': 'call_denied',

                    'message': 'You are not allowed to start a call in this group.'

                }))

                return

            # Check timetable restriction

            allowed = await self.is_call_allowed()

            if allowed:

                await self.broadcast({

                    'action': 'call',

                    'sender': user.username,

                    'data': data.get('data')

                })

            else:

                await self.send(text_data=json.dumps({

                    'action': 'call_denied',

                    'message': 'Video call is only allowed during scheduled study time.'

                }))

        elif action == "webrtc_offer":
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "webrtc_offer",
                    "offer": data["offer"],
                    "sender": self.scope["user"].id,
                }
            )

        elif action == "webrtc_answer":
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "webrtc_answer",
                    "answer": data["answer"],
                    "sender": self.scope["user"].id,
                }
            )

        elif action == "webrtc_ice_candidate":
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "webrtc_ice_candidate",
                    "candidate": data["candidate"],
                    "sender": self.scope["user"].id,
                }
            )

    async def webrtc_offer(self, event):
        if self.scope["user"].id != event["sender"]:
            await self.send(text_data=json.dumps({
                "action": "webrtc_offer",
                "offer": event["offer"],
                "sender": event["sender"],
            }))

    async def webrtc_answer(self, event):
        if self.scope["user"].id != event["sender"]:
            await self.send(text_data=json.dumps({
                "action": "webrtc_answer",
                "answer": event["answer"],
                "sender": event["sender"],
            }))

    async def webrtc_ice_candidate(self, event):
        if self.scope["user"].id != event["sender"]:
            await self.send(text_data=json.dumps({
                "action": "webrtc_ice_candidate",
                "candidate": event["candidate"],
                "sender": event["sender"],
            }))

    async def broadcast(self, data):
        await self.channel_layer.group_send(
            self.room_group_name,
            {'type': 'chat_message', 'data': data}
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event['data']))

    @database_sync_to_async
    def is_call_allowed(self):


        try:
            room = ChatRoom.objects.get(id=self.room_id)
            group = room.group
            now = timezone.localtime(timezone.now())

            day_map = {
                'Mon': 0, 'Tue': 1, 'Wed': 2,
                'Thu': 3, 'Fri': 4, 'Sat': 5, 'Sun': 6
            }

            allowed_weekday = day_map.get(group.study_day)

            if allowed_weekday is None:
                return False

            if now.weekday() != allowed_weekday:
                return False

            if not group.start_time or not group.end_time:
                return False

            current_time = now.time()

            return group.start_time <= current_time <= group.end_time

        except Exception as e:
            print(f"Call permission error: {e}")
            return False

    @database_sync_to_async
    def is_group_member(self, user):
        from core.models import ChatRoom, GroupMembership
        try:
            room = ChatRoom.objects.get(id=self.room_id)
            group = room.group

            # Check creator
            if group.creator == user:
                return True

            # Check membership
            return GroupMembership.objects.filter(
                group=group,
                student__user=user
            ).exists()

        except Exception as e:
            print(f"Membership check error: {e}")
            return False

    @database_sync_to_async
    def db_create_message(self, content):
        room = ChatRoom.objects.get(id=self.room_id)
        return Message.objects.create(room=room, sender=self.scope['user'], content=content)

    @database_sync_to_async
    def db_edit_message(self, msg_id, user, content):
        return Message.objects.filter(id=msg_id, sender=user).update(content=content)

    @database_sync_to_async
    def db_delete_message(self, msg_id, user):
        try:
            import os
            msg = Message.objects.get(id=msg_id, sender=user)

            # Logic to delete associated file from Resources sidebar
            if "📎 Shared a file:" in msg.content and "|" in msg.content:
                try:
                    file_url = msg.content.split('|')[1].strip()
                    filename_part = file_url.split('/')[-1]
                    shared_file = SharedFile.objects.filter(
                        room=msg.room,
                        file__icontains=filename_part
                    ).first()

                    if shared_file:
                        if shared_file.file and os.path.isfile(shared_file.file.path):
                            os.remove(shared_file.file.path)
                        shared_file.delete()
                except Exception as e:
                    print(f"File deletion error: {e}")

            msg.delete()
            return True
        except Exception as e:
            print(f"Delete error: {e}")
            return False



    @database_sync_to_async
    def db_toggle_reaction(self, msg_id, user, emoji):
        try:
            msg = Message.objects.get(id=msg_id)
            # Use filter().delete() or get_or_create to toggle
            react, created = Reaction.objects.get_or_create(message=msg, user=user, emoji=emoji)
            if not created:
                react.delete()

            # Get updated counts for this message to sync all clients
            counts = Reaction.objects.filter(message=msg).values('emoji').annotate(total=Count('id'))
            return list(counts)  # Returns [{'emoji': '👍', 'total': 1}, ...]
        except Message.DoesNotExist:
            return None