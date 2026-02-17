from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import os
from core.models import StudyGroup, GroupMembership
from .models import ChatRoom, Message, SharedFile,GroupPost,PostComment, Reaction
import json
from django.http import JsonResponse
from django.db.models import Count
from django.http import HttpResponseForbidden
from django.contrib.auth.models import User
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from django.utils import timezone
from django.db.models import Count
from django.shortcuts import render, get_object_or_404, redirect
from .models import ChatRoom, Message, SharedFile
from core.models import StudyGroup, GroupMembership


@login_required
def group_chat(request, group_id):
    group = get_object_or_404(StudyGroup, id=group_id)

    # 1. Fetch membership and handle unread count logic
    membership = GroupMembership.objects.filter(
        group=group,
        student__user=request.user
    ).first()

    if not membership:
        return redirect('dashboard')

    # Update timestamp so the unread badge clears
    membership.last_chat_view = timezone.now()
    membership.save()

    # 2. Get or Create ChatRoom
    chat_room, created = ChatRoom.objects.get_or_create(group=group)

    # ---------------------------
    # ✅ IMPROVED VIDEO CALL LOGIC
    # ---------------------------
    now = timezone.localtime(timezone.now())

    # Using strftime('%a') ensures 'Mon', 'Tue' etc matches your group.study_day exactly
    current_day_str = now.strftime('%a')
    is_timetable_active = False

    if group.study_day == current_day_str:
        if group.start_time and group.end_time:
            # Direct time comparison
            current_time = now.time()
            if group.start_time <= current_time <= group.end_time:
                is_timetable_active = True

    # ---------------------------
    # 3. Fetch messages and reactions
    # ---------------------------
    chat_messages = Message.objects.filter(room=chat_room) \
        .prefetch_related('reactions') \
        .order_by('timestamp')

    for message in chat_messages:
        message.reaction_counts = (
            message.reactions.values('emoji')
            .annotate(total=Count('id'))
        )

    files = SharedFile.objects.filter(room=chat_room).order_by('-uploaded_at')

    return render(request, 'chat/group_chat.html', {
        'group': group,
        'chat_room': chat_room,
        'chat_messages': chat_messages,
        'files': files,
        'is_timetable_active': is_timetable_active,
        'is_creator': (group.creator.user == request.user),
    })



@login_required
def edit_message(request, message_id):
    message = get_object_or_404(Message, id=message_id, sender=request.user)
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            message.content = data.get('content')
            message.save()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    return JsonResponse({'success': False})


@login_required
def delete_message(request, message_id):
    message = get_object_or_404(Message, id=message_id)

    if message.sender != request.user:
        return HttpResponseForbidden("You cannot delete this message")

    if "|" in message.content:
        try:
            file_url = message.content.split('|')[1].strip()
            filename_part = file_url.split('/')[-1]
            # Precise filtering to ensure we don't delete the wrong file
            from core.models import SharedFile
            shared_file = SharedFile.objects.filter(
                room=message.room,
                file__icontains=filename_part
            ).first()

            if shared_file:
                if shared_file.file and os.path.isfile(shared_file.file.path):
                    os.remove(shared_file.file.path)
                shared_file.delete()
        except Exception as e:
            print(f"File deletion error: {e}")

    message.delete()
    return JsonResponse({'success': True})


@login_required
def upload_file(request, room_id):
    if request.method == 'POST' and request.FILES.get('file'):
        group = get_object_or_404(StudyGroup, id=room_id)
        chat_room, _ = ChatRoom.objects.get_or_create(group=group)
        uploaded_file = request.FILES['file']

        shared_instance = SharedFile.objects.create(
            room=chat_room,
            uploader=request.user,
            file=uploaded_file,
            filename=uploaded_file.name
        )

        file_msg = f"📎 Shared a file: {uploaded_file.name}|{shared_instance.file.url}"

        message = Message.objects.create(
            room=chat_room,
            sender=request.user,
            content=file_msg
        )

        # ✅ NEW: Broadcast to the WebSocket group so everyone sees it instantly
        channel_layer = get_channel_layer()
        profile_pic = None
        if hasattr(request.user, 'profile') and request.user.profile.image:
            profile_pic = request.user.profile.image.url

        async_to_sync(channel_layer.group_send)(
            f'chat_{room_id}',  # Must match the room_group_name in your Consumer
            {
                'type': 'chat_message',
                'action': 'new_message',
                'msgId': str(message.id),
                'username': request.user.username,
                'profile_pic': profile_pic,
                'content': file_msg,
                'timestamp': 'Just now'
            }
        )

        return JsonResponse({'success': True, 'message': file_msg})

    return JsonResponse({'success': False, 'error': 'Invalid request'})

@login_required
def get_messages(request, room_id):
    chat_room = get_object_or_404(ChatRoom, id=room_id)
    last_message_id = request.GET.get('last_id', 0)

    # Get new messages
    messages = Message.objects.filter(
        room=chat_room,
        id__gt=last_message_id
    ).order_by('timestamp')

    messages_data = []
    for msg in messages:
        messages_data.append({
            'id': msg.id,
            'content': msg.content,
            'sender': msg.sender.username,
            'sender_id': msg.sender.id,
            'timestamp': msg.timestamp.isoformat(),
        })

    return JsonResponse({'messages': messages_data})


@login_required
def delete_file(request, file_id):
    shared_file = get_object_or_404(SharedFile, id=file_id)

    if shared_file.uploader != request.user:
        group_admin = GroupMembership.objects.filter(
            group=shared_file.room.group,
            student__user=request.user,
            is_admin=True
        ).exists()
        if not group_admin:
            return HttpResponseForbidden("You cannot delete this file")

    if shared_file.file and os.path.isfile(shared_file.file.path):
        os.remove(shared_file.file.path)

    shared_file.delete()
    return JsonResponse({'success': True})


