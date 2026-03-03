<template>
  <div class="group-wrapper">
    <div class="group-fullscreen">
      <!-- Group Header - Fixed overflow -->
      <div class="group-header">
        <div class="header-left">
          <div class="group-avatar">
            {{ group.name.charAt(0).toUpperCase() }}
          </div>
          <div class="group-info">
            <h1>{{ group.name }}</h1>
            <div class="group-meta">
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Created {{ formatDate(group.created_at) }}
              </span>
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                {{ group.member_count }} / {{ group.max_members }} members
              </span>
              <span
                v-if="group.group_type"
                class="group-badge"
                :class="group.group_type"
              >
                <svg
                  v-if="group.group_type === 'major'"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  ></path>
                </svg>
                <svg
                  v-else-if="group.group_type === 'course'"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                <svg
                  v-else
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                {{ getGroupTypeLabel(group.group_type) }}
              </span>
              <span v-if="isCreator" class="group-badge creator">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  ></path>
                </svg>
                Creator
              </span>
            </div>
          </div>
        </div>
        <div class="group-actions">
          <a :href="`/chat/${group.id}`" class="btn-group primary">
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
            Chat
          </a>
          <button v-if="isMember" @click="leaveGroup" class="btn-group outline">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Leave
          </button>
        </div>
      </div>

      <!-- Two Column Layout - SWITCHED: Left column now takes more space (2fr) -->
      <div class="two-column">
        <!-- LEFT COLUMN - Now MAIN content area (Create Post + Feed) - 2fr -->
        <div class="main-column">
          <!-- Create Post -->
          <div class="create-post-card">
            <div class="create-post-header">
              <div
                class="create-avatar"
                :style="{
                  backgroundColor: getAvatarColor(currentUser.username),
                }"
              >
                {{ currentUser.username.charAt(0).toUpperCase() }}
              </div>
              <input
                type="text"
                class="create-post-input"
                placeholder="What's on your mind? Share something with the group..."
                v-model="newPostContent"
              />
            </div>

            <div v-if="imagePreview" class="image-preview-container">
              <img :src="imagePreview" class="image-preview" alt="Preview" />
              <button class="remove-image-btn" @click="removeImage">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div class="create-post-toolbar">
              <div class="toolbar-left">
                <button class="toolbar-btn" @click="triggerImageUpload">
                  <svg
                    width="16"
                    height="16"
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
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <span>Photo</span>
                </button>
                <button class="toolbar-btn">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                    ></path>
                    <path
                      d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                    ></path>
                  </svg>
                  <span>Link</span>
                </button>
              </div>
              <button
                class="post-btn"
                @click="createPost"
                :disabled="!newPostContent.trim() && !imagePreview"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                <span>Post</span>
              </button>
            </div>

            <!-- Hidden file input -->
            <input
              type="file"
              ref="imageInput"
              class="hidden-input"
              accept="image/*"
              @change="handleImageUpload"
            />
          </div>

          <!-- View Header (visible in detail view) -->
          <transition name="fade-slide">
            <div v-if="viewMode === 'detail'" class="view-header">
              <button class="back-to-feed" @click="closeDetailView">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7"></path>
                </svg>
                Back to Feed
              </button>
            </div>
          </transition>

          <!-- Feed View (All Posts) with Fade Transition -->
          <transition name="fade" mode="out-in">
            <div
              v-if="viewMode === 'feed'"
              key="feed"
              class="posts-feed-scrollable"
            >
              <PostCard
                v-for="post in sortedPosts"
                :key="post.id"
                :post="post"
                :current-user="currentUser"
                :group-creator-id="group.creator?.id"
                @like="handleLike"
                @delete="handleDelete"
                @view-comments="viewPostDetail"
              />
            </div>

            <!-- Detail View (Single Post with Comments) with Fade Transition -->
            <div
              v-else-if="viewMode === 'detail'"
              key="detail"
              class="detail-view-scrollable"
            >
              <PostDetails
                :selected-post="selectedPost"
                :current-user="currentUser"
                :group="group"
                @add-comment="handleAddComment"
                @post-like="handlePostLike"
                @delete="handlePostDelete"
                @comment-like="handleCommentLike"
              >
              </PostDetails>
            </div>
          </transition>
        </div>

        <!-- RIGHT COLUMN - Now Sidebar (Members Preview & Sessions) - 1fr -->
        <div class="sidebar-column">
          <!-- Members Preview Card - Compact -->
          <div class="compact-card">
            <div class="card-header-compact">
              <div class="header-title">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Members</span>
                <span class="header-count">{{ group.member_count }}</span>
              </div>
              <a href="#" class="header-link">View all</a>
            </div>
            <div class="compact-member-list">
              <div
                v-for="member in previewMembers"
                :key="member.id"
                class="compact-member-item"
              >
                <div
                  class="compact-member-avatar"
                  :style="{ backgroundColor: getAvatarColor(member.username) }"
                >
                  {{ member.username.charAt(0).toUpperCase() }}
                  <span
                    v-if="member.isOnline"
                    class="compact-online-indicator"
                  ></span>
                </div>
                <div class="compact-member-info">
                  <span class="compact-member-name">{{ member.username }}</span>
                  <span class="compact-member-role">{{ member.role }}</span>
                </div>
                <span
                  v-if="member.id === group.creator?.id"
                  class="compact-creator-badge"
                  >👑</span
                >
                <span
                  v-else-if="member.id === currentUser.id"
                  class="compact-you-badge"
                  >you</span
                >
              </div>
            </div>
          </div>

          <!-- Sessions Card - Compact -->
          <div class="compact-card">
            <div class="card-header-compact">
              <div class="header-title">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Sessions</span>
              </div>
            </div>
            <div class="compact-session-list">
              <div v-if="group.study_day" class="compact-session-item">
                <div class="session-time">
                  {{ group.study_day.substring(0, 3) }} •
                  {{ formatTime(group.start_time) }}
                </div>
                <div class="session-name">Regular Meeting</div>
                <span class="compact-live-badge">Live</span>
              </div>
              <div class="compact-session-item">
                <div class="session-time">WED • 3:30 PM</div>
                <div class="session-name">Practice Problems</div>
                <span class="session-attendees">5 going</span>
              </div>
              <div class="compact-session-item">
                <div class="session-time">FRI • 2:00 PM</div>
                <div class="session-name">Midterm Prep</div>
                <span class="session-attendees">12 going</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
