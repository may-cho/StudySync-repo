<template>
  <div class="bento-chat-container">
    <div class="bento-layout">
      <!-- Left Sidebar - Members Only (Bento Card) -->
      <aside class="bento-sidebar">
        <div class="sidebar-header">
          <div class="sidebar-brand">
            <div class="brand-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2.5"
              >
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                />
              </svg>
            </div>
            <span class="brand-name">StudySync</span>
          </div>
          <div class="sidebar-badge">{{ groupMembers?.length }} members</div>
        </div>

        <div class="sidebar-section">
          <div class="section-header">
            <span class="section-title">MEMBERS</span>
            <span class="online-count">{{ online_count }} online</span>
          </div>
          <div class="members-list">
            <div
              v-for="member in groupMembers"
              :key="member.id"
              class="member-card"
            >
              <div class="member-avatar-wrapper">
                <div
                  class="member-avatar"
                  :style="{ backgroundColor: getAvatarColor(member.username) }"
                >
                  {{ member.username.charAt(0).toUpperCase() }}
                </div>
                <div :class="['status-dot', member.status]"></div>
              </div>
              <div class="member-details">
                <div class="member-name">{{ member.username }}</div>
                <div class="member-status-text">
                  {{ member.status === "online" ? "Online" : "Away" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Chat Area (Bento Card) -->
      <main class="bento-main">
        <!-- Chat Header -->
        <div class="chat-header">
          <div class="header-info">
            <h1 class="group-name">{{ groupName }}</h1>
            <div class="group-meta">
              <span class="meta-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {{ groupMembers?.length }} members
              </span>
              <span class="meta-item online">
                <span class="online-dot"></span>
                {{ online_count }} online
              </span>
            </div>
          </div>
          <button
            class="video-button"
            @click="startVideoCall"
            title="Start Video Call"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M23 7L16 12L23 17V7Z" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </button>
        </div>

        <!-- Messages Area -->
        <div class="messages-container" ref="messagesContainer">
          <div v-for="msg in messages" :key="msg.id" class="message-group">
            <div
              :class="[
                'message-row',
                msg.sender === currentUser ? 'own-message' : 'peer-message',
              ]"
            >
              <div class="message-bubble">
                <div class="message-header">
                  <span class="message-sender">{{ msg.sender }}</span>
                  <span class="message-time">{{ formatTime(msg.time) }}</span>
                </div>

                <!-- Text Message -->
                <div v-if="msg.message_type === 'text'" class="text-content">
                  {{ msg.message }}
                </div>

                <!-- File Message -->
                <a
                  v-else-if="msg.message_type === 'file'"
                  :href="'http://127.0.0.1:8000' + msg.file_url"
                  :download="msg.file_name"
                  target="_blank"
                  class="file-link"
                >
                  <div
                    class="file-preview"
                    :class="{ 'own-file': msg.sender === currentUser }"
                  >
                    <div
                      class="file-icon-wrapper"
                      :class="msg.file_type?.toLowerCase()"
                    >
                      <!-- Image files -->
                      <svg
                        v-if="msg.file_type == 'image'"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>

                      <!-- PDF files -->
                      <svg
                        v-else-if="msg.file_type === 'pdf'"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                        />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="M9 15h6" />
                        <path d="M9 18h4" />
                        <circle cx="16" cy="15" r="1" fill="currentColor" />
                      </svg>

                      <!-- Default file -->
                      <svg
                        v-else
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                        />
                        <polyline points="13 2 13 9 20 9" />
                      </svg>
                    </div>
                    <div class="file-details">
                      <div class="file-name">{{ msg.file_name }}</div>
                      <div class="file-meta">
                        {{ msg.file_type?.toUpperCase() }} •
                        {{ formatSize(msg.file_size) }}
                      </div>
                    </div>
                    <div class="file-download-icon">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="input-area">
          <div class="input-wrapper">
            <button class="attach-btn" @click="triggerFileUpload">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59723 22 8.00502 22C6.41281 22 4.88584 21.3658 3.76002 20.24C2.6342 19.1142 2 17.5872 2 15.995C2 14.4028 2.6342 12.8758 3.76002 11.75L12.33 3.18"
                />
                <path d="M16 8L8 16" />
              </svg>
            </button>
            <input
              type="file"
              ref="fileInput"
              class="file-input"
              @change="handleFileSelected"
            />
            <input
              type="text"
              v-model="newMessage"
              @keyup.enter="send"
              placeholder="Type a message..."
              class="message-input"
            />
            <button class="send-btn" @click="send">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </main>

      <!-- Right Sidebar - Resources Only (Bento Card) -->
      <aside class="bento-resources">
        <div class="resources-header">
          <div class="resources-title">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
              />
            </svg>
            <h3>Resources</h3>
          </div>
          <span class="resources-count">{{ resources.length }}</span>
        </div>

        <div class="resources-list">
          <a
            v-for="file in resources"
            :key="file.id"
            :href="'http://127.0.0.1:8000' + file.file_url"
            :download="file.file_name"
            target="_blank"
            class="resource-item"
          >
            <div class="resource-icon" :class="file.file_type?.toLowerCase()">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                />
                <polyline points="13 2 13 9 20 9" />
              </svg>
            </div>
            <div class="resource-content">
              <div class="resource-name">{{ file.file_name }}</div>
              <div class="resource-meta">
                <span class="resource-uploader">{{ file.uploader }}</span>
                <span class="resource-size">{{
                  formatSize(file.file_size)
                }}</span>
              </div>
            </div>
            <div class="resource-download">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
          </a>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {
  ref,
  onMounted,
  onUnmounted,
  shallowRef,
  nextTick,
  computed,
} from "vue";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

let chatSocket = shallowRef(null);
const groupId = ref(null);
const fileInput = ref(null);
const groupName = ref(null);
const groupMembers = ref([]);
const messages = ref([]);
const resources = ref([]);
const props = defineProps({ currentUser: [String] });
const newMessage = ref("");
const messagesContainer = ref(null);

// Helper function to generate consistent avatar colors
const getAvatarColor = (username) => {
  const colors = [
    "#4158D0",
    "#C850C0",
    "#0093E9",
    "#80D0C7",
    "#8EC5FC",
    "#E0C3FC",
  ];
  const index = (username?.length || 0) % colors.length;
  return colors[index];
};

// Simple back function without router
const goBack = () => {
  window.history.back();
};

const formatSize = (bytes) => {
  if (!bytes || bytes === 0) return "0 Bytes";
  const mb = bytes / (1024 * 1024);
  return mb.toFixed(2) + " MB";
};

const formatTime = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const triggerFileUpload = () => {
  fileInput.value.click();
};

const handleFileSelected = async (event) => {
  const fileInput = event.target;
  if (!fileInput || !fileInput.files.length) return;
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("group_id", groupId.value);
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/chat/api/upload/`,
      formData,
    );
    if (response.status === 201 || response.status === 200) {
      const fileData = response.data.data;
      chatSocket.value.send(
        JSON.stringify({
          message_type: "file",
          file_url: fileData.file_url,
          file_name: fileData.file_name,
          file_type: fileData.file_type,
          file_size: fileData.file_size,
          sender: props.currentUser,
          message: fileData.file_name,
          group_id: groupId.value,
        }),
      );
    }
  } catch (error) {
    console.error("Upload failed!", error.response?.data || error.message);
  }
  fileInput.value = "";
};

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    if (response.status == 200) {
      resources.value = data.shared_files || [];
      groupMembers.value = data.members || [];
      messages.value = data.messages || [];
      groupName.value = data.group_name;

      const me = groupMembers.value.find((m) => {
        return String(m.username) === String(props.currentUser);
      });

      if (me) {
        me.status = "online";
      }

      scrollToBottom();
      nextTick(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop =
            messagesContainer.value.scrollHeight;
        }
      });
    }
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const startVideoCall = () => {
  console.log("Starting video call...");
  alert("Video call feature coming soon!");
};

const online_count = computed(() => {
  return groupMembers.value.filter((member) => member.status === "online")
    .length;
});

onMounted(() => {
  const pathParts = window.location.pathname.split("/");
  groupId.value = pathParts.filter((part) => part !== "").pop();
  const wsEndPoint = `ws://127.0.0.1:8000/ws/chat/${groupId.value}/`;
  const fetchedUrl = `http://127.0.0.1:8000/chat/api/${groupId.value}/`;
  fetchData(fetchedUrl);
  chatSocket.value = new WebSocket(wsEndPoint);
  chatSocket.value.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "user_status_change") {
      const member = groupMembers.value.find(
        (m) => String(m.id) === String(data.user_id),
      );
      if (member) {
        member.status = data.status;
      }
    } else {
      messages.value.push({ ...data });

      if (data.message_type === "file") {
        resources.value.unshift({
          id: data.id || Date.now(),
          file_name: data.file_name,
          file_type: data.file_type,
          uploader: data.sender,
          file_url: data.file_url,
          file_size: data.file_size,
          uploaded_at: data.uploaded_at,
        });
      }
      scrollToBottom();
    }
  };
});

