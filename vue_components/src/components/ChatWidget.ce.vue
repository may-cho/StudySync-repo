<template>
  <div class="chat-app">
    <!-- Main Chat Area -->
    <div class="chat-main">
      <!-- Header -->
      <div class="chat-header">
        <div class="header-left">
          <button class="back-button" @click="goToDashboard">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M19 12H5M12 19L5 12L12 5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <div class="group-info">
            <h2 class="group-title">{{ group.name }}</h2>
            <div class="status-badge">
              <span class="status-dot"></span>
              <span class="status-text">{{ messages.length }} messages</span>
            </div>
          </div>
        </div>

        <div class="header-actions">
          <button
            class="action-icon"
            @click="showResources = !showResources"
            :class="{ active: showResources }"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
              <line x1="2" y1="9" x2="22" y2="9" />
            </svg>
          </button>

          <button
            class="call-button"
            :class="{ 'call-active': isTimetableActive }"
            :disabled="!isTimetableActive"
            @click="startCall"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
              />
            </svg>
            <span class="call-text">{{
              isTimetableActive ? "Join Call" : "Call Unavailable"
            }}</span>
          </button>
        </div>
      </div>

      <!-- Messages Container -->
      <div class="messages-container" ref="messagesContainer">
        <div
          v-for="(msg, index) in messages"
          :key="msg.id"
          class="message-group"
        >
          <!-- Date divider -->
          <div v-if="shouldShowDateDivider(index)" class="date-divider">
            <span class="date-text">{{ formatDate(msg.timestamp) }}</span>
          </div>

          <!-- Message -->
          <div
            class="message-row"
            :class="{ 'own-message': msg.sender.id === currentUser.id }"
          >
            <!-- Avatar for others -->
            <div v-if="msg.sender.id !== currentUser.id" class="message-avatar">
              <div
                class="avatar-circle"
                :style="{ backgroundColor: getUserColor(msg.sender.id) }"
                @mouseenter="showUserCard(msg.sender.id)"
                @mouseleave="hideUserCard"
              >
                {{ msg.sender.username.charAt(0).toUpperCase() }}
              </div>

              <!-- Profile Card -->
              <div v-if="activeUserCard === msg.sender.id" class="profile-card">
                <div
                  class="profile-header"
                  :style="{ backgroundColor: getUserColor(msg.sender.id) }"
                >
                  <div class="profile-avatar">
                    {{ msg.sender.username.charAt(0).toUpperCase() }}
                  </div>
                </div>
                <div class="profile-body">
                  <h4>{{ msg.sender.username }}</h4>
                  <div class="profile-detail">
                    <span class="detail-label">Major</span>
                    <span class="detail-value">{{
                      msg.sender.studentprofile?.major || "General"
                    }}</span>
                  </div>
                  <div class="profile-detail">
                    <span class="detail-label">Semester</span>
                    <span class="detail-value">{{
                      msg.sender.studentprofile?.semester || "N/A"
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message Bubble -->
            <div
              class="message-bubble"
              :class="{
                'own-bubble': msg.sender.id === currentUser.id,
                'file-bubble': isFileMessage(msg.content),
              }"
              @mouseenter="hoveredMessage = msg.id"
              @mouseleave="hoveredMessage = null"
            >
              <!-- Message Actions -->
              <div
                v-if="
                  msg.sender.id === currentUser.id && hoveredMessage === msg.id
                "
                class="message-tools"
              >
                <button class="tool-btn" @click="startEdit(msg)">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M17 3L21 7L7 21H3V17L17 3Z" stroke-width="2" />
                  </svg>
                </button>
                <button class="tool-btn delete" @click="deleteMessage(msg.id)">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M3 6H5H21" stroke-width="2" />
                    <path
                      d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6"
                      stroke-width="2"
                    />
                    <path
                      d="M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6"
                      stroke-width="2"
                    />
                  </svg>
                </button>
              </div>

              <!-- Edit Mode -->
              <div v-if="editingMessage === msg.id" class="edit-mode">
                <textarea
                  v-model="editContent"
                  class="edit-field"
                  ref="editInput"
                  @keydown.enter.prevent="saveEdit"
                ></textarea>
                <div class="edit-actions">
                  <button class="edit-cancel" @click="cancelEdit">
                    Cancel
                  </button>
                  <button class="edit-save" @click="saveEdit">Save</button>
                </div>
              </div>

              <!-- File Message -->
              <div
                v-else-if="isFileMessage(msg.content)"
                class="file-attachment"
              >
                <div class="file-icon">📎</div>
                <div class="file-info">
                  <span class="file-name">{{ getFileName(msg.content) }}</span>
                  <a
                    :href="getFileUrl(msg.content)"
                    class="file-download"
                    download
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>

              <!-- Text Message -->
              <div v-else class="text-content">
                {{ msg.content }}
              </div>

              <!-- Message Footer -->
              <div class="message-footer">
                <div class="reaction-group">
                  <span
                    v-for="reaction in msg.reactions"
                    :key="reaction.emoji"
                    class="reaction-chip"
                    @click="toggleReaction(msg.id, reaction.emoji)"
                  >
                    <span class="reaction-emoji">{{ reaction.emoji }}</span>
                    <span class="reaction-count">{{ reaction.count }}</span>
                  </span>
                  <button
                    class="add-reaction"
                    @click="toggleReaction(msg.id, '👍')"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                      />
                    </svg>
                  </button>
                </div>
                <span class="message-time">{{
                  formatTime(msg.timestamp)
                }}</span>
              </div>
            </div>

            <!-- Avatar for current user (right side) -->
            <div
              v-if="msg.sender.id === currentUser.id"
              class="message-avatar right"
            >
              <div
                class="avatar-circle"
                :style="{ backgroundColor: getUserColor(currentUser.id) }"
              >
                {{ currentUser.username.charAt(0).toUpperCase() }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="input-area">
        <form @submit.prevent="sendMessage" class="input-form">
          <input
            type="file"
            ref="fileInput"
            class="file-upload"
            @change="handleFileUpload"
          />

          <button
            type="button"
            class="attach-button"
            @click="$refs.fileInput.click()"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59723 22 8.00502 22C6.41281 22 4.88584 21.3658 3.76002 20.24C2.6342 19.1142 2 17.5872 2 15.995C2 14.4028 2.6342 12.8758 3.76002 11.75L12.33 3.18"
                stroke-width="2"
              />
              <path d="M16 8L8 16" stroke-width="2" />
            </svg>
          </button>

          <div class="input-wrapper">
            <input
              v-model="newMessage"
              type="text"
              class="message-field"
              placeholder="Type your message..."
              autocomplete="off"
            />
          </div>

          <button
            type="submit"
            class="send-button"
            :disabled="!newMessage.trim()"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <line x1="22" y1="2" x2="11" y2="13" stroke-width="2" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" stroke-width="2" />
            </svg>
          </button>
        </form>
      </div>
    </div>

    <!-- Resources Panel (Sliding) -->
    <transition name="slide">
      <div v-if="showResources" class="resources-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
              <line x1="2" y1="9" x2="22" y2="9" />
            </svg>
            <h3>Resources</h3>
          </div>
          <button class="close-panel" @click="showResources = false">✕</button>
        </div>

        <div class="panel-content">
          <div v-if="resources.length === 0" class="empty-state">
            <div class="empty-icon">📁</div>
            <p>No resources yet</p>
          </div>

          <div v-else class="resources-grid">
            <div v-for="file in resources" :key="file.id" class="resource-card">
              <div class="resource-icon">
                <span>📄</span>
              </div>
              <div class="resource-meta">
                <h4>{{ file.filename }}</h4>
                <span>by {{ file.uploader.username }}</span>
              </div>
              <a :href="file.file.url" class="resource-action" download>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Video Call Modal -->
    <transition name="fade">
      <div v-if="showVideoCall" class="call-modal">
        <div class="call-grid" ref="videoGrid"></div>

        <div class="call-toolbar">
          <button
            class="call-control"
            :class="{ active: !isMuted }"
            @click="toggleMute"
          >
            <svg
              v-if="isMuted"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 15a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" />
              <path d="M19 12a7 7 0 0 1-14 0" />
              <line x1="3" y1="3" x2="21" y2="21" />
            </svg>
            <svg
              v-else
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 15a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" />
              <path d="M19 12a7 7 0 0 1-14 0" />
            </svg>
          </button>

          <button
            class="call-control"
            :class="{ active: isCameraOn }"
            @click="toggleCamera"
          >
            <svg
              v-if="!isCameraOn"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M23 7L16 12L23 17V7Z" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            <svg
              v-else
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M23 7L16 12L23 17V7Z" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </button>

          <button class="call-control end-call" @click="endCall">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
              />
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ChatWidget",
  props: {
    group: { type: Object, required: true },
    messages: {
      type: Array,
      default: () => [
        {
          content: "Hello",
          timestamp: "12:00:00",
          sender: {
            id: 1,
            username: "May Cho Oo",
            studentprofile: {
              major: "SE",
              semester: "8",
            },
          },
        },
      ],
    },
    resources: { type: Array, default: () => [] },
    currentUser: {
      type: Object,
      required: true,
      default: {
        id: 2,
        username: "thura",
      },
    },
    isTimetableActive: { type: Boolean, default: false },
  },
  data() {
    return {
      newMessage: "",
      showResources: false,
      hoveredMessage: null,
      activeUserCard: null,
      editingMessage: null,
      editContent: "",
      showVideoCall: false,
      localStream: null,
      peerConnections: {},
      isMuted: false,
      isCameraOn: true,
      chatSocket: null,
      userColors: {},
    };
  },
  mounted() {
    this.initWebSocket();
    this.scrollToBottom();
    this.generateUserColors();

    console.log(props.group);
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    generateUserColors() {
      const colors = [
        "#F87171",
        "#FBBF24",
        "#34D399",
        "#60A5FA",
        "#C084FC",
        "#F472B6",
        "#F59E0B",
        "#10B981",
        "#3B82F6",
        "#8B5CF6",
        "#EC4899",
        "#EF4444",
      ];
      this.messages.forEach((msg) => {
        if (!this.userColors[msg.sender.id]) {
          this.userColors[msg.sender.id] =
            colors[Math.floor(Math.random() * colors.length)];
        }
      });
    },
    getUserColor(userId) {
      return this.userColors[userId] || "#667EEA";
    },
    shouldShowDateDivider(index) {
      if (index === 0) return true;
      const currentDate = new Date(
        this.messages[index].timestamp,
      ).toDateString();
      const prevDate = new Date(
        this.messages[index - 1].timestamp,
      ).toDateString();
      return currentDate !== prevDate;
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (date.toDateString() === today.toDateString()) return "Today";
      if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },
    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        container?.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      });
    },
    initWebSocket() {
      const protocol =
        window.location.protocol === "https:" ? "wss://" : "ws://";
      this.chatSocket = new WebSocket(
        protocol +
          window.location.host +
          "/ws/chat/" +
          this.group.chat_room.id +
          "/",
      );
      this.chatSocket.onmessage = this.handleWebSocketMessage;
    },
    handleWebSocketMessage(e) {
      const data = JSON.parse(e.data);
      this.$emit("websocket-message", data);
    },
    sendMessage() {
      if (this.newMessage.trim()) {
        this.chatSocket.send(
          JSON.stringify({
            action: "send",
            content: this.newMessage,
          }),
        );
        this.newMessage = "";
      }
    },
    isFileMessage(content) {
      return content?.includes("|");
    },
    getFileName(content) {
      return content.split("|")[0].replace("Shared a file:", "").trim();
    },
    getFileUrl(content) {
      return content.split("|")[1]?.trim();
    },
    toggleReaction(messageId, emoji) {
      this.chatSocket.send(
        JSON.stringify({
          action: "react",
          msgId: messageId,
          emoji: emoji,
        }),
      );
    },
    startEdit(msg) {
      this.editingMessage = msg.id;
      this.editContent = msg.content;
      this.$nextTick(() => this.$refs.editInput?.focus());
    },
    saveEdit() {
      if (this.editContent.trim()) {
        this.chatSocket.send(
          JSON.stringify({
            action: "edit",
            msgId: this.editingMessage,
            content: this.editContent,
          }),
        );
        this.cancelEdit();
      }
    },
    cancelEdit() {
      this.editingMessage = null;
      this.editContent = "";
    },
    deleteMessage(messageId) {
      if (confirm("Delete this message?")) {
        this.chatSocket.send(
          JSON.stringify({
            action: "delete",
            msgId: messageId,
          }),
        );
      }
    },
    async handleFileUpload(e) {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "csrfmiddlewaretoken",
        document.querySelector("[name=csrfmiddlewaretoken]")?.value,
      );

      try {
        await fetch(`/upload-file/${this.group.id}/`, {
          method: "POST",
          body: formData,
        });
        e.target.value = "";
      } catch (error) {
        console.error("Upload error:", error);
      }
    },
    showUserCard(userId) {
      this.activeUserCard = userId;
    },
    hideUserCard() {
      this.activeUserCard = null;
    },
    goToDashboard() {
      this.$emit("navigate");
    },
    async startCall() {
      this.showVideoCall = true;
      this.chatSocket.send(JSON.stringify({ action: "call", data: "start" }));

      try {
        this.localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        this.addVideoStream("local", this.localStream, true);
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    },
    addVideoStream(userId, stream, muted = false) {
      this.$nextTick(() => {
        const container = document.createElement("div");
        container.className = "call-participant";
        container.id = `participant-${userId}`;

        const video = document.createElement("video");
        video.id = `video-${userId}`;
        video.autoplay = true;
        video.playsInline = true;
        video.muted = muted;
        video.srcObject = stream;

        const label = document.createElement("span");
        label.className = "participant-name";
        label.innerText = userId === "local" ? "You" : "Peer";

        container.appendChild(video);
        container.appendChild(label);
        this.$refs.videoGrid.appendChild(container);
      });
    },
    toggleMute() {
      if (this.localStream) {
        const audioTrack = this.localStream.getAudioTracks()[0];
        audioTrack.enabled = !audioTrack.enabled;
        this.isMuted = !audioTrack.enabled;
      }
    },
    toggleCamera() {
      if (this.localStream) {
        const videoTrack = this.localStream.getVideoTracks()[0];
        videoTrack.enabled = !videoTrack.enabled;
        this.isCameraOn = videoTrack.enabled;
      }
    },
    endCall() {
      Object.values(this.peerConnections).forEach((pc) => pc.close());
      if (this.localStream)
        this.localStream.getTracks().forEach((t) => t.stop());
      this.$refs.videoGrid.innerHTML = "";
      this.showVideoCall = false;
    },
  },
};
</script>

