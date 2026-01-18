import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
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

        if action == 'edit':
            msg_id = data.get('msgId')
            content = data.get('content')
            if await self.db_edit_message(msg_id, user, content):
                await self.broadcast({'action': 'edit', 'msgId': msg_id, 'content': content})

        elif action == 'delete':
            msg_id = data.get('msgId')
            res = await self.db_delete_message(msg_id, user)
            if res['success']:
                await self.broadcast({'action': 'delete', 'msgId': msg_id, 'is_file': res['is_file']})

        elif action == 'react':
            msg_id = data.get('msgId')
            emoji = data.get('emoji')
            count = await self.db_toggle_reaction(msg_id, user, emoji)
            await self.broadcast({'action': 'react', 'msgId': msg_id, 'emoji': emoji, 'count': count})

    async def broadcast(self, data):
        await self.channel_layer.group_send(self.room_group_name, {'type': 'chat_message', 'data': data})

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event['data']))

    @database_sync_to_async
    def db_edit_message(self, msg_id, user, content):
        return Message.objects.filter(id=msg_id, sender=user).update(content=content)

    @database_sync_to_async
    def db_delete_message(self, msg_id, user):
        try:
            msg = Message.objects.get(id=msg_id, sender=user)
            is_file = "📎 Shared a file: " in msg.content
            if is_file:
                filename = msg.content.replace("📎 Shared a file: ", "").strip()
                SharedFile.objects.filter(room=msg.room, uploader=user, filename=filename).delete()
            msg.delete()
            return {'success': True, 'is_file': is_file}
        except: return {'success': False}

    @database_sync_to_async
    def db_toggle_reaction(self, msg_id, user, emoji):
        from .models import Reaction, Message
        msg = Message.objects.get(id=msg_id)
        # This toggles: if exists -> delete, if not -> create
        react, created = Reaction.objects.get_or_create(message=msg, user=user, emoji=emoji)
        if not created:
            react.delete()

        # Return the new total count for this specific emoji
        return {'count': Reaction.objects.filter(message=msg, emoji=emoji).count()}