from django.urls import path
from . import views

urlpatterns = [
    path('<uuid:group_id>/', views.group_chat, name='group_chat'),
    path('message/<int:message_id>/delete/', views.delete_message, name='delete_message'),
    path('file/<int:file_id>/delete/', views.delete_file, name='delete_file'),
    path('api/upload/<uuid:room_id>/', views.upload_file, name='upload_file'),
]