onUnmounted(() => {
  if (chatSocket.value) {
    console.log("Closing web socket...");
    chatSocket.value.close();
  }
});

const send = () => {
  if (!newMessage.value.trim()) return;
  chatSocket.value.send(
    JSON.stringify({
      message: newMessage.value,
      sender: props.currentUser,
      message_type: "text",
      group_id: groupId.value,
    }),
  );
  newMessage.value = "";
};
</script>

<style scoped>
/* BENTO GRID STYLING */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.bento-chat-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f5f7fa;
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
  overflow: hidden;
}

/* Main Layout */
.bento-layout {
  display: grid;
  grid-template-columns: 280px 1fr 320px;
  height: 100vh;
  padding: 20px;
  gap: 20px;
}

/* Bento Cards - Common Styles */
.bento-sidebar,
.bento-main,
.bento-resources {
  background: white;
  border-radius: 32px;
  box-shadow:
    0 10px 30px -10px rgba(0, 0, 0, 0.03),
    0 0 0 1px rgba(0, 0, 0, 0.02);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px);
}

/* Left Sidebar */
.bento-sidebar {
  padding: 0;
}

.sidebar-header {
  padding: 24px 20px 16px;
  border-bottom: 1px solid #f1f5f9;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.brand-icon {
  width: 40px;
  height: 40px;
  background: #1e3a5f;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.brand-name {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
}

