import uuid
from django.db import models
from django.contrib.auth.models import User

class ChatRoom(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    group = models.OneToOneField(
        'groups.StudyGroup', 
        on_delete=models.CASCADE, 
        related_name='chat_room'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat: {self.group.name}"

class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=10, default='text') # Increased max_length slightly
    
    # Metadata for file-type messages
    file_name = models.TextField(blank=True, null=True)
    file_url = models.TextField(blank=True, null=True)
    file_type = models.CharField(blank=True, null=True, max_length=50)
    file_size = models.TextField(blank=True, null=True)
    
    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        # Handle case where content might be null (e.g., file-only message)
        display_content = self.content[:50] if self.content else f"File: {self.file_name}"
        return f"{self.sender.username}: {display_content}"

class SharedFile(models.Model):
    FILE_TYPE_CHOICES = [
        ('pdf', 'PDF'), ('doc', 'Document'), ('image', 'Image'),
        ('presentation', 'Presentation'), ('spreadsheet', 'Spreadsheet'),
        ('archive', 'Archive'), ('audio', 'Audio'), ('video', 'Video'), ('other', 'Other'),
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

class Reaction(models.Model):
    message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name='reactions')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    emoji = models.CharField(max_length=10) 

    class Meta:
        unique_together = ('message', 'user', 'emoji')