@login_required
def toggle_reaction(request, message_id):
    if request.method == 'POST':
        # Use UUID or ID as appropriate
        message = get_object_or_404(Message, id=message_id)
        try:
            data = json.loads(request.body)
            emoji = data.get('emoji', '👍').strip()  # .strip() ensures no hidden spaces

            # Check if this exact reaction already exists
            existing_reaction = Reaction.objects.filter(
                message=message,
                user=request.user,
                emoji=emoji
            )

            if existing_reaction.exists():
                # If found, delete it (this is the "Unlike" action)
                existing_reaction.delete()
                return JsonResponse({'success': True, 'action': 'removed'})
            else:
                # If not found, create it (this is the "Like" action)
                Reaction.objects.create(
                    message=message,
                    user=request.user,
                    emoji=emoji
                )
                return JsonResponse({'success': True, 'action': 'added'})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    return JsonResponse({'success': False})


from django.utils import timezone
from core.models import GroupMembership, ActivityNotification
from core.utils import trigger_notification_update  # Using the helper we created


@login_required
def group_posts(request, group_id):
    group = get_object_or_404(StudyGroup, id=group_id)

    # 1. Fetch the specific membership object
    membership = GroupMembership.objects.filter(
        group=group,
        student__user=request.user
    ).first()

    if not membership:
        return redirect('group_detail', group_id=group.id)

    # 2. ✅ CLEAR UNREAD BADGE: Update the last_feed_view timestamp
    membership.last_feed_view = timezone.now()
    membership.save()

    # 3. Handle New Post Creation
    if request.method == 'POST':
        content = request.POST.get('content')
        image = request.FILES.get('image')

        if content or image:
            new_post = GroupPost.objects.create(
                group=group,
                author=request.user,
                content=content,
                image=image
            )

            # 4. ✅ NOTIFY MEMBERS: Create notifications for all other members
            other_memberships = group.memberships.exclude(student__user=request.user)

            for member_ship in other_memberships:
                # Optional: Only notify via ActivityNotification model if you want
                # posts to show up in the "All Notifications" list
                ActivityNotification.objects.create(
                    recipient=member_ship.student.user,
                    sender=request.user,
                    notification_type='comment',  # Or add 'post' to your TYPES
                    group_id=group.id,
                    post_id=str(new_post.id),
                    content_preview=f"New post: {content[:30]}" if content else "Shared an image"
                )

                # Trigger live WebSocket update for each member
                trigger_notification_update(
                    member_ship.student.user,
                    f"{request.user.username} posted in {group.name}"
                )

        return redirect('group_posts', group_id=group.id)

    # 5. Fetch existing posts
    posts = GroupPost.objects.filter(group=group).order_by('-created_at')

    return render(request, 'chat/group_posts.html', {
        'group': group,
        'posts': posts,
        'user': request.user
    })


@login_required
def add_comment(request, post_id):
    post = get_object_or_404(GroupPost, id=post_id)

    is_member = GroupMembership.objects.filter(
        group=post.group,
        student__user=request.user
    ).exists()

    if not is_member:
        return HttpResponseForbidden("Access denied")

    if request.method == 'POST':
        content = request.POST.get('content')
        if content:
            PostComment.objects.create(
                post=post,
                author=request.user,
                content=content
            )

    return redirect('group_posts', group_id=post.group.id)

@login_required
def delete_post(request, post_id):
    post = get_object_or_404(GroupPost, id=post_id)

    if post.author != request.user:
        return redirect('group_posts', group_id=post.group.id)

    post.delete()
    return redirect('group_posts', group_id=post.group.id)

@login_required
def edit_post(request, post_id):
    post = get_object_or_404(GroupPost, id=post_id)

    if post.author != request.user:
        return redirect('group_posts', group_id=post.group.id)

    if request.method == 'POST':
        post.content = request.POST.get('content')
        post.save()
        return redirect('group_posts', group_id=post.group.id)

    return render(request, 'chat/edit_post.html', {'post': post})

@login_required
def delete_comment(request, comment_id):
    comment = get_object_or_404(PostComment, id=comment_id)

    if comment.author != request.user:
        return redirect('group_posts', group_id=comment.post.group.id)

    comment.delete()
    return redirect('group_posts', group_id=comment.post.group.id)


@login_required
def edit_comment(request, comment_id):
    comment = get_object_or_404(PostComment, id=comment_id)

    # Authorization
    if comment.author != request.user:
        return redirect('group_posts', group_id=comment.post.group.id)

    if request.method == 'POST':
        content = request.POST.get('content')
        if content:
            comment.content = content
            comment.save()

    # Always redirect back to the group feed
    return redirect('group_posts', group_id=comment.post.group.id)

@login_required
def toggle_post_like(request, post_id):
    post = get_object_or_404(GroupPost, id=post_id)
    if request.user in post.likes.all():
        post.likes.remove(request.user)
    else:
        post.likes.add(request.user)
    return redirect('group_posts', group_id=post.group.id)


@login_required
def toggle_comment_like(request, comment_id):
    comment = get_object_or_404(PostComment, id=comment_id)

    # Toggle logic
    if request.user in comment.likes.all():
        comment.likes.remove(request.user)
    else:
        comment.likes.add(request.user)

    # Redirect back to the feed
    return redirect('group_posts', group_id=comment.post.group.id)



