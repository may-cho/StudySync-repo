<template>
  <div class="post-card-improved">
    <div v-if="post.isHot" class="hot-badge-improved">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
      </svg>
      Hot
    </div>
    <div class="post-header-improved">
      <div
        class="post-avatar-improved"
        :style="{ backgroundColor: getAvatarColor(post.author.username) }"
      >
        {{ post.author.username.charAt(0).toUpperCase() }}
        <span v-if="post.author.isOnline" class="online-badge"></span>
      </div>
      <div class="post-author-improved">
        <h4>
          {{ post.author.username }}
          <span
            v-if="post.author.id === groupCreatorId"
            class="post-badge-improved"
            >Creator</span
          >
        </h4>
        <div class="post-time-improved">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {{ formatTime(post.created_at) }}
        </div>
      </div>
    </div>

    <div class="post-content-improved">
      <p>{{ post.content }}</p>
    </div>

    <div v-if="post.image" class="post-media-container" @click="viewFullImage">
      <div class="image-wrapper">
        <img :src="post.image" :alt="post.content" class="actual-post-image" />
      </div>
    </div>
    <div v-if="post.tags && post.tags.length" class="post-tags-improved">
      <span v-for="tag in post.tags" :key="tag" class="tag-improved"
        >#{{ tag }}</span
      >
    </div>

    <div class="post-engagement-improved">
      <button
        @click="toggleLike"
        class="engagement-item"
        :class="{ liked: post.isLiked }"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          :fill="post.isLiked ? 'currentColor' : 'none'"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          ></path>
        </svg>
        <span>{{ post.likesCount }}</span>
      </button>
      <button @click="viewComments" class="engagement-item">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          ></path>
        </svg>
        <span>{{ post.comments?.length || 0 }}</span>
      </button>
      <button class="engagement-item">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue";
const props = defineProps({
  post: { type: Object, required: true },
  currentUser: { type: Object, required: true },
  groupCreatorId: { type: [Number, String], default: null },
  expanded: { type: Boolean, default: false },
});

const emit = defineEmits(["like", "delete", "view-comments"]);
import { ref } from "vue";

const isModalOpen = ref(false);
watch(isModalOpen, (val) => {
  document.body.style.overflow = val ? "hidden" : "auto";
});
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

const formatTime = (timestamp) => {
  if (!timestamp) return "recently";

  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const toggleLike = () => {
  emit("like", props.post);
};

const viewComments = () => {
  emit("view-comments", props.post);
};
</script>

<style scoped>
.post-card-improved {
  background: #fff;
  border-radius: 24px;
  padding: 1.5rem;
  margin-bottom: 1.2rem;
  border: 1px solid #f1f5f9;
  transition: all 0.2s;
  position: relative;
}

.post-card-improved:hover {
  background: white;
  border-color: #1e3a5f30;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -8px rgba(30, 58, 95, 0.15);
}

.hot-badge-improved {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: linear-gradient(135deg, #f59e0b, #dc2626);
  color: white;
  padding: 0.25rem 1.2rem;
  border-radius: 30px;
  font-size: 0.65rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  box-shadow: 0 4px 10px rgba(220, 38, 38, 0.25);
}

.hot-badge-improved svg {
  width: 12px;
  height: 12px;
}

.post-header-improved {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.post-avatar-improved {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  flex-shrink: 0;
  position: relative;
  box-shadow: 0 4px 10px rgba(30, 58, 95, 0.2);
}

.online-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: #10b981;
  border-radius: 50%;
  border: 2px solid white;
}

.post-author-improved h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.1rem;
}

.post-badge-improved {
  background: #1e3a5f15;
  color: #1e3a5f;
  font-size: 0.65rem;
  padding: 0.15rem 0.7rem;
  border-radius: 30px;
  font-weight: 500;
}

.post-time-improved {
  font-size: 0.7rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.post-time-improved svg {
  width: 12px;
  height: 12px;
}

.post-content-improved {
  margin-bottom: 1rem;
  padding-left: 0.2rem;
}

.post-content-improved p {
  font-size: 0.9rem;
  color: #1a2e35;
  line-height: 1.6;
  margin-bottom: 0.8rem;
}
.post-media-container {
  margin: 1rem 0;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  position: relative;
  transition: transform 0.2s ease;
}

.post-media-container:hover {
  transform: scale(1.01);
}

.image-wrapper {
  position: relative;
  width: 100%;
  max-height: 450px; /* Limits very tall images */
  display: flex;
  background: #f8fafc;
}

.actual-post-image {
  width: 100%;
  height: auto;
  object-fit: cover; /* Keeps image proportions nice */
  display: block;
}

/* Glassmorphism Overlay */
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 58, 95, 0.4); /* StudySync Blue with transparency */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
}

.post-media-container:hover .image-overlay {
  opacity: 1;
}

.expand-btn {
  background: white;
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1e3a5f;
  font-weight: 600;
  font-size: 0.85rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.post-media-improved {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 0.8rem 1rem;
  border-radius: 18px;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
  cursor: pointer;
}

.post-media-improved:hover {
  background: #f8fafc;
  border-color: #1e3a5f40;
}

.media-icon-improved {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #1e3a5f10, #4f6af510);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e3a5f;
}

.media-icon-improved svg {
  width: 22px;
  height: 22px;
}

.media-info-improved {
  flex: 1;
}

.media-info-improved h5 {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.15rem;
}

.media-info-improved p {
  font-size: 0.7rem;
  color: #64748b;
  margin: 0;
}

.media-action-improved {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: white;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e3a5f;
  cursor: pointer;
  transition: all 0.2s;
}

.media-action-improved:hover {
  background: #1e3a5f;
  color: white;
}

.media-action-improved svg {
  width: 18px;
  height: 18px;
}

.post-tags-improved {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.tag-improved {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.2rem 1rem;
  border-radius: 40px;
  font-size: 0.7rem;
  color: #1e3a5f;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
}

.tag-improved:hover {
  background: #1e3a5f;
  color: white;
  border-color: #1e3a5f;
}

.post-engagement-improved {
  display: flex;
  gap: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.engagement-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #64748b;
  font-size: 0.8rem;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
}

.engagement-item:hover {
  color: #1e3a5f;
}

.engagement-item.liked {
  color: #dc2626;
}

.engagement-item.liked svg {
  fill: #dc2626;
}

.engagement-item svg {
  width: 18px;
  height: 18px;
}
</style>