import { ref, computed, onMounted } from "vue";
import PostCard from "./PostCard.ce.vue";
import PostDetails from "./PostDetails.ce.vue";

// Dummy Data
const group = ref(null);
const currentUser = ref(null);

const members = ref(null);

const posts = ref([
  {
    id: 1,
    author: { id: 2, username: "alex_chen", isOnline: true },
    content:
      "🎉 Just finished implementing a balanced binary tree in Python! Here's my implementation if anyone wants to see:",
    image: null,
    created_at: "2024-03-15T14:30:00Z",
    likesCount: 24,
    isLiked: false,
    isHot: true,
    tags: ["python", "binarytrees", "algorithms"],
    comments: [
      {
        id: 101,
        author: { username: "maria_r", id: 4 },
        content:
          "This is so helpful! I was stuck on the recursive part for hours.",
        likesCount: 5,
        created_at: "2024-03-15T15:20:00Z",
      },
      {
        id: 102,
        author: { username: "james_kim", id: 5 },
        content: "Could you explain the time complexity?",
        likesCount: 2,
        created_at: "2024-03-15T16:10:00Z",
      },
    ],
  },
  {
    id: 2,
    author: { id: 4, username: "maria_r", isOnline: true },
    content:
      "Has anyone started working on the BFS/DFS assignment? I'm a bit confused about the implementation.",
    image: null,
    created_at: "2024-03-14T09:15:00Z",
    likesCount: 12,
    isLiked: true,
    isHot: false,
    tags: ["help", "bfs", "dfs"],
    comments: [
      {
        id: 103,
        author: { username: "alex_chen", id: 2 },
        content:
          "BFS uses queue, DFS uses stack. Think level order vs depth first.",
        likesCount: 8,
        created_at: "2024-03-14T10:30:00Z",
      },
    ],
  },
  {
    id: 3,
    author: { id: 5, username: "james_kim", isOnline: false },
    content:
      "Found this amazing visualization tool for sorting algorithms: https://visualgo.net/en/sorting",
    image: null,
    created_at: "2024-03-13T18:20:00Z",
    likesCount: 18,
    isLiked: false,
    isHot: false,
    tags: ["resources", "sorting", "visualization"],
    comments: [],
  },
]);

