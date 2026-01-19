from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import os
from core.models import StudyGroup, GroupMembership
from .models import ChatRoom, Message, SharedFile,GroupPost,PostComment
import json
from django.http import JsonResponse
from django.db.models import Count
from django.http import HttpResponseForbidden


@login_required
def group_chat(request, group_id):
    group = get_object_or_404(StudyGroup, id=group_id)

    is_member = GroupMembership.objects.filter(group=group, student__user=request.user).exists()
    if not is_member:
        return redirect('dashboard')

    chat_room, created = ChatRoom.objects.get_or_create(group=group)

    if request.method == 'POST' and 'content' in request.POST:
        content = request.POST.get('content')
        if content:
            Message.objects.create(
                room=chat_room,
                sender=request.user,
                content=content
            )
        return redirect(request.path_info)

    # UPDATED: Fetch messages with reactions attached
    chat_messages = Message.objects.filter(room=chat_room).prefetch_related('reactions').order_by('timestamp')

    # Process reaction counts for the template
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
    })


@login_required
def edit_message(request, message_id): # message_id will now be a UUID object
    if request.method == 'POST':
        # Use get_object_or_404 with the UUID
        message = get_object_or_404(Message, id=message_id, sender=request.user)
        try:
            data = json.loads(request.body)
            new_content = data.get('content')
            if new_content:
                message.content = new_content
                message.save()
                return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    return JsonResponse({'success': False})


@login_required
def delete_message(request, message_id):
    if request.method == 'POST':
        # 1. Get the message (ensuring the user owns it)
        message = get_object_or_404(Message, id=message_id, sender=request.user)

        # 2. Check if this message represents a file upload
        # We look for the "📎 Shared a file: " prefix we created in the upload view
        if "📎 Shared a file: " in message.content:
            filename = message.content.replace("📎 Shared a file: ", "").strip()

            # Find the file in this room with this filename uploaded by this user
            file_to_delete = SharedFile.objects.filter(
                room=message.room,
                uploader=request.user,
                filename=filename
            ).first()

            if file_to_delete:
                file_to_delete.delete()  # This removes the database record and file

        # 3. Delete the chat message itself
        message.delete()

        return JsonResponse({'success': True})

    return JsonResponse({'success': False})


@login_required
def upload_file(request, room_id):  # Changed from group_id to room_id
    if request.method == 'POST' and request.FILES.get('file'):
        # Use the ID coming from the URL to find the group
        group = get_object_or_404(StudyGroup, id=room_id)

        # Get the chat room associated with this group
        chat_room, _ = ChatRoom.objects.get_or_create(group=group)

        uploaded_file = request.FILES['file']

        # 1. Create the SharedFile record
        SharedFile.objects.create(
            room=chat_room,
            uploader=request.user,
            file=uploaded_file,
            filename=uploaded_file.name
        )

        # 2. Create a notification message in the chat history
        Message.objects.create(
            room=chat_room,
            sender=request.user,
            content=f"📎 Shared a file: {uploaded_file.name}"
        )

        return JsonResponse({'success': True})

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

    # Updated membership check based on your core models (StudentProfile relationship)
    is_member = GroupMembership.objects.filter(
        group=group,
        student__user=request.user
    ).exists()

    if not is_member:
        return redirect('group_detail', group_id=group.id)

    if request.method == 'POST':
        content = request.POST.get('content')
        image = request.FILES.get('image') # Handle the image file

        if content or image:
            GroupPost.objects.create(
                group=group,
                author=request.user,
                content=content,
                image=image
            )
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



