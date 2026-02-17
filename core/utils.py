# core/utils.py
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.utils import timezone


def trigger_notification_update(user, message_text="New notification", group_id=None):
    """
    Calculates total unread counts for the navbar and specific group
    unread counts for the group detail page.
    """
    # IMPORT INSIDE FUNCTION to avoid Circular Import Errors
    from .models import GroupInvitation, CourseGroupMatch, ActivityNotification, GroupMembership
    from chat.models import Message

    channel_layer = get_channel_layer()
    profile = getattr(user, 'studentprofile', None)

    if not profile:
        return

    # --- 1. TOTAL COUNTS (For Navbar Bell) ---
    unread_invites = GroupInvitation.objects.filter(invited_student=profile, is_read=False).count()
    unread_matches = CourseGroupMatch.objects.filter(target_student=profile, is_read=False).count()
    unread_activity = ActivityNotification.objects.filter(recipient=user, is_read=False).count()

    total_unread = unread_invites + unread_matches + unread_activity

    # --- 2. GROUP SPECIFIC COUNTS (For Group Detail Page Badges) ---
    group_update_data = {}

    # If we know which group changed, we calculate its specific unread counts
    if group_id:
        membership = GroupMembership.objects.filter(group_id=group_id, student=profile).first()
        if membership:
            # Count messages sent AFTER the user last viewed the chat
            new_msg_count = Message.objects.filter(
                room__group_id=group_id,
                timestamp__gt=membership.last_chat_view
            ).exclude(sender=user).count()

            # Count unread post notifications for this specific group
            new_post_count = ActivityNotification.objects.filter(
                group_id=group_id,
                recipient=user,
                notification_type='post',
                is_read=False
            ).count()

            group_update_data = {
                "group_id": str(group_id),
                "new_messages": new_msg_count,
                "new_posts": new_post_count
            }

    # --- 3. BROADCAST VIA WEBSOCKET ---
    async_to_sync(channel_layer.group_send)(
        f"user_notifications_{user.id}",
        {
            "type": "send_notification",  # Matches method in consumers.py
            "total_count": total_unread,
            "group_update": group_update_data,
            "message": message_text
        }
    )