const fetchData = async () => {
  const path = window.location.pathname;
  const segments = path.split("/").filter((s) => s !== "");

  const groupId = segments[segments.length - 1];

  try {
    const response = await axios.get(`/api/groups/${groupId}`);
    console.log(response.data.group);

    group.value = response.data.group;
    members.value = response.data.members;
    currentUser.value = response.data.current_user;
  } catch (err) {
    console.error("Error fetching group details.", err);
  }
};
onMounted(() => {
  fetchData();
});
// Create post state
const newPostContent = ref("");
const imagePreview = ref(null);
const imageFile = ref(null);
const imageInput = ref(null);

// View state
const viewMode = ref("feed");
const selectedPost = ref(null);
const newCommentContent = ref("");

// Computed properties
const isCreator = computed(() => {
  return group.value.creator?.id === currentUser.value.id;
});

const isMember = computed(() => {
  return members.value.some((m) => m.id === currentUser.value.id);
});

const previewMembers = computed(() => {
  return members.value.slice(0, 5);
});

const sortedPosts = computed(() => {
  return [...posts.value].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at),
  );
});

const handleAddComment = async ({ postId, comment }) => {
  try {
    const response = await axios.post(`/api/posts/${postId}/comment`, {
      content: comment,
    });

    if (response.status === 200 || response.status === 201) {
      const data = response.data.data;
      console.log(data);

      posts.value.unshift({
        id: data.id,
        author: data.author,
        content: data.content,
        likesCount: data.likes,
        created_at: data.created_at,
      });
    }
  } catch (err) {
    console.error("Error commenting to the post.", err);
  }
};

const handleCommentLike = () => {};
const handlePostDelete = () => {};

const handlePostLike = () => {};
// Methods
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

