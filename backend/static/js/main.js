// --- 1. WebSocket Setup ---
const socket = new WebSocket(
  (window.location.protocol === "https:" ? "wss://" : "ws://") +
    window.location.host +
    "/ws/notifications/"
);

socket.onopen = function (e) {
  console.log("WebSocket Connection Established!");
};

// --- 2. THE MERGED MESSAGE HANDLER ---
socket.onmessage = function (e) {
  const data = JSON.parse(e.data);
  console.log("Real-time data received:", data);

  // A. UPDATE THE BADGE (The Count)
  const badge = document.getElementById("unread-count-badge");
  if (badge) {
    // Ensure your backend sends 'count' in the JSON
    badge.innerText = data.count;
    
    if (data.count > 0) {
      badge.style.display = "inline-block";
      // Optional: Add a 'pulse' effect when a new one arrives
      badge.classList.add('pulse-animation'); 
    } else {
      badge.style.display = "none";
    }
  }

  // B. INJECT THE NOTIFICATION ITEM
  const container = document.getElementById("notification-items-container");
  if (container) {
    const noMsg = document.getElementById("no-notifications-msg");
    if (noMsg) noMsg.remove();

    // Only inject if data contains invitation details
    if (data.sender_name && data.group_name) {
        const newHtml = `
            <div class="dropdown-item border-bottom animate__animated animate__fadeIn" style="background-color: #f0f7ff;">
                <div class="d-flex p-1">
                    <div class="flex-shrink-0">
                        <div class="bg-primary rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                            <i class="fas fa-user-plus text-white"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <small class="text-primary fw-bold">Just now</small>
                        <p class="mb-1 text-wrap" style="font-size: 0.9rem;">
                            <strong>${data.sender_name}</strong> invited you to <strong>${data.group_name}</strong>
                        </p>
                        <div class="btn-group btn-group-sm mt-1">
                            <a href="/invitations/accept/${data.invitation_id}/" class="btn btn-success btn-sm">
                                <i class="fas fa-check"></i> Accept
                            </a>
                            <a href="/invitations/decline/${data.invitation_id}/" class="btn btn-outline-secondary btn-sm">
                                <i class="fas fa-times"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("afterbegin", newHtml);
    }
  }
};

// --- 3. CSRF & Mark as Read Logic ---
function getCSRFToken() {
    return document.cookie.split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
}

window.markAsRead = function() {
  const badge = document.getElementById("unread-count-badge");
  // Don't waste a server call if there's nothing to mark
  if (!badge || badge.style.display === "none") return;

  fetch("/notifications/mark-read/", {
    method: "POST",
    headers: {
      "X-CSRFToken": getCSRFToken(),
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      badge.style.display = "none";
      badge.innerText = "0";
      document.querySelectorAll(".dropdown-item").forEach((el) => {
        el.style.backgroundColor = "white";
      });
    }
  });
};