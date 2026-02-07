# core/context_processors.py
from .models import GroupInvitation, CourseGroupMatch


def notification_counts(request):
    if request.user.is_authenticated:
        try:
            profile = request.user.studentprofile
            unread_invites = GroupInvitation.objects.filter(
                invited_student=profile,
                is_read=False,
                status='pending'
            ).count()

            unread_matches = CourseGroupMatch.objects.filter(
                target_student=profile,
                is_read=False,
                status='pending'
            ).count()

            return {
                'unread_notifications_count': unread_invites + unread_matches
            }
        except:
            return {'unread_notifications_count': 0}
    return {'unread_notifications_count': 0}