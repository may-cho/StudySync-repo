from django.urls import path
from . import views

urlpatterns = [
    path('<uuid:group_id>/', views.group_chat, name='chat_room'),
    path('chat/api/upload/<uuid:room_id>/', views.upload_file, name='upload_file'),
    path('message/<uuid:message_id>/edit/', views.edit_message, name='edit_message'),
    path('message/<uuid:message_id>/delete/', views.delete_message, name='delete_message'),
    path('file/<int:file_id>/delete/', views.delete_file, name='delete_file'),
    path('group/<uuid:group_id>/posts/', views.group_posts, name='group_posts'),
    path('post/<uuid:post_id>/like/', views.toggle_post_like, name='toggle_post_like'),
    path('comment/<uuid:comment_id>/like/', views.toggle_comment_like, name='toggle_comment_like'),
    path('posts/<uuid:post_id>/comment/', views.add_comment, name='add_comment'),
    path('post/<uuid:post_id>/delete/', views.delete_post, name='delete_post'),
    path('post/<uuid:post_id>/edit/', views.edit_post, name='edit_post'),
    path('comment/<uuid:comment_id>/delete/', views.delete_comment, name='delete_comment'),
    path('comment/<uuid:comment_id>/edit/', views.edit_comment, name='edit_comment'),


    
]