const formatDate = (dateString) => {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (timeString) => {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

const getGroupTypeLabel = (type) => {
  const labels = {
    major: "Major-Based",
    course: "Course-Based",
    general: "General Study",
  };
  return labels[type] || "General Study";
};

// Post creation methods
const triggerImageUpload = () => {
  imageInput.value?.click();
};

const handleImageUpload = (event) => {
  const fileInput = event.target;
  if (!fileInput || !fileInput.files.length) return;

  const file = fileInput.files[0];

  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  imagePreview.value = null;
  imageFile.value = null;
  if (imageInput.value) {
    imageInput.value.value = "";
  }
};

const createPost = async () => {
  if (!newPostContent.value.trim() && !imagePreview.value) return;

  try {
    const formData = new FormData();

    formData.append("content", newPostContent.value.trim());
    formData.append("image", imageFile.value);

    const response = await axios.post(
      `/groups/${group.id}/post/create`,
      formData,
    );

    if (response.status === 200 || response.status === 201) {
      const data = response.data;

      console.log(data);
    }
    console.log("Uploaded successfully:", response.data);
  } catch (err) {
    console.log("Error creating post.", err);
  }
  const newPost = {
    id: Date.now(),
    author: {
      id: currentUser.id,
      username: currentUser.username,
      isOnline: true,
    },
    content: newPostContent.value,
    image: imagePreview.value,
    created_at: new Date().toISOString(),
    likesCount: 0,
    isLiked: false,
    isHot: false,
    tags: [],
    comments: [],
  };

  posts.value.unshift(newPost);
  newPostContent.value = "";
  removeImage();
};

const handleLike = (post) => {
  post.isLiked = !post.isLiked;
  post.likesCount += post.isLiked ? 1 : -1;
};

const handleDelete = (post) => {
  if (
    confirm(
      post.author.id === currentUser.id
        ? "Delete your post?"
        : "Remove this post?",
    )
  ) {
    const index = posts.value.findIndex((p) => p.id === post.id);
    if (index !== -1) posts.value.splice(index, 1);
    if (viewMode.value === "detail" && selectedPost.value?.id === post.id) {
      closeDetailView();
    }
  }
};

// View toggle methods
const viewPostDetail = (post) => {
  selectedPost.value = post;
  viewMode.value = "detail";
  newCommentContent.value = "";
};

const closeDetailView = () => {
  viewMode.value = "feed";
  selectedPost.value = null;
  newCommentContent.value = "";
};

// Comment methods
const toggleCommentLike = (comment) => {
  comment.isLiked = !comment.isLiked;
  comment.likesCount += comment.isLiked ? 1 : -1;
};

const addComment = () => {
  if (!newCommentContent.value.trim() || !selectedPost.value) return;

  const newComment = {
    id: Date.now(),
    author: {
      username: currentUser.username,
      id: currentUser.id,
    },
    content: newCommentContent.value,
    created_at: new Date().toISOString(),
    likesCount: 0,
    isLiked: false,
  };

  selectedPost.value.comments.push(newComment);
  newCommentContent.value = "";
};

const leaveGroup = () => {
  if (confirm("Are you sure you want to leave this group?")) {
    console.log("Leaving group:", group.id);
  }
};
</script>

<style scoped>
/* Animation Keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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

.group-wrapper {
  min-height: 100vh;
  overflow-x: hidden;
}

.group-fullscreen {
  width: 100%;
  min-height: 100vh;
  /* padding: 2rem 2.5rem; */
  background: transparent;
  font-family: "Inter", sans-serif;
}

/* Group Header - Fixed overflow */
.group-header {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 32px;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-left {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.group-avatar {
  width: 70px;
  height: 70px;
  background: linear-gradient(145deg, #1e3a5f, #2d4b75);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.2rem;
  font-weight: 600;
  box-shadow: 0 15px 25px -8px rgba(30, 58, 95, 0.3);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.group-avatar::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 60%
  );
  pointer-events: none;
}

.group-info {
  min-width: 0;
  flex: 1;
}

.group-info h1 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.3rem;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.group-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: #64748b;
  font-size: 0.85rem;
}

.group-meta span {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.group-meta span svg {
  width: 16px;
  height: 16px;
  stroke: #1e3a5f;
  opacity: 0.7;
}

.group-badge {
  background: rgba(241, 245, 249, 0.8);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  color: #1e3a5f;
  padding: 0.3rem 1rem;
  border-radius: 40px;
  font-size: 0.7rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.group-badge.creator {
  background: rgba(254, 243, 199, 0.8);
  color: #92400e;
}

.group-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.btn-group {
  padding: 0.7rem 1.8rem;
  border-radius: 40px;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.2s;
  border: 1px solid transparent;
  cursor: pointer;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.btn-group.primary {
  background: #1e3a5f;
  color: white;
  box-shadow: 0 8px 16px -6px rgba(30, 58, 95, 0.2);
}

.btn-group.primary:hover {
  background: #14273f;
  transform: translateY(-1px);
  box-shadow: 0 12px 20px -8px rgba(30, 58, 95, 0.3);
}

.btn-group.outline {
  background: rgba(255, 255, 255, 0.7);
  color: #1e3a5f;
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.btn-group.outline:hover {
  background: white;
  border-color: #1e3a5f;
}

/* Two Column Layout - SWITCHED: Main column now 2fr, Sidebar 1fr */
.two-column {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

/* Main Column (Left) - Feed and Posts */
.main-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
  overflow: hidden;
}

/* Sidebar Column (Right) - Members and Sessions */
.sidebar-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.sidebar-column::-webkit-scrollbar {
  width: 4px;
}

.sidebar-column::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.5);
  border-radius: 2px;
}

.sidebar-column::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

/* Compact Card */
.compact-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 28px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 15px 30px -12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.compact-card:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
  box-shadow: 0 20px 35px -15px rgba(0, 0, 0, 0.1);
}

.card-header-compact {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
}

.header-title svg {
  width: 18px;
  height: 18px;
  stroke: #1e3a5f;
  opacity: 0.7;
}

.header-count {
  background: rgba(30, 58, 95, 0.1);
  padding: 0.15rem 0.6rem;
  border-radius: 30px;
  font-size: 0.7rem;
  color: #1e3a5f;
  font-weight: 600;
}

.header-link {
  color: #1e3a5f;
  font-size: 0.7rem;
  text-decoration: none;
  padding: 0.3rem 1rem;
  border-radius: 30px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.2s;
}

.header-link:hover {
  background: white;
  border-color: #1e3a5f;
}

/* Compact Member List */
.compact-member-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.compact-member-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.4rem 0.5rem;
  border-radius: 12px;
  transition: all 0.2s;
}

.compact-member-item:hover {
  background: rgba(248, 250, 252, 0.7);
}

.compact-member-avatar {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  position: relative;
  flex-shrink: 0;
  box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.1);
}

.compact-online-indicator {
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  border: 2px solid white;
}

.compact-member-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.compact-member-name {
  font-weight: 600;
  color: #0f172a;
}

.compact-member-role {
  font-size: 0.65rem;
  color: #94a3b8;
  background: rgba(241, 245, 249, 0.7);
  padding: 0.15rem 0.6rem;
  border-radius: 30px;
}

.compact-creator-badge,
.compact-you-badge {
  font-size: 0.65rem;
  padding: 0.15rem 0.6rem;
  border-radius: 30px;
  font-weight: 500;
}

.compact-creator-badge {
  background: #fef3c7;
  color: #92400e;
}

.compact-you-badge {
  background: #e0f2fe;
  color: #0369a1;
}

/* Compact Session List */
.compact-session-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.compact-session-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
  font-size: 0.85rem;
}

