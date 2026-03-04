<template>
  <div class="grid-card">
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

    <div v-if="parsedInterests.length" class="grid-chips">
      <span
        v-for="interest in parsedInterests.slice(0, 2)"
        :key="interest.id"
        class="grid-chip interest"
      >
        {{ interest.name }}
      </span>
      <span v-if="parsedInterests.length > 2" class="grid-chip more">
        +{{ parsedInterests.length - 2 }}
      </span>
    </div>
    <div v-else class="grid-empty-chip">No common interests</div>

    <div class="grid-actions">
      <button class="grid-btn primary" @click="viewProfile">
        View Profile
      </button>
      <button class="connect-btn" @click.stop="openConnectForm">
        Connect with {{ parsedProfile.username }}
      </button>
      <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
  <div class="modal-content">
    <h3>Setup Study Group</h3>

    <div class="form-group">
      <label>Group Name</label>
      <input v-model="formData.group_name" placeholder="Name your group..." class="modal-input" />
    </div>

    <div class="form-group">
      <label>Group Category</label>
      <select v-model="formData.group_type" class="modal-input" required>
        <option value="" disabled>-- Choose a category --</option>
        <option value="course">Course-Based (Focus on a subject)</option>
        <option value="major">Major-Based (Connect with your department)</option>
        <option value="general">General Study (Casual study session)</option>
      </select>
    </div>

    <div v-if="formData.group_type === 'course'" class="form-group animate-fade-in">
      <label>Which course are you studying?</label>
      <select v-model="formData.course" class="modal-input">
        <option value="" disabled>Select a course</option>
        <option v-for="course in parsedCourses" :key="course" :value="course">
          {{ course }}
        </option>

      </select>
    </div>
    <div v-if="formData.group_type === 'major'" class="form-group animate-fade-in">
      <label>Target Major</label>
      <select v-model="formData.major" class="modal-input">
        <option value="" disabled>Confirm major</option>
        <option :value="parsedProfile.major">{{ parsedProfile.major }}</option>
      </select>
    </div>

    <div v-if="formData.group_type === 'general'" class="form-group animate-fade-in">
      <label>Select Primary Interest</label>
      <select v-model="formData.interest" class="modal-input">
        <option value="" disabled>What is the focus?</option>
        <option v-for="item in parsedInterests" :key="item.id" :value="item.id">
          {{ item.name || item.interest_name }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea v-model="formData.group_description" placeholder="Describe the goal..." class="modal-input"></textarea>
    </div>

    <div class="modal-btns">
      <button @click="showModal = false" class="cancel-btn">Cancel</button>
      <button class="grid-btn primary" @click="submitConnection">Create & Invite</button>
    </div>
  </div>
</div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";

const props = defineProps({
  profile: [Object, String],
  matchPercent: [Number, String],
  overlapHours: [Number, String],
  overlapCourses: [Array, String],
  allInterests: [Array, String],
  timeSlots: {
    type: [Array, String],
    default: () => [],
  },
  viewMode: {
    type: String,
    default: "grid",
  },
});

// --- Computed Properties ---
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

const parsedInterests = computed(() => {
  // 1. If it's already an array, return it
  if (Array.isArray(props.allInterests)) return props.allInterests;

  // 2. If it's a string, try to parse it
  if (typeof props.allInterests === 'string' && props.allInterests.trim() !== "") {
    try {
      return JSON.parse(props.allInterests);
    } catch (e) {
      console.error("JSON Parse Error for interests:", e);
      return [];
    }
  }
  return [];
});

const internalTimeSlots = computed(() => {
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

const hasSchedule = computed(() => internalTimeSlots.value.length > 0);

const formatTime = (time) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours);
  const ampm = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 || 12;
  return `${hour12}${minutes !== "00" ? `:${minutes}` : ""}${ampm}`;
};

const visibleTimeSlots = computed(() => {
  return internalTimeSlots.value.slice(0, 3).map((slot) => ({
    dayShort: slot.day?.substring(0, 3) || "Any",
    timeRange: slot.start_time
      ? `${formatTime(slot.start_time)}-${formatTime(slot.end_time)}`
      : "Flex",
  }));
});

const timeEmoji = computed(() => {
  if (internalTimeSlots.value.length === 0) return "🔄";
  const slot = internalTimeSlots.value[0];
  if (!slot.start_time) return "🔄";
  const hour = parseInt(slot.start_time.split(":")[0]);
  if (hour < 12) return "🌅";
  if (hour < 17) return "☀️";
  return "🌙";
});

// --- Actions ---
const viewProfile = () => {
  window.location.href = `/profile/${parsedProfile.value.id}/`;
};

// --- Modal & Connection Logic ---
const showModal = ref(false);

// SINGLE DEFINITION OF FORMDATA
const formData = ref({
  group_name: '',
  group_description: '',
  group_type: '',
  major: '',
  interest: '',
  course: '',
  message: ''
});

const openConnectForm = () => {
  // Reset form when opening
  formData.value = {
    group_name: '',
    group_description: '',
    group_type: '',
    course: parsedCourses.value.length > 0 ? parsedCourses.value[0] : '',
    major: '',
    interest: '',
    message: ''
  };
  showModal.value = true;
};

const submitConnection = async () => {
  if (!formData.value.group_type) {
    alert("Please select a Group Type (Course, Major, or General).");
    return;
  }
  if (!formData.value.group_name || !formData.value.group_description) {
    alert("Please provide a name and description for the group.");
    return;
  }

  const data = new FormData();
  data.append('group_name', formData.value.group_name);
  data.append('group_description', formData.value.group_description);
  data.append('group_type', formData.value.group_type);
  data.append('course_name', formData.value.course);
  data.append('invite_message', formData.value.message || `Hi! I'd like to study together.`);

  if (formData.value.group_type === 'course') data.append('course_name', formData.value.course);
  if (formData.value.group_type === 'major') data.append('major_name', formData.value.major);
  if (formData.value.group_type === 'general') data.append('interest', formData.value.interest); // Sending the ID

  try {
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];

    await axios.post(`/student/${parsedProfile.value.id}/create-group/`, data, {
      headers: {
        'X-CSRFToken': csrfToken,
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    alert("Invite sent! Awaiting Admin approval.");
    showModal.value = false;
  } catch (err) {
    console.error(err);
    alert("Connection failed. Please check your inputs.");
  }
};
</script>
<style scoped>
.grid-card {
  background: white;
  border-radius: 24px;
  padding: 1.5rem;
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: all 0.3s ease;

  /* FIXED: Height auto allows content to fit, min-height ensures consistency */
  width: 100%;
  min-height: 420px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.grid-card:hover {
  border-color: #3b82f6;
  transform: translateY(-4px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
}

.grid-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.grid-avatar {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.4rem;
  color: white;
  flex-shrink: 0;
}

.grid-info {
  flex: 1;
  min-width: 0;
}

.grid-name {
  font-weight: 700;
  font-size: 1.1rem;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.grid-meta {
  font-size: 0.75rem;
  color: #64748b;
}

.grid-match {
  background: #f0f9ff;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #0369a1;
  border: 1px solid #e0f2fe;
}

.grid-stats {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
}

.grid-stat {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: #475569;
}

.grid-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  min-height: 32px;
}

.grid-chip {
  background: #f8fafc;
  padding: 0.3rem 0.7rem;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 500;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.grid-chip.course {
  background: #eff6ff;
  color: #2563eb;
  border-color: #dbeafe;
}

.grid-empty-chip {
  font-size: 0.7rem;
  color: #94a3b8;
  padding: 0.3rem;
  font-style: italic;
}

.grid-actions {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.grid-btn {
  width: 100%;
  height: 42px;
  border-radius: 12px;
  border: none;
  background: #0f172a;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.grid-btn:hover {
  background: #1e293b;
}

.connect-btn {
  width: 100%;
  height: 42px;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  background: white;
  color: #0f172a;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.connect-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  background: #f0f9ff;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: white; padding: 2rem; border-radius: 20px;
  width: 90%; max-width: 400px; display: flex; flex-direction: column; gap: 1rem;
}
.modal-content select, .modal-content textarea {
  padding: 0.5rem; border: 1px solid #ddd; border-radius: 8px;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (max-width: 640px) {
  .grid-card {
    min-height: 400px;
  }
}
</style>