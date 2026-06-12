from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.utils import timezone

def trigger_notification_update(user, message_text="New notification", group_id=None):
    """
    Calculates total unread counts and broadcasts via WebSockets.
    """
    from apps.groups.models import GroupMembership, GroupApplication
    
    from apps.notifications.models import Notification
    
    from apps.messaging.models import Message

    channel_layer = get_channel_layer()
    # Looking for the profile linked to the User model
    profile = getattr(user, 'studentprofile', None)

    if not profile:
        return

    # --- 1. TOTAL COUNTS ---
    # We use 'GroupApplication' filtered by 'invite' to replace the old 'GroupInvitation'
    unread_invites = GroupApplication.objects.filter(
        student=profile, 
        side='invite', 
        status='pending'
    ).count()

    # Generic activity notifications (likes, mentions, etc.)
    unread_activity = Notification.objects.filter(
        recipient=user, 
        is_read=False
    ).count()

    total_unread = unread_invites + unread_activity

    # --- 2. GROUP SPECIFIC COUNTS ---
    group_update_data = {}

    if group_id:
        membership = GroupMembership.objects.filter(
            group_id=group_id, 
            student=profile
        ).first()
        
        if membership:
            # Check for messages in the specific room linked to this group
            # Note: Ensure GroupMembership has a 'last_chat_view' field
            # If it doesn't exist yet, you may need to add it to GroupMembership models
            last_view = getattr(membership, 'last_chat_view', timezone.now())
            
            new_msg_count = Message.objects.filter(
                room__group_id=group_id,
                timestamp__gt=last_view
            ).exclude(sender=user).count()

            new_post_count = Notification.objects.filter(
                group_id=group_id,
                recipient=user,
                status='pending', # Or is_read=False depending on your notification model
                is_read=False
            ).count()

            group_update_data = {
                "group_id": str(group_id),
                "new_messages": new_msg_count,
                "new_posts": new_post_count
            }

    # --- 3. BROADCAST ---
    async_to_sync(channel_layer.group_send)(
        f"user_notifications_{user.id}",
        {
            "type": "send_notification", 
            "count": total_unread,
            "group_update": group_update_data,
            "message": message_text
        }
    )