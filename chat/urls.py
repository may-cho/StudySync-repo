from django.urls import path
from . import views

urlpatterns = [
    path('api/<uuid:group_id>/',views.get_chat_data,name="get_chat_data"),
    path('<uuid:group_id>/', views.group_chat, name='chat_room'),
    path('api/upload/', views.upload_file, name='upload_file'),
    path('message/<uuid:message_id>/edit/', views.edit_message, name='edit_message'),
    path('message/<uuid:message_id>/delete/', views.delete_message, name='delete_message'),
    path('file/<int:file_id>/delete/', views.delete_file, name='delete_file'),
    path('message/<uuid:message_id>/react/', views.toggle_reaction, name='toggle_reaction'),
    path('group/<uuid:group_id>/live-session/',views.live_session, name="live-session"),
   


    
]