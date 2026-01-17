from django.urls import path
from . import views

urlpatterns = [
    path('<uuid:group_id>/', views.group_chat, name='group_chat'),
    path('message/<int:message_id>/delete/', views.delete_message, name='delete_message'),
    path('file/<int:file_id>/delete/', views.delete_file, name='delete_file'),
    path('api/upload/<uuid:room_id>/', views.upload_file, name='upload_file'),
    path('<uuid:group_id>/posts/', views.group_posts, name='group_posts'),
    path('posts/<uuid:post_id>/comment/', views.add_comment, name='add_comment'),
    path('post/<uuid:post_id>/delete/', views.delete_post, name='delete_post'),
    path('post/<uuid:post_id>/edit/', views.edit_post, name='edit_post'),
    path('comment/<uuid:comment_id>/delete/', views.delete_comment, name='delete_comment'),
    path('comment/<uuid:comment_id>/edit/', views.edit_comment, name='edit_comment'),


    
]