<style scoped>
.chat-app {
  display: flex;
  height: 80vh;
  background: #f8fafc;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.2);
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
}

/* Header Styles */
.chat-header {
  padding: 1.5rem 2rem;
  background: white;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.back-button {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  border: none;
  background: #f8fafc;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: #f1f5f9;
  color: #0f172a;
  transform: translateX(-3px);
}

.group-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.group-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.3px;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse 2s infinite;
}

.status-text {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.action-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: none;
  background: #f8fafc;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-icon:hover,
.action-icon.active {
  background: #f1f5f9;
  color: #0f172a;
}

.call-button {
  padding: 0.5rem 1.25rem;
  height: 44px;
  border-radius: 40px;
  border: none;
  background: #f1f5f9;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: not-allowed;
  transition: all 0.2s ease;
}

.call-button.call-active {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  cursor: pointer;
  box-shadow: 0 8px 20px -5px rgba(59, 130, 246, 0.4);
}

.call-button.call-active:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px -5px rgba(59, 130, 246, 0.5);
}

.call-text {
  font-size: 0.85rem;
}

/* Messages Container */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background: #fafbfc;
}

.date-divider {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}

.date-text {
  padding: 0.4rem 1.2rem;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  letter-spacing: 0.3px;
  backdrop-filter: blur(4px);
}