.sidebar-badge {
  background: #f1f5f9;
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 11px;
  font-weight: 600;
  color: #1e3a5f;
  display: inline-block;
}

.sidebar-section {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

.sidebar-section::-webkit-scrollbar {
  width: 4px;
}

.sidebar-section::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.sidebar-section::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.online-count {
  font-size: 11px;
  color: #10b981;
  font-weight: 600;
  background: #d1fae5;
  padding: 2px 8px;
  border-radius: 30px;
}

.members-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.member-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 16px;
  transition: all 0.2s;
}

.member-card:hover {
  background: #f8fafc;
}

.member-avatar-wrapper {
  position: relative;
  width: 44px;
  height: 44px;
}

.member-avatar {
  width: 100%;
  height: 100%;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.status-dot {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
}

.status-dot.online {
  background: #10b981;
}

.status-dot.away {
  background: #f59e0b;
}

.member-details {
  flex: 1;
}

.member-name {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 2px;
}

.member-status-text {
  font-size: 11px;
  color: #94a3b8;
}

/* Main Chat Area */
.bento-main {
  display: flex;
  flex-direction: column;
  background: white;
}

.chat-header {
  padding: 24px 28px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.group-name {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 6px;
  letter-spacing: -0.02em;
}

.group-meta {
  display: flex;
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #64748b;
}

.meta-item.online {
  color: #10b981;
}

.online-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  display: inline-block;
}

.video-button {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: #1e3a5f;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(30, 58, 95, 0.2);
}

.video-button:hover {
  background: #14273f;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(30, 58, 95, 0.3);
}

/* Messages Container */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 28px;
  background: #f8fafc;
}

.messages-container::-webkit-scrollbar {
  width: 4px;
}

.messages-container::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.messages-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.message-group {
  margin-bottom: 20px;
  animation: slideIn 0.2s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-row {
  display: flex;
  max-width: 70%;
}

.own-message {
  margin-left: auto;
  justify-content: flex-end;
}

.peer-message {
  margin-right: auto;
  justify-content: flex-start;
}

.message-bubble {
  background: white;
  border-radius: 20px;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  border: 1px solid #f1f5f9;
}

.own-message .message-bubble {
  background: #1e3a5f;
  border-color: #1e3a5f;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.own-message .message-header {
  justify-content: flex-end;
}

.message-sender {
  font-size: 12px;
  font-weight: 600;
  color: #1e3a5f;
}

.own-message .message-sender {
  color: rgba(255, 255, 255, 0.9);
}

.message-time {
  font-size: 10px;
  color: #94a3b8;
}

.own-message .message-time {
  color: rgba(255, 255, 255, 0.6);
}

.text-content {
  font-size: 14px;
  line-height: 1.6;
  color: #1a2e35;
  word-wrap: break-word;
}

.own-message .text-content {
  color: white;
}

/* File Preview */
.file-link {
  text-decoration: none;
  display: block;
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: #f8fafc;
  border-radius: 16px;
  min-width: 260px;
  transition: all 0.2s;
}

.file-preview:hover {
  background: #f1f5f9;
}

.own-message .file-preview {
  background: rgba(255, 255, 255, 0.1);
}

.file-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* File icon colors */
.file-icon-wrapper.image {
  background: #dcfce7;
  color: #16a34a;
}
.file-icon-wrapper.pdf {
  background: #fee2e2;
  color: #dc2626;
}
.file-icon-wrapper.document {
  background: #dbeafe;
  color: #2563eb;
}
.file-icon-wrapper.presentation {
  background: #fed7aa;
  color: #c2410c;
}
.file-icon-wrapper.spreadsheet {
  background: #dcfce7;
  color: #059669;
}
.file-icon-wrapper.archive {
  background: #fef9c3;
  color: #ca8a04;
}
.file-icon-wrapper.audio {
  background: #fae8ff;
  color: #a21caf;
}
.file-icon-wrapper.video {
  background: #ffe4e6;
  color: #be123c;
}
.file-icon-wrapper.code {
  background: #e0f2fe;
  color: #0369a1;
}
.file-icon-wrapper:not(.image):not(.pdf):not(.document):not(.presentation):not(
    .spreadsheet
  ):not(.archive):not(.audio):not(.video):not(.code) {
  background: #f1f5f9;
  color: #64748b;
}

.own-message .file-icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.file-details {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.own-message .file-name {
  color: white;
}

.file-meta {
  font-size: 10px;
  color: #94a3b8;
}

.own-message .file-meta {
  color: rgba(255, 255, 255, 0.7);
}

.file-download-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e3a5f;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.2s;
}

.file-preview:hover .file-download-icon {
  opacity: 1;
  transform: scale(1);
}

/* Input Area */
.input-area {
  padding: 20px 28px;
  background: white;
  border-top: 1px solid #f1f5f9;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 40px;
  padding: 4px 4px 4px 16px;
  transition: all 0.2s;
}

.input-wrapper:focus-within {
  border-color: #1e3a5f;
  box-shadow: 0 0 0 4px rgba(30, 58, 95, 0.1);
  background: white;
}

.attach-btn {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: none;
  background: transparent;
  color: #1e3a5f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.attach-btn:hover {
  background: #f1f5f9;
  transform: scale(1.1);
}

.file-input {
  display: none;
}

.message-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: #0f172a;
  padding: 10px 0;
}

