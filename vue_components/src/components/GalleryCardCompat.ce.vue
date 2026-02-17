<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  profile: [Object, String],
  matchPercent: [Number, String],
  overlapHours: [Number, String],
  overlapCourses: [Array, String],
  timeSlots: {
    type: [Array, String],
    default: () => [],
  },
});

const emit = defineEmits(["connect"]);

// Parsing utilities
const parsedProfile = computed(() => {
  if (typeof props.profile === "object") return props.profile;
  try {
    return props.profile ? JSON.parse(props.profile) : { username: "..." };
  } catch {
    return { username: "Error" };
  }
});

const parsedCourses = computed(() => {
  if (Array.isArray(props.overlapCourses)) return props.overlapCourses;
  try {
    return props.overlapCourses ? JSON.parse(props.overlapCourses) : [];
  } catch {
    return [];
  }
});

const timeSlots = computed(() => {
  if (Array.isArray(props.timeSlots)) return props.timeSlots;
  try {
    return props.timeSlots ? JSON.parse(props.timeSlots) : [];
  } catch {
    return [];
  }
});

// Avatar
const avatarInitials = computed(() => {
  const name = parsedProfile.value.username || "??";
  return name.charAt(0).toUpperCase();
});

// Cover gradient
const coverStyle = computed(() => {
  const gradients = [
    "linear-gradient(135deg, #4158D0 0%, #C850C0 100%)",
    "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)",
    "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)",
  ];
  const index = (parsedProfile.value.username?.length || 0) % gradients.length;
  return { background: gradients[index] };
});

// Format time
const formatTime = (time) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours);
  const ampm = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 || 12;
  return `${hour12}${minutes !== "00" ? `:${minutes}` : ""}${ampm}`;
};

// Time preference
const timePeriodLabel = computed(() => {
  if (timeSlots.value.length === 0) return "flexible";
  const slot = timeSlots.value[0];
  if (!slot.start_time) return "flexible";
  const hour = parseInt(slot.start_time.split(":")[0]);
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
});

// Emoji based on time
const timeEmoji = computed(() => {
  if (timeSlots.value.length === 0) return "🔄";
  const slot = timeSlots.value[0];
  if (!slot.start_time) return "🔄";
  const hour = parseInt(slot.start_time.split(":")[0]);
  if (hour < 12) return "🌅";
  if (hour < 17) return "☀️";
  return "🌙";
});

// Schedule summary
const scheduleSummary = computed(() => {
  if (timeSlots.value.length === 0) return "No schedule available";
  const firstSlot = timeSlots.value[0];
  const day = firstSlot.day?.substring(0, 3) || "Any";
  const time = firstSlot.start_time
    ? formatTime(firstSlot.start_time)
    : "Flexible";
  return `${day} ${time} · ${timeSlots.value.length} slot${timeSlots.value.length > 1 ? "s" : ""}`;
});

// Course summary
const courseSummary = computed(() => {
  if (parsedCourses.value.length === 0) return "No shared courses";
  const firstCourse = parsedCourses.value[0];
  const courseDisplay =
    firstCourse.length > 20
      ? firstCourse.substring(0, 17) + "..."
      : firstCourse;
  return `${courseDisplay} · ${parsedCourses.value.length} total`;
});

// Actions
const viewProfile = () => {
  const username = parsedProfile.value.username.replace("@", "");
  window.location.href = `/profile/${username}/`;
};

const inviteToStudyGroup = () => {
  const username = parsedProfile.value.username.replace("@", "");
  window.location.href = `/study-groups/create/?invite=${username}`;
};

const sendMessage = () => {
  const username = parsedProfile.value.username.replace("@", "");
  window.location.href = `/messages/new/?to=${username}`;
};

const handleConnect = () => {
  emit("connect", parsedProfile.value.username);
};
</script>

<template>
  <div class="elegant-item-container">
    <div class="glow-accent" :style="coverStyle"></div>

    <div class="elegant-content">
      <div class="identity-block">
        <div class="avatar-container">
          <div class="avatar-ring" :style="avatarBorder"></div>
          <div class="avatar-main" :style="coverStyle">
            {{ avatarInitials }}
          </div>
        </div>
        <div class="name-section">
          <h3 class="username">{{ parsedProfile.username }}</h3>
          <p class="major">{{ parsedProfile.major }}</p>
        </div>
      </div>

      <div class="match-stats">
        <div class="stat-group">
          <span class="stat-label">Match</span>
          <span class="stat-value highlight"
            >{{ matchPercent }}<small>%</small></span
          >
        </div>
        <div class="vertical-divider"></div>
        <div class="stat-group">
          <span class="stat-label">Overlap</span>
          <span class="stat-value">{{ overlapHours }}<small>h</small></span>
        </div>
        <div class="vertical-divider"></div>
        <div class="stat-group">
          <span class="stat-label">Shared</span>
          <span class="stat-value"
            >{{ parsedCourses.length }}<small>📚</small></span
          >
        </div>
      </div>

      <div class="action-block">
        <button class="action-trigger primary" @click="viewProfile">
          <span>View</span>
        </button>
        <button class="action-trigger icon" @click="sendMessage">
          <span class="icon-inner">💬</span>
        </button>
        <button class="action-trigger icon" @click="inviteToStudyGroup">
          <span class="icon-inner">📅</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

.elegant-item-container {
  font-family: "Inter", sans-serif;
  position: relative;
  background: #ffffff;
  border-radius: 16px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.elegant-item-container:hover {
  background: #fafafb;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.08);
}

/* Subtle background glow based on cover color */
.glow-accent {
  position: absolute;
  top: -50px;
  left: -50px;
  width: 150px;
  height: 150px;
  filter: blur(60px);
  opacity: 0.1;
  pointer-events: none;
  z-index: 0;
}

.elegant-content {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

/* Identity Section */
.identity-block {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1.5;
}

.avatar-container {
  position: relative;
  width: 52px;
  height: 52px;
}

.avatar-main {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
}

.name-section .username {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.name-section .major {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 2px 0 0;
}

/* Match Stats */
.match-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 2;
  gap: 1.5rem;
}

.stat-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ca3af;
  font-weight: 500;
  margin-bottom: 2px;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
}

.stat-value small {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-left: 1px;
}

.stat-value.highlight {
  color: #4f46e5;
}

.vertical-divider {
  width: 1px;
  height: 24px;
  background: #f3f4f6;
}

/* Action Block */
.action-block {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  justify-content: flex-end;
}

.action-trigger {
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-trigger.primary {
  background: #111827;
  color: white;
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
}

.action-trigger.primary:hover {
  background: #1f2937;
  transform: translateY(-1px);
}

.action-trigger.icon {
  background: #f9fafb;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b5563;
  border: 1px solid #f3f4f6;
}

.action-trigger.icon:hover {
  background: #ffffff;
  border-color: #e5e7eb;
  color: #111827;
}

@media (max-width: 768px) {
  .elegant-content {
    flex-direction: column;
    gap: 1.25rem;
    text-align: center;
  }
  .identity-block {
    flex-direction: column;
  }
  .match-stats {
    width: 100%;
    border-top: 1px solid #f3f4f6;
    padding-top: 1rem;
  }
  .action-block {
    width: 100%;
    justify-content: center;
  }
}
</style>
