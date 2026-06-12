from .models import GroupInvitation, CourseGroupMatch, ActivityNotification


def notification_counts(request):
    if request.user.is_authenticated:
        try:
            profile = request.user.studentprofile

            # 1. Unread Group Invitations
            unread_invites = GroupInvitation.objects.filter(
                invited_student=profile,
                is_read=False,
                status='pending'
            ).count()

            # 2. Unread Study Partner Matches
            unread_matches = CourseGroupMatch.objects.filter(
                target_student=profile,
                is_read=False,
                status='pending'
            ).count()

            # 3. Unread Activity (Likes, Comments, Replies, Posts)
            # This covers the general activity feed
            unread_activity = ActivityNotification.objects.filter(
                recipient=request.user,
                is_read=False
            ).count()

            return {
                'unread_notifications_count': unread_invites + unread_matches + unread_activity
            }
        except Exception:
            # It's safer to catch Exception specifically or handle StudentProfile.DoesNotExist
            return {'unread_notifications_count': 0}

    return {'unread_notifications_count': 0}