.message-input::placeholder {
  color: #94a3b8;
}

.send-btn {
  width: 44px;
  height: 44px;
  border-radius: 22px;
  border: none;
  background: #1e3a5f;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(30, 58, 95, 0.2);
}

.send-btn:hover {
  background: #14273f;
  transform: scale(1.05);
}

/* Right Sidebar - Resources */
.bento-resources {
  padding: 0;
}

.resources-header {
  padding: 24px 20px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.resources-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.resources-title svg {
  color: #1e3a5f;
}

.resources-title h3 {
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
}

.resources-count {
  background: #f1f5f9;
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
  color: #1e3a5f;
}

.resources-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.resources-list::-webkit-scrollbar {
  width: 4px;
}

.resources-list::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.resources-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 18px;
  transition: all 0.2s;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.resource-item:hover {
  background: #f1f5f9;
  transform: translateX(4px);
}

.resource-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Resource icon colors - matching file icons */
.resource-icon.image {
  background: #dcfce7;
  color: #16a34a;
}
.resource-icon.pdf {
  background: #fee2e2;
  color: #dc2626;
}
.resource-icon.document {
  background: #dbeafe;
  color: #2563eb;
}
.resource-icon.presentation {
  background: #fed7aa;
  color: #c2410c;
}
.resource-icon.spreadsheet {
  background: #dcfce7;
  color: #059669;
}
.resource-icon.archive {
  background: #fef9c3;
  color: #ca8a04;
}
.resource-icon.audio {
  background: #fae8ff;
  color: #a21caf;
}
.resource-icon.video {
  background: #ffe4e6;
  color: #be123c;
}
.resource-icon.code {
  background: #e0f2fe;
  color: #0369a1;
}
.resource-icon:not(.image):not(.pdf):not(.document):not(.presentation):not(
    .spreadsheet
  ):not(.archive):not(.audio):not(.video):not(.code) {
  background: #f1f5f9;
  color: #64748b;
}

.resource-content {
  flex: 1;
  min-width: 0;
}

.resource-name {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.resource-meta {
  display: flex;
  gap: 8px;
  font-size: 10px;
}

.resource-uploader {
  color: #1e3a5f;
  font-weight: 500;
}

.resource-size {
  color: #94a3b8;
}

.resource-download {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e3a5f;
  opacity: 0;
  transition: all 0.2s;
}

.resource-item:hover .resource-download {
  opacity: 1;
}

.resource-download:hover {
  background: #1e3a5f;
  color: white;
  transform: scale(1.1);
}

/* Responsive */
@media (max-width: 1200px) {
  .bento-layout {
    grid-template-columns: 240px 1fr 280px;
  }
}

@media (max-width: 900px) {
  .bento-layout {
    grid-template-columns: 1fr;
    padding: 10px;
  }

  .bento-sidebar,
  .bento-resources {
    display: none;
  }

  .back-button-container {
    bottom: 20px;
    left: 20px;
  }

  .back-button {
    padding: 10px 18px;
    font-size: 14px;
  }
}
</style>