.compact-session-item:last-child {
  border-bottom: none;
}

.session-time {
  min-width: 90px;
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

.session-name {
  flex: 1;
  color: #0f172a;
  font-weight: 500;
}

.compact-live-badge {
  background: #dc2626;
  color: white;
  padding: 0.2rem 0.8rem;
  border-radius: 30px;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  animation: float 2s infinite;
}

.session-attendees {
  font-size: 0.7rem;
  color: #64748b;
  background: rgba(241, 245, 249, 0.7);
  padding: 0.2rem 0.8rem;
  border-radius: 30px;
}

/* Create Post Card - White background */
.create-post-card {
  background: white;
  border-radius: 28px;
  padding: 1.2rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 15px 30px -12px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.create-post-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.create-avatar {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  flex-shrink: 0;
  box-shadow: 0 8px 12px -4px rgba(0, 0, 0, 0.1);
}

.create-post-input {
  flex: 1;
  padding: 0.8rem 1.2rem;
  border: 1px solid #e2e8f0;
  border-radius: 40px;
  font-size: 0.9rem;
  transition: all 0.2s;
  background: #f8fafc;
}

.create-post-input:focus {
  outline: none;
  border-color: #1e3a5f;
  background: white;
  box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.1);
}

.create-post-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolbar-left {
  display: flex;
  gap: 0.5rem;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  border-radius: 40px;
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.toolbar-btn:hover {
  background: #f8fafc;
  color: #1e3a5f;
}

.toolbar-btn svg {
  width: 16px;
  height: 16px;
}

.post-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1.5rem;
  background: #1e3a5f;
  border: none;
  border-radius: 40px;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 8px 16px -6px rgba(30, 58, 95, 0.2);
}

.post-btn:hover:not(:disabled) {
  background: #14273f;
  transform: translateY(-1px);
  box-shadow: 0 12px 20px -8px rgba(30, 58, 95, 0.3);
}

.post-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Hidden file input - completely hidden */
.hidden-input {
  display: none;
}

.image-preview-container {
  position: relative;
  margin: 0.5rem 0;
  display: inline-block;
}

.image-preview {
  max-height: 100px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: white;
}

.remove-image-btn {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  background: #dc2626;
  border: none;
  border-radius: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.7rem;
}

/* Scrollable Containers */
.posts-feed-scrollable,
.detail-view-scrollable {
  flex: 1;
  overflow-y: auto;
  padding-right: 0.8rem;
}

.posts-feed-scrollable::-webkit-scrollbar,
.detail-view-scrollable::-webkit-scrollbar {
  width: 4px;
}

.posts-feed-scrollable::-webkit-scrollbar-track,
.detail-view-scrollable::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.5);
  border-radius: 2px;
}

.posts-feed-scrollable::-webkit-scrollbar-thumb,
.detail-view-scrollable::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

/* View Header */
.view-header {
  margin-bottom: 0.5rem;
}

.back-to-feed {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 30px;
  color: #1e3a5f;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.back-to-feed:hover {
  background: #f8fafc;
  border-color: #1e3a5f;
}

/* Responsive */
@media (max-width: 1200px) {
  .two-column {
    grid-template-columns: 1fr;
    height: auto;
  }

  .main-column {
    max-height: 600px;
  }

  .sidebar-column {
    max-height: 400px;
  }
}

@media (max-width: 768px) {
  .group-fullscreen {
    padding: 1rem;
  }

  .group-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .group-info h1 {
    white-space: normal;
  }

  .create-post-toolbar {
    flex-direction: column;
    gap: 0.8rem;
  }

  .toolbar-left {
    width: 100%;
    justify-content: center;
  }

  .post-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
