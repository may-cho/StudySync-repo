<template>
  <div class="grid-card">
    <!-- Avatar + Name Row -->
    <div class="grid-row">
      <div class="grid-avatar" :style="avatarStyle">{{ avatarInitials }}</div>
      <div class="grid-info">
        <div class="grid-name">{{ parsedProfile.username }}</div>
        <div class="grid-meta">
          {{ parsedProfile.major }} • Y{{ parsedProfile.year }}
        </div>
      </div>
      <div class="grid-match">{{ matchPercent }}%</div>
    </div>

    <!-- Stats Row -->
    <div class="grid-stats">
      <div class="grid-stat">
        <span>📚</span>
        <span>{{ parsedCourses.length }}</span>
      </div>
      <div class="grid-stat">
        <span>⏰</span>
        <span>{{ overlapHours }}h</span>
      </div>
      <div class="grid-stat">
        <span>{{ timeEmoji }}</span>
      </div>
    </div>

    <!-- Schedule Chips -->
    <div v-if="hasSchedule" class="grid-chips">
      <span
        v-for="slot in visibleTimeSlots.slice(0, 2)"
        :key="slot.dayShort"
        class="grid-chip"
      >
        {{ slot.dayShort }} {{ slot.timeRange }}
      </span>
      <span v-if="timeSlots.length > 2" class="grid-chip more">
        +{{ timeSlots.length - 2 }}
      </span>
    </div>
    <div v-else class="grid-empty-chip">No schedule</div>

    <!-- Course Chips -->
    <div v-if="parsedCourses.length" class="grid-chips">
      <span
        v-for="course in parsedCourses.slice(0, 2)"
        :key="course"
        class="grid-chip course"
      >
        {{ course }}
      </span>
      <span v-if="parsedCourses.length > 2" class="grid-chip more">
        +{{ parsedCourses.length - 2 }}
      </span>
    </div>
    <div v-else class="grid-empty-chip">No courses match</div>

    <!-- Actions - Only View Profile Button -->
    <div class="grid-actions">
      <button class="grid-btn primary" @click="viewProfile">
        View Profile
      </button>
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

const avatarInitials = computed(() => {
  const name = parsedProfile.value.username || "??";
  return name.charAt(0).toUpperCase();
});

const avatarStyle = computed(() => {
  const colors = ["#4158D0", "#C850C0", "#0093E9", "#80D0C7"];
  const index = (parsedProfile.value.username?.length || 0) % colors.length;
  return { backgroundColor: colors[index] };
});

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
      : "Flex",
  }));
});

const timeEmoji = computed(() => {
  if (timeSlots.value.length === 0) return "🔄";
  const slot = timeSlots.value[0];
  if (!slot.start_time) return "🔄";
  const hour = parseInt(slot.start_time.split(":")[0]);
  if (hour < 12) return "🌅";
  if (hour < 17) return "☀️";
  return "🌙";
});

const viewProfile = () => {
  window.location.href = `/profile/${parsedProfile.value.id}/`;
};
</script>

<style scoped>
.grid-card {
  background: white;
  border-radius: 24px;
  padding: 1.25rem;
  border: 1px solid #f0f2f5;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.2s;

  /* Fixed dimensions */
  height: 280px;
  width: 100px;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.grid-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
}

.grid-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0; /* Prevent shrinking */
}

.grid-avatar {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.3rem;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.grid-info {
  flex: 1;
  min-width: 0;
}

.grid-name {
  font-weight: 600;
  font-size: 1rem;
  color: #1a2634;
  margin-bottom: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.grid-meta {
  font-size: 0.7rem;
  color: #8a99aa;
}

.grid-match {
  background: #f8fafc;
  padding: 0.25rem 0.75rem;
  border-radius: 40px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #1a2634;
  border: 1px solid #edf2f7;
  white-space: nowrap;
  flex-shrink: 0;
}

.grid-stats {
  display: flex;
  gap: 1.5rem;
  padding: 0.75rem 0;
  border-top: 1px solid #edf2f7;
  border-bottom: 1px solid #edf2f7;
  flex-shrink: 0; /* Prevent shrinking */
}

.grid-stat {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: #4a5a6e;
}

.grid-stat span:first-child {
  opacity: 0.8;
}

.grid-stat span:last-child {
  font-weight: 500;
}

.grid-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  min-height: 32px; /* Consistent height even when empty */
  flex-shrink: 0; /* Prevent shrinking */
}

.grid-chip {
  background: #f8fafc;
  padding: 0.3rem 0.8rem;
  border-radius: 40px;
  font-size: 0.7rem;
  color: #4a5a6e;
  border: 1px solid #edf2f7;
  white-space: nowrap;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  height: 28px;
}

.grid-chip.course {
  background: #ffffff;
  border-color: #e0e5eb;
}

.grid-chip.more {
  background: transparent;
  border: 1px dashed #cbd5e1;
  color: #94a3b8;
}

.grid-chip:hover {
  background: #ffffff;
  border-color: #cbd5e1;
}

.grid-empty-chip {
  background: #f8fafc;
  padding: 0.3rem 0.8rem;
  border-radius: 40px;
  font-size: 0.7rem;
  color: #94a3b8;
  border: 1px dashed #e0e5eb;
  display: inline-flex;
  align-items: center;
  height: 28px;
  width: fit-content;
}

.grid-empty {
  font-size: 0.75rem;
  color: #a0aec0;
  padding: 0.5rem 0;
  font-style: italic;
  height: 28px;
  display: flex;
  align-items: center;
}

.grid-actions {
  margin-top: auto; /* Pushes button to bottom */
  flex-shrink: 0;
}

.grid-btn {
  width: 100%;
  height: 40px;
  border-radius: 40px;
  border: none;
  background: #1a2634;
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 10px rgba(26, 38, 52, 0.1);
}

.grid-btn:hover {
  background: #2d3a4a;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(26, 38, 52, 0.15);
}

.grid-btn:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 640px) {
  .grid-card {
    padding: 1rem;
    height: 320px; /* Slightly smaller on mobile */
  }

  .grid-avatar {
    width: 42px;
    height: 42px;
    font-size: 1.1rem;
  }

  .grid-name {
    font-size: 0.9rem;
  }

  .grid-meta {
    font-size: 0.65rem;
  }

  .grid-match {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }

  .grid-stat {
    font-size: 0.7rem;
    gap: 0.3rem;
  }

  .grid-chip,
  .grid-empty-chip {
    font-size: 0.65rem;
    padding: 0.2rem 0.7rem;
    height: 26px;
  }

  .grid-btn {
    height: 36px;
    font-size: 0.8rem;
  }
}
</style>
