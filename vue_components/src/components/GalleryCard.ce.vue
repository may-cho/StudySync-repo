<template>
  <div class="gallery-card">
    <!-- Cover with avatar -->
    <div class="card-cover" :style="coverStyle">
      <div class="card-avatar">{{ avatarInitials }}</div>
    </div>

    <div class="card-content">
      <!-- Header -->
      <div class="card-header">
        <div>
          <h3 class="card-name">{{ parsedProfile.username }}</h3>
          <div class="card-meta">
            <span>{{ parsedProfile.major }}</span>
            <span class="dot">•</span>
            <span>Year {{ parsedProfile.year }}</span>
          </div>
        </div>
        <div class="match-pill">
          <span class="match-value">{{ matchPercent }}</span>
          <span class="match-symbol">%</span>
        </div>
      </div>

      <!-- Compatibility Stats - horizontal in grid, vertical in list -->
      <div class="stats-minimal" :class="{ 'list-stats': isListView }">
        <div class="stat-minimal">
          <span class="stat-minimal-emoji">📚</span>
          <span class="stat-minimal-text">
            <span class="stat-minimal-value">{{ parsedCourses.length }}</span>
            <span class="stat-minimal-label">courses</span>
          </span>
        </div>

        <div class="stat-minimal-divider" v-if="!isListView"></div>

        <div class="stat-minimal">
          <span class="stat-minimal-emoji">⏰</span>
          <span class="stat-minimal-text">
            <span class="stat-minimal-value">{{ overlapHours }}h</span>
            <span class="stat-minimal-label">overlap</span>
          </span>
        </div>

        <div class="stat-minimal-divider" v-if="!isListView"></div>

        <div class="stat-minimal">
          <span class="stat-minimal-emoji">{{ timeEmoji }}</span>
          <span class="stat-minimal-text">
            <span class="stat-minimal-value">{{ timePeriodLabel }}</span>
            <span class="stat-minimal-label">pref</span>
          </span>
        </div>
      </div>

      <!-- Schedule & Courses in horizontal row for list view -->
      <div v-if="isListView" class="list-details-row">
        <!-- Schedule Availability - Compact for list -->
        <div class="schedule-availability list-compact">
          <div class="section-header list-header">
            <div class="section-title">
              <span>📅</span>
              <span>Schedule</span>
            </div>
            <span v-if="hasSchedule" class="slot-count">{{
              timeSlots.length
            }}</span>
          </div>

          <div v-if="hasSchedule" class="schedule-slots list-slots">
            <div
              v-for="(slot, idx) in visibleTimeSlots.slice(0, 2)"
              :key="idx"
              class="slot-chip list-chip"
              :title="slot.tooltip"
            >
              <span class="slot-day">{{ slot.dayShort }}</span>
              <span class="slot-time">{{ slot.timeRange }}</span>
            </div>
            <div v-if="timeSlots.length > 2" class="slot-chip more list-chip">
              +{{ timeSlots.length - 2 }}
            </div>
          </div>

          <div v-else class="empty-state list-empty">
            <span class="empty-text">No availability</span>
          </div>
        </div>

        <!-- Shared Courses - Compact for list -->
        <div class="shared-courses list-compact">
          <div class="section-header list-header">
            <div class="section-title">
              <span>🏷️</span>
              <span>Courses</span>
            </div>
            <span v-if="parsedCourses.length > 0" class="course-count">{{
              parsedCourses.length
            }}</span>
          </div>

          <div v-if="parsedCourses.length > 0" class="course-list list-courses">
            <span
              v-for="course in parsedCourses.slice(0, 2)"
              :key="course"
              class="course-chip list-chip"
            >
              {{ course }}
            </span>
            <span
              v-if="parsedCourses.length > 2"
              class="course-chip more list-chip"
            >
              +{{ parsedCourses.length - 2 }}
            </span>
          </div>

          <div v-else class="empty-state list-empty">
            <span class="empty-text">No courses</span>
          </div>
        </div>
      </div>

      <!-- Original schedule/courses sections for grid view -->
      <template v-if="!isListView">
        <!-- Schedule Availability -->
        <div class="schedule-availability">
          <div class="section-header">
            <div class="section-title">
              <span>📅</span>
              <span>Schedule match</span>
            </div>
            <span v-if="hasSchedule" class="slot-count"
              >{{ timeSlots.length }} slots</span
            >
          </div>

          <div v-if="hasSchedule" class="schedule-slots">
            <div
              v-for="(slot, idx) in visibleTimeSlots"
              :key="idx"
              class="slot-chip"
              :title="slot.tooltip"
            >
              <span class="slot-day">{{ slot.dayShort }}</span>
              <span class="slot-time">{{ slot.timeRange }}</span>
            </div>
            <div v-if="timeSlots.length > 3" class="slot-chip more">
              +{{ timeSlots.length - 3 }}
            </div>
          </div>

          <div v-else class="empty-state">
            <span class="empty-text">No common availability</span>
          </div>
        </div>

        <!-- Shared Courses -->
        <div class="shared-courses">
          <div class="section-header">
            <div class="section-title">
              <span>🏷️</span>
              <span>Courses in common</span>
            </div>
            <span v-if="parsedCourses.length > 0" class="course-count">
              {{ parsedCourses.length }} total
            </span>
          </div>

          <div v-if="parsedCourses.length > 0" class="course-list">
            <span
              v-for="course in parsedCourses.slice(0, 3)"
              :key="course"
              class="course-chip"
            >
              {{ course }}
            </span>
            <span v-if="parsedCourses.length > 3" class="course-chip more">
              +{{ parsedCourses.length - 3 }}
            </span>
          </div>

          <div v-else class="empty-state">
            <span class="empty-text">No shared courses</span>
          </div>
        </div>
      </template>

      <!-- Actions -->
      <div class="card-actions" :class="{ 'list-actions': isListView }">
        <button class="btn-profile" @click="viewProfile">
          <span>👤</span>
          <span>View Profile</span>
        </button>
        <button class="btn-icon invite" @click="" title="Invite to study group">
          <span>🤝</span>
        </button>
        <button class="btn-icon message" @click="" title="Send message">
          <span>💬</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from "vue";

