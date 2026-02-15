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

        if action == 'send':
            content = data.get('content')
            # If it's a real message, save it.
            # If it's just our upload trigger, we still broadcast to refresh the UI.
            if content != 'file_uploaded_refresh_trigger':
                await self.db_create_message(content)

            # This 'refresh' action in the broadcast is what triggers location.reload()
            # in everyone's browser via the onmessage handler.
            await self.broadcast({'action': 'refresh'})
        elif action == 'edit':
            msg_id = data.get('msgId')
            content = data.get('content')
            if await self.db_edit_message(msg_id, user, content):
                await self.broadcast({'action': 'edit', 'msgId': str(msg_id), 'content': content})

        elif action == 'delete':
            msg_id = data.get('msgId')
            if await self.db_delete_message(msg_id, user):
                await self.broadcast({'action': 'delete', 'msgId': str(msg_id)})

        elif action == 'react':
            msg_id = data.get('msgId')
            emoji = data.get('emoji')
            await self.db_toggle_reaction(msg_id, user, emoji)
            await self.broadcast({'action': 'refresh'})



        elif action == 'call':

            # Check if call is allowed by timetable

            allowed = await self.is_call_allowed()

            if allowed:

                await self.broadcast({

                    'action': 'call',

                    'sender': user.username,

                    'data': data.get('data')

                })

            else:

                # Optional: notify only sender that call is not allowed

                await self.send(text_data=json.dumps({

                    'action': 'call_denied',

                    'message': 'Video call is only allowed during scheduled study time.'

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
        from django.utils import timezone
        from core.models import StudyGroup, ChatRoom
        try:
            room = ChatRoom.objects.get(id=self.room_id)
            group = room.group
            now = timezone.localtime(timezone.now())

            day_map = {'Mon': 0, 'Tue': 1, 'Wed': 2, 'Thu': 3, 'Fri': 4, 'Sat': 5, 'Sun': 6}
            allowed_weekday = day_map.get(group.study_day)

            # Check if today is the study day
            if now.weekday() == allowed_weekday:
                current_time = now.time()
                # Ensure start and end times exist and check range
                if group.start_time and group.end_time:
                    if group.start_time <= current_time <= group.end_time:
                        return True
            return False
        except Exception as e:
            print(f"Call permission error: {e}")
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
        msg = Message.objects.get(id=msg_id)
        react, created = Reaction.objects.get_or_create(message=msg, user=user, emoji=emoji)
        if not created: react.delete()