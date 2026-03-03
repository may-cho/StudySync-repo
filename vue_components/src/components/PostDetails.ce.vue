<template>
  <div class="detail-post-container">
    <post-card
      :post="props.selectedPost"
      :current-user="props.currentUser"
      :group-creator-id="props.group.creator?.id"
      @like="handleLike"
      @delete="handleDelete"
      :expanded="true"
    />

    <!-- Comments Section -->
    <transition name="fade-slide" appear>
      <div class="detail-comments-section">
        <h3 class="comments-title">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            ></path>
          </svg>
          Comments
          <span class="comments-count">{{
            props.selectedPost.comments?.length || 0
          }}</span>
        </h3>

        <div class="comments-list">
          <transition-group name="comment-fade" tag="div">
            <div
              v-for="comment in props.selectedPost.comments"
              :key="comment.id"
              class="comment-item"
            >
              <div
                class="comment-avatar"
                :style="{
                  backgroundColor: getAvatarColor(comment.author.username),
                }"
              >
                {{ comment.author.username.charAt(0).toUpperCase() }}
              </div>
              <div class="comment-content">
                <div class="comment-bubble">
                  <div class="comment-header">
                    <span class="comment-author">{{
                      comment.author.username
                    }}</span>
                    <span class="comment-time">{{
                      formatTime(comment.created_at)
                    }}</span>
                  </div>
                  <p class="comment-text">{{ comment.content }}</p>
                </div>
                <div class="comment-actions">
                  <button
                    @click="toggleCommentLike(comment)"
                    class="comment-action"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      ></path>
                    </svg>
                    <span>{{ comment.likesCount || 0 }}</span>
                  </button>
                </div>
              </div>
            </div>
          </transition-group>
        </div>

        <!-- Add Comment Form -->
        <transition name="fade">
          <div class="add-comment-form">
            <input
              type="text"
              v-model="newCommentContent"
              class="comment-input"
              placeholder="Write a comment..."
              @keyup.enter="addComment"
            />
            <button
              class="send-comment-btn"
              @click="addComment"
              :disabled="!newCommentContent?.trim()"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const props = defineProps({
  selectedPost: Object,
  currentUser: Object,
  group: Object,
});
const newCommentContent = ref(null);

const emit = defineEmits([
  "post-like",
  "delete",
  "comment-like",
  "add-comment",
]);

const handleLike = (post) => {
  emit("post-like", post);
};

const handleDelete = (post) => {
  emit("delete", post);
};

const toggleCommentLike = (comment) => {
  emit("comment-like", comment);
};

const addComment = () => {
  if (!newCommentContent.value.trim()) return;
  emit("add-comment", {
    postId: props.selectedPost.id,
    comment: newCommentContent.value,
  });
  newCommentContent.value = "";
};

const getAvatarColor = (username) => {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
  ];
  const index =
    username.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  return colors[index];
};

const formatTime = (timeString) => {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};
</script>

<style>
/* Detail Comments Section - White background */
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

/* FADE TRANSITION - Used for the add comment form */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* FADE-SLIDE TRANSITION - Used for the comments section appearing */
.fade-slide-enter-active {
  transition: all 0.25s ease-out;
}

.fade-slide-leave-active {
  transition: all 0.2s ease-in;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* COMMENT-FADE TRANSITION - Used for individual comments in the list */
.comment-fade-enter-active,
.comment-fade-leave-active {
  transition: all 0.2s ease;
}

.comment-fade-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.comment-fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

/* Your existing styles */
.detail-comments-section {
  background: white;
  border-radius: 28px;
  padding: 1.5rem;
  border: 1px solid #f1f5f9;
  margin-top: 1rem;
  animation: slideIn 0.3s ease;
}

.comments-title {
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.comments-count {
  background: rgba(30, 58, 95, 0.1);
  padding: 0.2rem 0.8rem;
  border-radius: 30px;
  font-size: 0.7rem;
  color: #1e3a5f;
  font-weight: 600;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.2rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.comments-list::-webkit-scrollbar {
  width: 4px;
}

.comment-item {
  display: flex;
  gap: 0.8rem;
  animation: slideIn 0.3s ease;
}

.comment-avatar {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
  box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.1);
}

.comment-content {
  flex: 1;
}

.comment-bubble {
  background: #f8fafc;
  border-radius: 16px;
  padding: 0.8rem 1rem;
  border: 1px solid #f1f5f9;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
}

.comment-author {
  font-weight: 600;
  font-size: 0.75rem;
  color: #1e3a5f;
}

.comment-time {
  font-size: 0.6rem;
  color: #94a3b8;
}

.comment-text {
  font-size: 0.8rem;
  color: #1e293b;
  margin: 0;
  line-height: 1.5;
}

.comment-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.3rem;
  margin-left: 0.5rem;
}

.comment-action {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 0.65rem;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 30px;
  transition: all 0.2s;
}

.comment-action:hover {
  background: #f1f5f9;
  color: #1e3a5f;
}

.add-comment-form {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  margin-top: 1.2rem;
}

.comment-input {
  flex: 1;
  padding: 0.6rem 1.2rem;
  border: 1px solid #e2e8f0;
  border-radius: 40px;
  font-size: 0.8rem;
  background: #f8fafc;
}

.comment-input:focus {
  outline: none;
  border-color: #1e3a5f;
  background: white;
}

.send-comment-btn {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background: #1e3a5f;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 8px 12px -4px rgba(30, 58, 95, 0.2);
}

.send-comment-btn:hover:not(:disabled) {
  background: #14273f;
  transform: scale(1.05);
}

.send-comment-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
