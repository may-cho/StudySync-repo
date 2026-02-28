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
from django.contrib import messages

from django.utils import timezone
from django.db.models import Count
from django.shortcuts import render, get_object_or_404, redirect
from .models import ChatRoom, Message, SharedFile
from core.models import StudyGroup, GroupMembership
from django.core.cache import cache


@login_required
def get_chat_data(request, group_id):
    group  =  get_object_or_404(StudyGroup, id=group_id)
    group_members = GroupMembership.objects.filter(group=group).select_related('student')
    
    chat_room,created = ChatRoom.objects.get_or_create(group=group)
    messages = Message.objects.filter(room=chat_room).prefetch_related('reactions').order_by('timestamp')
    shared_files = SharedFile.objects.filter(room=chat_room).order_by("-uploaded_at")
    
    #update current user's last_seen_status
    membership = GroupMembership.objects.get(group=group,student__user=request.user)
    membership.last_chat_view = timezone.now()
    membership.save()

    
    members_data = []
    
    for mem in group.memberships.all():
        status = get_user_status(mem.student.user.id)
        members_data.append({
                "id": mem.student.user.id,
                "username": mem.student.user.username,
                "profile": mem.student.profile_picture.url if mem.student.profile_picture else None,
                "firstname": mem.student.user.first_name,
                "lastname": mem.student.user.last_name,
                "status": status
            
        })
    data_json = {
        'members': members_data,
        'group_name': group.name,
        'messages': [
            {
                "id" : message.id,
                "sender": message.sender.username,
                "message": message.content,
                "message_type": message.type,
                "time": message.timestamp,
                "file_url": message.file_url,
                "file_name": message.file_name,
                "file_type": message.file_type,
                "file_size": message.file_size
            } for message in messages
        ],
        'shared_files': [
            {
                "id": file.id,
                "file_name": file.filename,
                "file_type" : file.file_type,
                "uploader": file.uploader.username,
                "file_url": file.file.url,
                "file_size": file.file_size,
                "uploaded_at": file.uploaded_at
            } for file in shared_files
        ]
    }    
    data_json.update({
        'status': 200,'message': 'success'
    })
    return JsonResponse(data_json)
def get_user_status(user_id):
    is_present = cache.get(f'presence_{user_id}')
    
    if is_present == "online":
        return "online"
    return "offline"


@login_required
def group_chat(request, group_id):
    group = get_object_or_404(StudyGroup, id=group_id)
    
    
    membership = GroupMembership.objects.filter(
        group=group,
        student__user=request.user
    ).first()

    if not membership:
        return redirect('dashboard')

    group_members = GroupMembership.objects.filter(group=group)

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
    messages = Message.objects.filter(room=chat_room).prefetch_related('reactions') .order_by('timestamp')

    for message in messages:
        message.reaction_counts = (
            message.reactions.values('emoji')
            .annotate(total=Count('id'))
        )

    files = SharedFile.objects.filter(room=chat_room).order_by('-uploaded_at')

    return render(request, 'chat/group_chat.html', {
        'group': group,
        'chat_room': chat_room,
        'chat-messages': messages,
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
def upload_file(request):
    if request.method == 'POST' and request.FILES.get('file'):
        group_id = request.POST.get('group_id')
        group = get_object_or_404(StudyGroup, id=group_id)
        chat_room = get_object_or_404(ChatRoom, group=group)
        uploaded_file = request.FILES['file']
        
        ext = os.path.splitext(uploaded_file.name)[1].lower()
        
        print(f" here is {ext}");
        type_map = {
        '.pdf': 'pdf',
        '.docx': 'doc', '.doc': 'doc',
        '.jpg': 'image', '.png': 'image', '.jpeg': 'image',
        '.zip': 'archive', '.rar': 'archive',
        '.pptx': 'presentation','.ppt': 'presentation','.xlsx': 'spreadsheet',
        '.xls': 'spreadsheet','.csv': 'spreadsheet',
        '.mp3' : 'audio','.wav': 'audio','.mp4': 'video',
        '.mkv': 'video'
        
        }
        final_type = type_map.get(ext,'other')
        
        

        shared_instance = SharedFile.objects.create(
            room=chat_room,
            uploader=request.user,
            file=uploaded_file,
            filename=uploaded_file.name,
            file_type=final_type,
            file_size=uploaded_file.size
        )
        
        data_json = {
            'file_name': shared_instance.filename,
            'file_url': shared_instance.file.url,
            'file_type': shared_instance.file_type,
            'file_size': shared_instance.file_size 
        }

        return JsonResponse({'success': True,'data': data_json})

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
            # ✅ NEW: Notify post author about the comment
            if post.author != request.user:
                ActivityNotification.objects.create(
                    recipient=post.author,
                    sender=request.user,
                    notification_type='comment',
                    group=post.group,
                    content_preview=content[:30],
                    is_read=False
                )
                # Trigger live update
                trigger_notification_update(post.author, f"{request.user.username} commented on your post.")

    return redirect('group_posts', group_id=post.group.id)


@login_required
def delete_post(request, post_id):
    post = get_object_or_404(GroupPost, id=post_id)
    group = post.group

    # Permission Check: Allow deletion if user is the Author OR the Group Creator
    # (Assuming group.creator is a StudentProfile and request.user has a .studentprofile)
    is_author = (post.author == request.user)
    is_group_creator = (group.creator.user == request.user)

    if is_author or is_group_creator:
        post.delete()
        messages.success(request, "Post has been removed.")
    else:
        messages.error(request, "You do not have permission to take down this post.")

    return redirect('group_posts', group_id=group.id)

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

        # ✅ NEW: Create notification for the post author
        if post.author != request.user:
            ActivityNotification.objects.create(
                recipient=post.author,
                sender=request.user,
                notification_type='like',
                group=post.group,
                content_preview=post.content[:30] if post.content else "Liked your photo",
                is_read=False
            )
            # Trigger real-time WebSocket update
            trigger_notification_update(post.author, f"{request.user.username} liked your post.")

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



