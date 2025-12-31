import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import User
from .models import ChatRoom, Message


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = f'chat_{self.room_id}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        # Send last 50 messages
        messages = await self.get_last_messages()
        await self.send(text_data=json.dumps({
            'type': 'initial_messages',
            'messages': messages
        }))

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message_type = data.get('type')

        if message_type == 'chat_message':
            message_content = data['message']
            user = self.scope['user']

            # Save message to database
            saved_message = await self.save_message(message_content, user)

            # Broadcast to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message_content,
                    'sender': user.username,
                    'sender_id': user.id,
                    'message_id': str(saved_message['id']),
                    'timestamp': saved_message['timestamp'],
                }
            )

        elif message_type == 'typing':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'typing_indicator',
                    'user': self.scope['user'].username,
                    'is_typing': data['is_typing']
                }
            )

        elif message_type == 'file_shared':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'file_notification',
                    'filename': data['filename'],
                    'uploader': self.scope['user'].username,
                    'file_url': data['file_url'],
                }
            )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'type': 'chat_message',
            'message': event['message'],
            'sender': event['sender'],
            'sender_id': event['sender_id'],
            'message_id': event['message_id'],
            'timestamp': event['timestamp'],
        }))

    async def typing_indicator(self, event):
        await self.send(text_data=json.dumps({
            'type': 'typing',
            'user': event['user'],
            'is_typing': event['is_typing']
        }))

    async def file_notification(self, event):
        await self.send(text_data=json.dumps({
            'type': 'file_shared',
            'filename': event['filename'],
            'uploader': event['uploader'],
            'file_url': event['file_url'],
        }))

    @database_sync_to_async
    def save_message(self, content, user):
        room = ChatRoom.objects.get(id=self.room_id)
        message = Message.objects.create(
            room=room,
            sender=user,
            content=content
        )
        return {
            'id': message.id,
            'timestamp': message.timestamp.isoformat()
        }

    @database_sync_to_async
    def get_last_messages(self):
        room = ChatRoom.objects.get(id=self.room_id)
        messages = Message.objects.filter(room=room).order_by('-timestamp')[:50]

        message_list = []
        for msg in reversed(messages):
            message_list.append({
                'id': str(msg.id),
                'content': msg.content,
                'sender': msg.sender.username,
                'sender_id': msg.sender.id,
                'timestamp': msg.timestamp.isoformat(),
            })

        return message_list