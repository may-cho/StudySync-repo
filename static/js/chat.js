/**
 * StudySync Chat Logic - COMPLETE FIXED VERSION
 */

const roomId = document.getElementById('group-id').value;
const chatSocket = new WebSocket(
    (window.location.protocol === 'https:' ? 'wss://' : 'ws://') 
    + window.location.host + '/ws/chat/' + roomId + '/'
);

// --- 1. WebSocket Listener ---
chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    console.log("Action received:", data.action);

    if (data.action === 'edit') {
        const textElem = document.getElementById(`text-${data.msgId}`);
        if (textElem) textElem.innerText = data.content;
    } 
    else if (data.action === 'delete') {
        if (data.is_file) {
            window.location.reload(); 
        } else {
            const el = document.getElementById(`msg-container-${data.msgId}`);
            if (el) el.remove();
        }
    }
    else if (data.action === 'react') {
        updateReactionUI(data.msgId, data.emoji, data.count);
    }
};

// --- 2. Search Bar Logic (Fixed) ---
document.getElementById('chat-search').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    // We target the top-level container for each message
    const messages = document.querySelectorAll('[id^="msg-container-"]');

    messages.forEach(msg => {
        const text = msg.querySelector('.content-text').innerText.toLowerCase();
        if (text.includes(term)) {
            msg.style.setProperty('display', 'flex', 'important');
        } else {
            msg.style.setProperty('display', 'none', 'important');
        }
    });
});

// --- 3. Action Emitters ---
function saveInlineEdit(msgId) {
    const content = document.getElementById(`input-${msgId}`).value;
    chatSocket.send(JSON.stringify({
        'action': 'edit',
        'msgId': msgId,
        'content': content
    }));
    cancelEdit(msgId);
}

function deleteMessage(msgId) {
    if (!confirm("Delete this message?")) return;
    chatSocket.send(JSON.stringify({
        'action': 'delete',
        'msgId': msgId
    }));
}

function toggleReaction(msgId, emoji) {
    chatSocket.send(JSON.stringify({
        'action': 'react',
        'msgId': msgId,
        'emoji': emoji
    }));
}

// --- 4. UI Helpers ---
function startInlineEdit(msgId) {
    document.getElementById(`text-${msgId}`).classList.add('d-none');
    document.getElementById(`edit-form-${msgId}`).classList.remove('d-none');
}

function cancelEdit(msgId) {
    document.getElementById(`text-${msgId}`).classList.remove('d-none');
    document.getElementById(`edit-form-${msgId}`).classList.add('d-none');
}

function updateReactionUI(msgId, emoji, countData) {
    const container = document.getElementById(`reactions-${msgId}`);
    if (!container) return;

    // Handle both cases: if count is a number or if it's an object {count: X}
    const count = (typeof countData === 'object') ? countData.count : countData;

    let badge = container.querySelector(`[data-emoji="${emoji}"]`);

    if (count > 0) {
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'badge rounded-pill bg-light text-dark border me-1 p-2';
            badge.setAttribute('data-emoji', emoji);
            badge.style.cursor = 'pointer';
            badge.onclick = () => toggleReaction(msgId, emoji);
            container.appendChild(badge);
        }
        badge.innerText = `${emoji} ${count}`;
    } else if (badge) {
        badge.remove();
    }
}

// --- 5. File Upload Logic ---
function handleFileUpload(input) {
    if (input.files.length === 0) return;
    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const icon = document.getElementById('paperclip-icon');
    const spinner = document.getElementById('upload-spinner');
    icon.classList.add('d-none');
    spinner.classList.remove('d-none');

    fetch(input.dataset.uploadUrl, {
        method: 'POST',
        body: formData,
        headers: { 'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value }
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) window.location.reload();
        else alert("Upload failed");
    })
    .catch(() => {
        icon.classList.remove('d-none');
        spinner.classList.add('d-none');
    });
}