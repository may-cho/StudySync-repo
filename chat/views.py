from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import os
from core.models import StudyGroup, GroupMembership
from .models import ChatRoom, Message, SharedFile,GroupPost,PostComment
import json


@login_required
def group_chat(request, group_id):
    group = get_object_or_404(StudyGroup, id=group_id)

    # Check if user is member of the group
    is_member = GroupMembership.objects.filter(
        group=group,
        student__user=request.user
    ).exists()

    if not is_member:
        return JsonResponse({'error': 'Access denied'}, status=403)

    # Get or create chat room
    chat_room, created = ChatRoom.objects.get_or_create(group=group)

    # Get recent messages
    messages = Message.objects.filter(room=chat_room).order_by('timestamp')[:50]

    # Get shared files
    files = SharedFile.objects.filter(room=chat_room).order_by('-uploaded_at')[:20]

    context = {
        'group': group,
        'chat_room': chat_room,
        'messages': messages,
        'files': files,
        'user_id': request.user.id,
        'username': request.user.username,
    }
    return render(request, 'chat/group_chat.html', context)


@login_required
def delete_message(request, message_id):
    message = get_object_or_404(Message, id=message_id)

    membership = GroupMembership.objects.filter(
        group=message.room.group,
        student__user=request.user
    ).first()

    if message.sender == request.user or (membership and membership.is_admin):
        message.delete()
        return JsonResponse({'success': True})

    return JsonResponse({'success': False, 'error': 'Permission denied'})


@login_required
@csrf_exempt
def upload_file(request, room_id):
    if request.method == 'POST' and request.FILES.get('file'):
        chat_room = get_object_or_404(ChatRoom, id=room_id)

        # Check if user has access to this chat room
        is_member = GroupMembership.objects.filter(
            group=chat_room.group,
            student__user=request.user
        ).exists()

        if not is_member:
            return JsonResponse({'error': 'Access denied'}, status=403)

        uploaded_file = request.FILES['file']
        description = request.POST.get('description', '')

        # Check file size
        if uploaded_file.size > settings.FILE_UPLOAD_MAX_MEMORY_SIZE:
            return JsonResponse({'error': 'File size too large'}, status=400)

        # Determine file type
        file_ext = uploaded_file.name.split('.')[-1].lower()
        file_type_map = {
            'pdf': 'pdf',
            'doc': 'doc', 'docx': 'doc',
            'ppt': 'presentation', 'pptx': 'presentation',
            'xls': 'spreadsheet', 'xlsx': 'spreadsheet',
            'jpg': 'image', 'jpeg': 'image', 'png': 'image', 'gif': 'image',
            'zip': 'archive', 'rar': 'archive', '7z': 'archive',
        }
        file_type = file_type_map.get(file_ext, 'other')

        # Save file
        shared_file = SharedFile.objects.create(
            room=chat_room,
            uploader=request.user,
            file=uploaded_file,
            filename=uploaded_file.name,
            file_type=file_type,
            file_size=uploaded_file.size,
            description=description
        )

        return JsonResponse({
            'success': True,
            'file_id': str(shared_file.id),
            'filename': shared_file.filename,
            'file_url': shared_file.file.url,
            'file_type': shared_file.file_type,
            'uploader': request.user.username,
            'uploaded_at': shared_file.uploaded_at.isoformat(),
        })

    return JsonResponse({'error': 'Invalid request'}, status=400)


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

    # Only uploader or group admin can delete
    if shared_file.uploader != request.user:
        group_admin = GroupMembership.objects.filter(
            group=shared_file.room.group,
            student__user=request.user,
            is_admin=True
        ).exists()
        if not group_admin:
            return HttpResponseForbidden("You cannot delete this file")

    # Delete file from storage
    if os.path.isfile(shared_file.file.path):
        os.remove(shared_file.file.path)

    shared_file.delete()
    return JsonResponse({'success': True})

@login_required
def group_posts(request, group_id):
    group = get_object_or_404(StudyGroup, id=group_id)

    # Security: only group members
    is_member = GroupMembership.objects.filter(
        group=group,
        student__user=request.user
    ).exists()

    if not is_member:
        return redirect('group_detail', group.id)

    # 🔴 CREATE POST (POST-REDIRECT-GET pattern)
    if request.method == 'POST':
        content = request.POST.get('content')

        if content:
            GroupPost.objects.create(
                group=group,
                author=request.user,
                content=content
            )

        # ✅ THIS LINE PREVENTS DUPLICATES
        return redirect('group_posts', group_id=group.id)

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

    # Authorization: Ensure only the author can edit
    if comment.author != request.user:
        return redirect('group_posts', group_id=comment.post.group.id)

    if request.method == 'POST':
        comment.content = request.POST.get('content')
        comment.save()
        return redirect('group_posts', group_id=comment.post.group.id)

    return render(request, 'chat/edit_comment.html', {'comment': comment})



