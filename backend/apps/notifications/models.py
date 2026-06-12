from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

import uuid

class Notification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    recipient = models.ForeignKey("auth.User", on_delete=models.CASCADE, related_name='notifications')
    sender = models.ForeignKey("auth.User", on_delete=models.SET_NULL, null=True, blank=True)
    
    verb = models.CharField(max_length=255) # e.g., "invited you to", "liked your post"
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    # --- The Generic Link ---
    # This replaces post_id, group_id, etc.
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.UUIDField() # or CharField if you mix ID types
    target = GenericForeignKey('content_type', 'object_id')

    class Meta:
        ordering = ['-created_at']