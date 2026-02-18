import json
from channels.generic.websocket import AsyncWebsocketConsumer

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        if self.user.is_authenticated:
            # Create a unique group name for this specific user
            self.group_name = f"user_notifications_{self.user.id}"
            await self.channel_layer.group_add(self.group_name, self.channel_name)
            await self.accept()
        else :
            await self.close()

    async def disconnect(self, close_code):
        if hasattr(self,'group_name'):
            await self.channel_layer.group_discard(self.group_name, self.channel_name)

    # This method is called when we send a message to the group
    async def send_notification(self, event):

        # Use .get() to provide a default value (0) if 'count' isn't in the event
        message = event.get('message', 'New notification')
        count = event.get('count', 0)
        group_update = event.get('group_update', {})
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'count': count,
            'group_update': group_update
        }))

        await self.send(text_data=json.dumps(event))