const props = defineProps({
  profile: [Object, String],
  matchPercent: [Number, String],
  overlapHours: [Number, String],
  overlapCourses: [Array, String],
  timeSlots: {
    type: [Array, String],
    default: () => [],
  },
  viewMode: {
    type: String,
    default: "grid",
  },
});

const emit = defineEmits(["connect"]);

// Use injected view mode or prop
const injectedViewMode = inject("viewMode", null);
const isListView = computed(
  () => (injectedViewMode?.value || props.viewMode) === "list",
);

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

// Time slots
const hasSchedule = computed(() => timeSlots.value.length > 0);

const formatTime = (time) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours);
  const ampm = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 || 12;
  return `${hour12}${minutes !== "00" ? `:${minutes}` : ""}${ampm}`;
};

const visibleTimeSlots = computed(() => {
  return timeSlots.value.slice(0, 3).map((slot) => ({
    dayShort: slot.day?.substring(0, 3) || "Any",
    timeRange: slot.start_time
      ? `${formatTime(slot.start_time)}-${formatTime(slot.end_time)}`
      : "Flexible",
    tooltip: `${slot.day || "Any day"}: ${slot.start_time || "Flexible"} - ${slot.end_time || "Flexible"}`,
  }));
});

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

// Actions
const viewProfile = () => {
  window.location.href = `/profile/${parsedProfile.value.id}/`;
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

<style scoped>
/* Base styles */
.gallery-card {
  background: white;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f2f5;
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.gallery-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -12px rgba(65, 88, 208, 0.2);
  border-color: transparent;
}

/* Card Cover */
.card-cover {
  height: 110px;
  position: relative;
  flex-shrink: 0;
}

.card-avatar {
  width: 100px;
  height: 100px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 2.2rem;
  color: white;
  position: absolute;
  bottom: -45px;
  left: 5px;
  border: 4px solid white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #4158d0, #c850c0);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.card-content {
  padding: 3rem 1.5rem 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Header */
.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-shrink: 0;
}

.card-name {
  font-weight: 600;
  font-size: 1.2rem;
  color: #1e293b;
  margin: 0 0 0.25rem;
  letter-spacing: -0.01em;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.85rem;
}

.dot {
  color: #cbd5e1;
}

.match-pill {
  background: linear-gradient(135deg, #4158d0, #c850c0);
  padding: 0.35rem 0.75rem;
  border-radius: 40px;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 1;
  box-shadow: 0 4px 10px rgba(65, 88, 208, 0.2);
  flex-shrink: 0;
}

.match-symbol {
  font-size: 0.7rem;
  opacity: 0.9;
  margin-left: 1px;
}

/* Compatibility Stats */
.stats-minimal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  margin-bottom: 0.75rem;
  border-bottom: 1px dashed #e2e8f0;
}

.stat-minimal {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.stat-minimal-emoji {
  font-size: 1.2rem;
  opacity: 0.7;
}

.stat-minimal-text {
  display: flex;
  flex-direction: column;
}

.stat-minimal-value {
  font-weight: 500;
  font-size: 0.9rem;
  color: #1e293b;
  line-height: 1.2;
}

.stat-minimal-label {
  font-size: 0.6rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.stat-minimal-divider {
  width: 1px;
  height: 30px;
  background: linear-gradient(to bottom, transparent, #e2e8f0, transparent);
  margin: 0 0.5rem;
}

/* Section Headers */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.slot-count,
.course-count {
  font-size: 0.7rem;
  color: #4158d0;
  background: #f0f2ff;
  padding: 0.2rem 0.6rem;
  border-radius: 30px;
  font-weight: 500;
}

/* Schedule Slots */
.schedule-availability,
.shared-courses {
  flex-shrink: 0;
}

.schedule-slots,
.course-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-height: 36px;
}

.slot-chip {
  background: #f8fafc;
  padding: 0.4rem 0.75rem;
  border-radius: 30px;
  font-size: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid #eef2f6;
  transition: all 0.2s;
  cursor: help;
}

.slot-chip:hover {
  background: #f0f2ff;
  border-color: #4158d0;
}

.slot-day {
  font-weight: 600;
  color: #1e293b;
}

.slot-time {
  color: #64748b;
}

.slot-chip.more {
  background: transparent;
  border: 1px dashed #cbd5e1;
  color: #94a3b8;
  cursor: default;
}

.slot-chip.more:hover {
  background: transparent;
  border-color: #cbd5e1;
}

/* Course Chips */
.course-chip {
  background: #f8fafc;
  padding: 0.4rem 0.9rem;
  border-radius: 30px;
  font-size: 0.75rem;
  color: #475569;
  border: 1px solid #eef2f6;
  transition: all 0.2s;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.course-chip:hover {
  border-color: #c850c0;
  color: #c850c0;
  background: #fdf2f8;
}

.course-chip.more {
  background: transparent;
  border: 1px dashed #cbd5e1;
  color: #94a3b8;
  cursor: default;
}

.course-chip.more:hover {
  background: transparent;
  border-color: #cbd5e1;
  color: #94a3b8;
}

/* Empty State */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 30px;
  padding: 0.5rem 1rem;
  min-height: 36px;
}

.empty-text {
  font-size: 0.75rem;
  color: #94a3b8;
}

/* Actions */
.card-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.5rem;
  flex-shrink: 0;
}

.btn-profile {
  flex: 2;
  padding: 0.7rem;
  border: none;
  border-radius: 40px;
  font-weight: 500;
  font-size: 0.8rem;
  background: linear-gradient(135deg, #4158d0, #c850c0);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 6px 14px rgba(65, 88, 208, 0.2);
  transition: all 0.2s;
}

.btn-profile:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(65, 88, 208, 0.3);
}

.btn-icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: white;
  color: #64748b;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
  flex-shrink: 0;
}

.btn-icon:hover {
  transform: translateY(-2px);
}

.btn-icon.invite:hover {
  background: #4158d0;
  color: white;
  border-color: #4158d0;
}

.btn-icon.message:hover {
  background: #c850c0;
  color: white;
  border-color: #c850c0;
}

/* Responsive */
@media (max-width: 768px) {
  .gallery-card.list-view {
    flex-direction: column;
    min-height: auto;
  }

  .list-view .card-cover {
    width: 100%;
    height: 100px;
    border-radius: 24px 24px 0 0;
  }

  .list-view .card-avatar {
    width: 80px;
    height: 80px;
    font-size: 2rem;
    left: 50%;
    transform: translateX(-50%);
    top: auto;
    bottom: -40px;
    margin-top: 0;
  }

  .list-view .card-content {
    padding: 3rem 1.25rem 1.25rem;
  }

  .list-details-row {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .card-avatar {
    width: 80px;
    height: 80px;
    font-size: 2rem;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
  }

  .card-content {
    padding: 2.8rem 1.25rem 1.25rem;
  }

  .card-name {
    font-size: 1.1rem;
  }

  .stat-minimal-emoji {
    font-size: 1rem;
  }

  .stat-minimal-value {
    font-size: 0.85rem;
  }

  .btn-icon {
    width: 38px;
    height: 38px;
    font-size: 1rem;
  }

  .list-view .card-avatar {
    width: 70px;
    height: 70px;
    font-size: 1.8rem;
    bottom: -35px;
  }
}
</style>
