//const socket = new WebSocket(
//    (window.location.protocol === 'https:' ? 'wss://' : 'ws://')
//    + window.location.host
//    + '/ws/notifications/'
//);
//
//socket.onmessage = function(e) {
//    const data = JSON.parse(e.data);
//    const badge = document.getElementById('unread-count-badge');
//
//    if (badge) {
//        badge.innerText = data.count;
//        if (data.count > 0) {
//            badge.style.display = 'inline-block';
//        } else {
//            badge.style.display = 'none';
//        }
//    } else {
//        // If badge doesn't exist yet, you might need to inject the HTML
//        // into the notification icon container
//        location.reload(); // Simple fallback: refresh to show new badge
//    }
//
//    // Optional: Show a small "Toast" notification like Facebook
//    alert(data.message);
//};
//
//socket.onmessage = function(e) {
//    const data = JSON.parse(e.data);
//
//    // 1. Update Badge
//    const badge = document.getElementById('unread-count-badge');
//    if (badge) {
//        badge.innerText = data.count;
//        badge.style.display = 'block';
//    }
//
//    // 2. Prep the Notification Item
//    const container = document.getElementById('notification-items-container');
//    const noMsg = document.getElementById('no-notifications-msg');
//    if (noMsg) noMsg.remove();
//
//    // 3. Build the HTML dynamically
//    const newHtml = `
//        <div class="dropdown-item border-bottom animate__animated animate__fadeIn" style="background-color: #f0f7ff;">
//            <div class="d-flex p-1">
//                <div class="flex-shrink-0">
//                    <div class="bg-primary rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
//                        <i class="fas fa-user-plus text-white"></i>
//                    </div>
//                </div>
//                <div class="flex-grow-1 ms-3">
//                    <small class="text-primary fw-bold">Just now</small>
//                    <p class="mb-1 text-wrap" style="font-size: 0.9rem;">
//                        <strong>${data.sender_name}</strong> invited you to <strong>${data.group_name}</strong>
//                    </p>
//                    <div class="btn-group btn-group-sm mt-1">
//                        <a href="/invitations/accept/${data.invitation_id}/" class="btn btn-success btn-sm">
//                            <i class="fas fa-check"></i> Accept
//                        </a>
//                        <a href="/invitations/decline/${data.invitation_id}/" class="btn btn-outline-secondary btn-sm">
//                            <i class="fas fa-times"></i>
//                        </a>
//                    </div>
//                </div>
//            </div>
//        </div>
//    `;
//
//    container.insertAdjacentHTML('afterbegin', newHtml);
//};
//
//function markAsRead() {
//    const badge = document.getElementById('unread-count-badge');
//    if (!badge || badge.style.display === 'none') return;
//
//    fetch('/notifications/mark-read/', { // Ensure this URL matches your urls.py
//        method: 'POST',
//        headers: {
//            'X-CSRFToken': '{{ csrf_token }}',
//            'Content-Type': 'application/json'
//        }
//    }).then(response => {
//        if (response.ok) {
//            badge.style.display = 'none';
//            // Optional: Change background of "new" items to white
//            document.querySelectorAll('.dropdown-item').forEach(el => {
//                el.style.backgroundColor = 'white';
//            });
//        }
//    });
//}
//socket.onmessage = function(e) {
//    const data = JSON.parse(e.data);
//
//    if (data.type === 'new_message' && data.group_id === "{{ group.id }}") {
//        const badge = document.getElementById('chat-badge');
//        if (badge) {
//            let count = parseInt(badge.innerText.replace('+', '')) || 0;
//            count++;
//            badge.innerText = count > 99 ? '99+' : count;
//            badge.style.display = 'block';
//        } else {
//            // If badge didn't exist, reload or inject the HTML for a badge starting at 1
//            location.reload();
//        }
//    }
//};

notificationSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);

    // 1. Update Navbar Total
    const totalBadge = document.getElementById('notification-badge');
    if (totalBadge) {
        totalBadge.innerText = data.total_count;
        data.total_count > 0 ? totalBadge.classList.remove('d-none') : totalBadge.classList.add('d-none');
    }

    // 2. Update Group Detail Badges (if user is on that specific page)
    if (data.group_update && data.group_update.group_id) {
        const gId = data.group_update.group_id;

        // Chat Badge
        const chatBadge = document.getElementById(`chat-badge-${gId}`);
        if (chatBadge) {
            chatBadge.innerText = data.group_update.new_messages;
            data.group_update.new_messages > 0 ? chatBadge.classList.remove('d-none') : chatBadge.classList.add('d-none');
        }

        // Post Badge
        const postBadge = document.getElementById(`posts-badge-${gId}`);
        if (postBadge) {
            postBadge.innerText = data.group_update.new_posts;
            data.group_update.new_posts > 0 ? postBadge.classList.remove('d-none') : postBadge.classList.add('d-none');
        }
    }
};