<template>
  <div class="chat-container">
    <div class="chat-layout">
      <!-- Left Sidebar - Members Only -->
      <aside class="chat-sidebar">
        <div class="sidebar-brand">
          <div class="brand-icon">
            <svg
              width="18"
              height="18"
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

        <div class="sidebar-section">
          <div class="section-title">MEMBERS</div>
          <div
            v-for="member in groupMembers"
            :key="member.id"
            class="member-row"
          >
            <div class="member-avatar">
              <div class="avatar-initials">
                {{ member.username.charAt(0).toUpperCase() }}
              </div>
              <div :class="['status-indicator', member.status]"></div>
            </div>
            <div class="member-info">
              <div class="member-name">{{ member.username }}</div>
              <div class="member-status">
                {{ member.status === "online" ? "Online" : "Away" }}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Chat Area -->
      <main class="chat-main">
        <!-- Chat Header -->
        <header class="chat-header">
          <div class="header-channel">
            <h1>{{ groupName }}</h1>
            <div class="channel-meta">
              <span class="meta-badge"
                >{{ groupMembers?.length }} members ∙ {{ online_count }} online
              </span>
            </div>
          </div>
          <div class="header-actions">
            <!-- Video Call Icon -->
            <button
              class="video-call-button"
              @click="startVideoCall"
              title="Start Video Call"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
              >
                <path d="M23 7L16 12L23 17V7Z" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </button>
          </div>
        </header>

        <!-- Messages Area -->
        <div class="messages-container">
          <div class="messages-area" ref="messagesContainer">
            <div v-for="msg in messages" :key="msg.id" class="message-group">
              <div
                :class="[
                  'message-wrapper',
                  msg.sender === currentUser ? 'own-message' : 'peer-message',
                ]"
              >
                <div class="message-content">
                  <div class="message-header">
                    <span class="message-sender">{{ msg.sender }}</span>
                    <span class="message-time">{{ formatTime(msg.time) }}</span>
                  </div>

                  <!-- Text Message -->
                  <div v-if="msg.message_type === 'text'" class="text-bubble">
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
                      class="file-bubble"
                      :class="{ 'own-file': msg.sender === currentUser }"
                      :data-type="msg.file_type?.toLowerCase()"
                    >
                      <div
                        class="file-icon"
                        :class="[
                          msg.file_type,
                          { 'own-file-icon': msg.sender === currentUser },
                        ]"
                      >
                        <!-- Image files -->
                        <svg
                          v-if="msg.file_type == 'image'"
                          width="20"
                          height="20"
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
                          ></rect>
                          <circle
                            cx="8.5"
                            cy="8.5"
                            r="1.5"
                            fill="currentColor"
                          ></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>

                        <!-- PDF files -->
                        <svg
                          v-else-if="msg.file_type === 'pdf'"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                          ></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <path d="M9 15h6"></path>
                          <path d="M9 18h4"></path>
                          <circle
                            cx="16"
                            cy="15"
                            r="1"
                            fill="currentColor"
                          ></circle>
                        </svg>

                        <!-- Word/Document files -->
                        <svg
                          v-else-if="msg.file_type == 'document'"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                          ></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>

                        <!-- PowerPoint/Presentation files -->
                        <svg
                          v-else-if="msg.file_type == 'presentation'"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                          ></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <path d="M8 13h8"></path>
                          <path d="M8 17h5"></path>
                          <circle
                            cx="15.5"
                            cy="15.5"
                            r="1.5"
                            fill="currentColor"
                          ></circle>
                        </svg>

                        <!-- Excel/Spreadsheet files -->
                        <svg
                          v-else-if="msg.file_type == 'spreadsheet'"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                          ></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="8" y1="16" x2="12" y2="16"></line>
                          <line x1="8" y1="12" x2="16" y2="12"></line>
                          <line x1="8" y1="8" x2="10" y2="8"></line>
                        </svg>

                        <!-- ZIP/Archive files -->
                        <svg
                          v-else-if="msg.file_type == 'archive'"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                          ></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="12" y1="12" x2="12" y2="16"></line>
                          <line x1="9" y1="13" x2="15" y2="13"></line>
                        </svg>

                        <!-- Audio files -->
                        <svg
                          v-else-if="msg.file_type == 'audio'"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                          ></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <path d="M9 15v-3a3 3 0 1 1 6 0v3"></path>
                          <circle
                            cx="12"
                            cy="16"
                            r="2"
                            fill="currentColor"
                          ></circle>
                        </svg>

                        <!-- Video files -->
                        <svg
                          v-else-if="msg.file_type == 'video'"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                          ></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <polygon
                            points="9 13 15 10 15 18 9 15 9 13"
                          ></polygon>
                        </svg>

                        <!-- Code files -->
                        <svg
                          v-else-if="msg.file_type == 'code'"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                          ></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <polyline points="9 13 6 16 9 19"></polyline>
                          <polyline points="15 13 18 16 15 19"></polyline>
                        </svg>

                        <!-- Default file -->
                        <svg
                          v-else
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                          ></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <circle
                            cx="10.5"
                            cy="15.5"
                            r="0.5"
                            fill="currentColor"
                          ></circle>
                        </svg>
                      </div>
                      <div class="file-details">
                        <div class="file-name">{{ msg.file_name }}</div>
                        <div class="file-meta">
                          {{ msg.file_type?.toUpperCase() }} •
                          {{ formatSize(msg.file_size) }}
                        </div>
                      </div>
                      <div class="file-download">
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
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="input-container">
          <div class="input-wrapper">
            <button class="attach-button" @click="triggerFileUpload">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6366f1"
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
              class="file-input-hidden"
              @change="handleFileSelected"
            />
            <input
              type="text"
              v-model="newMessage"
              @keyup.enter="send"
              placeholder="Type a message..."
              class="message-input"
            />
            <button class="send-button" @click="send">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2.5"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </main>

      <!-- Right Sidebar - Resources Only -->
      <aside class="resources-sidebar">
        <div class="resources-header">
          <div class="resources-title">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6366f1"
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
            :download="file.file_name"
            target="_blank"
            :href="'http://127.0.0.1:8000' + file.file_url"
            :key="file.id"
            class="resource-card file-link"
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
            <button class="resource-download">
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
            </button>
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

      console.log({ fileData });
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
        console.log(m.username, props.currentUser);
        String(m.username) === String(props.currentUser);
      });

      console.log(me);
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.chat-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.chat-layout {
  display: grid;
  grid-template-columns: 260px 1fr 300px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Left Sidebar - Members Only */
.chat-sidebar {
  background: #ffffff;
  border-right: 1px solid #f0f2f5;
  padding: 28px 20px;
  overflow-y: auto;
  height: 100vh;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  padding: 0 8px;
}

.brand-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px -4px rgba(99, 102, 241, 0.3);
}