.message-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: flex-end;
}

.message-row.own-message {
  flex-direction: row-reverse;
}

.message-avatar {
  position: relative;
  flex-shrink: 0;
}

.avatar-circle {
  width: 38px;
  height: 38px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.avatar-circle:hover {
  transform: scale(1.05);
}

/* Profile Card */
.profile-card {
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 240px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  margin-bottom: 12px;
  animation: slideUp 0.2s ease;
  overflow: hidden;
}

.profile-header {
  height: 80px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 12px;
}

.profile-avatar {
  width: 50px;
  height: 50px;
  border-radius: 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
  border: 3px solid white;
}

.profile-body {
  padding: 1.25rem;
}

.profile-body h4 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
}

.profile-detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
}

.detail-label {
  color: #64748b;
  font-weight: 500;
}

.detail-value {
  color: #0f172a;
  font-weight: 600;
}

/* Message Bubble */
.message-bubble {
  position: relative;
  max-width: 60%;
  padding: 0.9rem 1.2rem;
  border-radius: 24px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  border-bottom-left-radius: 4px;
}

.own-bubble {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 24px;
}

.message-tools {
  position: absolute;
  top: -35px;
  right: 0;
  display: flex;
  gap: 0.25rem;
  background: white;
  border-radius: 30px;
  padding: 0.25rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  z-index: 10;
}

