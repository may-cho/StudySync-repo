import os

from django.db import models
from django.contrib.auth.models import User
from core.models import StudyGroup, StudentProfile
import uuid


class ChatRoom(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    group = models.OneToOneField(StudyGroup, on_delete=models.CASCADE, related_name='chat_room')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat: {self.group.name} - {self.id}"


class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(blank=True,null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=5,default='text')
    
    #for file type messages
    file_name = models.TextField(blank=True,null=True)
    file_url = models.TextField(blank=True,null=True)
    file_type = models.CharField(blank=True,null=True,max_length=50)
    file_size = models.TextField(blank=True,null=True)
    
    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.sender.username}: {self.content[:50]}"


class SharedFile(models.Model):
    FILE_TYPE_CHOICES = [
        ('pdf', 'PDF'),
        ('doc', 'Document'),
        ('image', 'Image'),
        ('presentation', 'Presentation'),
        ('spreadsheet', 'Spreadsheet'),
        ('archive', 'Archive'),
        ('audio', 'Audio'),
        ('video', 'Video'),
        ('other', 'Other'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='files')
    uploader = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField(upload_to='study_files/%Y/%m/%d/')
    filename = models.CharField(max_length=255)
    file_type = models.CharField(max_length=50, choices=FILE_TYPE_CHOICES)
    file_size = models.IntegerField(null=True, blank=True)
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-uploaded_at']

    def __str__(self):
        return self.filename


class GroupPost(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # FIX: Point to the 'core' app's StudyGroup model
    group = models.ForeignKey(
        'core.StudyGroup',
        on_delete=models.CASCADE,
        related_name='posts'
    )
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    image = models.ImageField(upload_to='post_images/', blank=True, null=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Post by {self.author.username}"

    @property
    def total_likes(self):
        return self.likes.count()

class PostComment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post = models.ForeignKey(GroupPost, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    likes = models.ManyToManyField(User, related_name='liked_comments', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    @property
    def total_likes(self):
        return self.likes.count()

class Reaction(models.Model):
    message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name='reactions')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    emoji = models.CharField(max_length=10) # Stores the emoji character e.g. "👍"

    class Meta:
        unique_together = ('message', 'user', 'emoji') # One user can only react with one specific emoji once per message

    def __str__(self):
        return f"{self.user.username} - {self.emoji}"