.brand-name {
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(135deg, #1e293b, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-title {
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  padding: 0 8px;
}

.member-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 12px;
  transition: all 0.2s;
  cursor: pointer;
}

.member-row:hover {
  background: #f8fafc;
  transform: translateX(4px);
}

.member-avatar {
  position: relative;
  width: 40px;
  height: 40px;
}

.avatar-initials {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e2e8f0, #f1f5f9);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #475569;
  border: 2px solid white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.status-indicator {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
}

.status-indicator.online {
  background: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.status-indicator.away {
  background: #f59e0b;
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
}

.member-info {
  flex: 1;
}

.member-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2px;
}

.member-status {
  font-size: 11px;
  color: #94a3b8;
}

/* Main Chat Area */
.chat-main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #ffffff;
  overflow: hidden;
}

/* Chat Header */
.chat-header {
  padding: 20px 32px;
  background: #ffffff;
  border-bottom: 1px solid #f0f2f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.header-channel h1 {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 6px;
  letter-spacing: -0.3px;
}

.channel-meta {
  display: flex;
  gap: 12px;
}

.meta-badge {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

.meta-badge.online {
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Video Call Button */
.video-call-button {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #2563eb;
  transition: all 0.2s;
}

/* Messages Container */
.messages-container {
  flex: 1;
  overflow: hidden;
  background: #fafbfc;
}

.messages-area {
  height: 100%;
  overflow-y: auto;
  padding: 24px 32px;
  scroll-behavior: smooth;
}

.messages-area::-webkit-scrollbar {
  width: 4px;
}

.messages-area::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.messages-area::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.message-group {
  margin-bottom: 20px;
  animation: slideIn 0.3s ease;
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

.message-wrapper {
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

.message-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.message-sender {
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
}

.message-time {
  font-size: 11px;
  color: #94a3b8;
}

.own-message .message-header {
  flex-direction: row-reverse;
}

.own-message .message-sender {
  color: #6366f1;
}

/* Text Bubble */
.text-bubble {
  padding: 12px 18px;
  font-size: 14px;
  line-height: 1.6;
  border-radius: 18px;
  word-wrap: break-word;
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.peer-message .text-bubble {
  background: #ffffff;
  border: 1px solid #f0f2f5;
  border-bottom-left-radius: 4px;
  color: #334155;
}

.own-message .text-bubble {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-bottom-right-radius: 4px;
  box-shadow: 0 8px 16px -4px rgba(99, 102, 241, 0.3);
}

/* File Link */
.file-link {
  text-decoration: none;
  display: block;
}

/* File Bubble */
.file-bubble {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: #ffffff;
  border: 1px solid #f0f2f5;
  border-radius: 18px;
  min-width: 280px;
  max-width: 320px;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.peer-message .file-bubble {
  border-bottom-left-radius: 4px;
}

.own-message .file-bubble {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  border-bottom-right-radius: 4px;
  box-shadow: 0 8px 16px -4px rgba(99, 102, 241, 0.3);
}

.file-bubble:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
}

.own-message .file-bubble:hover {
  box-shadow: 0 12px 24px -8px rgba(99, 102, 241, 0.4);
}

.file-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Peer message file icon colors - Unique for each type */
.peer-message .file-icon.image {
  background: #dcfce7;
  color: #16a34a;
}

.peer-message .file-icon.pdf {
  background: #fee2e2;
  color: #dc2626;
}

.peer-message .file-icon.document {
  background: #dbeafe;
  color: #2563eb;
}

.peer-message .file-icon.presentation {
  background: #fed7aa;
  color: #c2410c;
}

.peer-message .file-icon.spreadsheet {
  background: #dcfce7;
  color: #059669;
}

.peer-message .file-icon.archive {
  background: #fef9c3;
  color: #ca8a04;
}

.peer-message .file-icon.audio {
  background: #fae8ff;
  color: #a21caf;
}

.peer-message .file-icon.video {
  background: #ffe4e6;
  color: #be123c;
}

.peer-message .file-icon.code {
  background: #e0f2fe;
  color: #0369a1;
}

.peer-message
  .file-icon:not(.image):not(.pdf):not(.document):not(.presentation):not(
    .spreadsheet
  ):not(.archive):not(.audio):not(.video):not(.code) {
  background: #f1f5f9;
  color: #64748b;
}

/* Own message file icon - White with subtle colored background */
.own-message .file-icon {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.own-message .file-icon.image {
  background: rgba(22, 163, 74, 0.25);
}

.own-message .file-icon.pdf {
  background: rgba(220, 38, 38, 0.25);
}

.own-message .file-icon.document {
  background: rgba(37, 99, 235, 0.25);
}

.own-message .file-icon.presentation {
  background: rgba(194, 65, 12, 0.25);
}

.own-message .file-icon.spreadsheet {
  background: rgba(5, 150, 105, 0.25);
}

.own-message .file-icon.archive {
  background: rgba(202, 138, 4, 0.25);
}

.own-message .file-icon.audio {
  background: rgba(162, 28, 175, 0.25);
}

.own-message .file-icon.video {
  background: rgba(190, 18, 60, 0.25);
}

.own-message .file-icon.code {
  background: rgba(3, 105, 161, 0.25);
}

.file-details {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.own-message .file-name {
  color: white;
}

.file-meta {
  font-size: 11px;
  color: #94a3b8;
}

.own-message .file-meta {
  color: rgba(255, 255, 255, 0.8);
}

.file-download {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.2s;
  flex-shrink: 0;
}

.own-message .file-download {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.file-bubble:hover .file-download {
  opacity: 1;
  transform: scale(1);
}

/* Input Container */
.input-container {
  padding: 20px 32px;
  background: #ffffff;
  border-top: 1px solid #f0f2f5;
  flex-shrink: 0;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8fafc;
  border: 1px solid #f0f2f5;
  border-radius: 30px;
  padding: 6px 6px 6px 16px;
  transition: all 0.2s;
}

.input-wrapper:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  background: #ffffff;
}

.attach-button {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6366f1;
  transition: all 0.2s;
}

.attach-button:hover {
  background: #eff6ff;
  transform: scale(1.1);
}

.file-input-hidden {
  display: none;
}

.message-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: #1e293b;
  padding: 10px 0;
}

.message-input::placeholder {
  color: #94a3b8;
}

.send-button {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.send-button:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.4);
}

/* Right Sidebar - Resources Only */
.resources-sidebar {
  width: 300px;
  background: #ffffff;
  border-left: 1px solid #f0f2f5;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.resources-header {
  padding: 24px 20px;
  border-bottom: 1px solid #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.resources-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.resources-title h3 {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.resources-count {
  background: #f1f5f9;
  padding: 4px 10px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
  color: #6366f1;
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

.resource-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 14px;
  transition: all 0.2s;
  cursor: pointer;
}

.resource-card:hover {
  background: #f1f5f9;
  transform: translateX(4px);
}

.resource-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Resource icon colors - Matching message file icons */
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
  color: #1e293b;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.resource-meta {
  display: flex;
  gap: 8px;
  font-size: 11px;
}

.resource-uploader {
  color: #6366f1;
  font-weight: 500;
}

.resource-size {
  color: #94a3b8;
}

.resource-download {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s;
}

.resource-card:hover .resource-download {
  opacity: 1;
}

.resource-download:hover {
  background: #ffffff;
  color: #6366f1;
  transform: scale(1.1);
}
</style>
