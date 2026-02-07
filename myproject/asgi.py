import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator

# Import your routing files
from core.routing import websocket_urlpatterns as core_urls
import chat.routing as chat_urls

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'studysync.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(
                # Concatenate the lists using +
                chat_urls.websocket_urlpatterns + core_urls
            )
        )
    ),
})