.tool-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.tool-btn:hover {
  background: #f1f5f9;
  color: #3b82f6;
}

.tool-btn.delete:hover {
  background: #fee2e2;
  color: #ef4444;
}

/* File Message */
.file-attachment {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 200px;
}

.file-icon {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.file-info {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.file-name {
  font-size: 0.9rem;
  font-weight: 500;
  word-break: break-word;
}

.file-download {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.2s;
}

.file-download:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.1);
}

/* Text Message */
.text-content {
  font-size: 0.95rem;
  line-height: 1.5;
  word-wrap: break-word;
  white-space: pre-wrap;
}

/* Edit Mode */
.edit-mode {
  width: 100%;
}

.edit-field {
  width: 100%;
  min-height: 80px;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  font-size: 0.9rem;
  font-family: inherit;
  resize: vertical;
  margin-bottom: 0.75rem;
  transition: all 0.2s;
}

.edit-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.edit-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.edit-cancel,
.edit-save {
  padding: 0.3rem 1rem;
  border-radius: 30px;
  border: none;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.edit-cancel {
  background: #f1f5f9;
  color: #475569;
}

.edit-cancel:hover {
  background: #e2e8f0;
}

.edit-save {
  background: #3b82f6;
  color: white;
}

.edit-save:hover {
  background: #2563eb;
}

/* Message Footer */
.message-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.reaction-group {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.reaction-chip {
  padding: 0.2rem 0.6rem;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 30px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
  transition: all 0.2s;
}

.own-bubble .reaction-chip {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.reaction-chip:hover {
  transform: scale(1.05);
  background: rgba(0, 0, 0, 0.08);
}

.own-bubble .reaction-chip:hover {
  background: rgba(255, 255, 255, 0.25);
}

.add-reaction {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.own-bubble .add-reaction {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.add-reaction:hover {
  transform: scale(1.1);
  background: rgba(0, 0, 0, 0.08);
}

.own-bubble .add-reaction:hover {
  background: rgba(255, 255, 255, 0.25);
}

.message-time {
  font-size: 0.65rem;
  opacity: 0.6;
  font-weight: 500;
}

/* Input Area */
.input-area {
  padding: 1.5rem 2rem;
  background: white;
  border-top: 1px solid #f1f5f9;
}

.input-form {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.file-upload {
  display: none;
}

.attach-button {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  border: none;
  background: #f8fafc;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.attach-button:hover {
  background: #f1f5f9;
  color: #3b82f6;
  transform: scale(1.05);
}

.input-wrapper {
  flex: 1;
}

.message-field {
  width: 100%;
  padding: 0.8rem 1.2rem;
  border: none;
  background: #f8fafc;
  border-radius: 30px;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.message-field:focus {
  outline: none;
  background: #f1f5f9;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.send-button {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 8px 16px -5px rgba(59, 130, 246, 0.3);
}

.send-button:hover:not(:disabled) {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 12px 20px -5px rgba(59, 130, 246, 0.4);
}

.send-button:disabled {
  background: #e2e8f0;
  color: #94a3b8;
  box-shadow: none;
  cursor: not-allowed;
}

/* Resources Panel */
.resources-panel {
  width: 320px;
  background: white;
  border-left: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease;
}

.panel-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.panel-title h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
}

.close-panel {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: none;
  background: #f8fafc;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.close-panel:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.resources-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.resource-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 18px;
  transition: all 0.2s;
}

.resource-card:hover {
  background: #f1f5f9;
  transform: translateX(3px);
}

.resource-icon {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
}

.resource-meta {
  flex: 1;
  min-width: 0;
}

.resource-meta h4 {
  margin: 0 0 0.25rem 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.resource-meta span {
  font-size: 0.7rem;
  color: #64748b;
}

.resource-action {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s;
}

.resource-action:hover {
  background: #3b82f6;
  color: white;
  transform: scale(1.1);
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state p {
  color: #94a3b8;
  font-size: 0.9rem;
}

/* Video Call Modal */
.call-modal {
  position: fixed;
  inset: 0;
  background: #0f172a;
  z-index: 10000;
  display: flex;
  flex-direction: column;
}

.call-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.call-participant {
  position: relative;
  background: #1e293b;
  border-radius: 28px;
  overflow: hidden;
  aspect-ratio: 16/9;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.call-participant video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.participant-name {
  position: absolute;
  bottom: 15px;
  left: 15px;
  padding: 0.3rem 1rem;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
}

.call-toolbar {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  padding: 0.75rem 1.5rem;
  border-radius: 60px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.call-control {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.call-control:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.1);
}

.call-control.active {
  background: #10b981;
}

.call-control.end-call {
  background: #ef4444;
}

.call-control.end-call:hover {
  background: #dc2626;
}

/* Animations */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive */
@media (max-width: 768px) {
  .chat-app {
    height: 100vh;
    border-radius: 0;
  }

  .resources-panel {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
  }

  .message-bubble {
    max-width: 85%;
  }

  .call-text {
    display: none;
  }

  .call-button {
    width: 44px;
    padding: 0;
    justify-content: center;
  }
}
</style>
