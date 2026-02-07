from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    # re_path is used because WebSocket URLs often benefit from regex
    # for strict pattern matching
    re_path(r'ws/notifications/$', consumers.NotificationConsumer.as_asgi()),
]