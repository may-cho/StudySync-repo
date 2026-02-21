<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <div class="spacer"></div>
      <div class="days-row">
        <div v-for="day in days" :key="day" class="day-label">
          {{ day }}
        </div>
      </div>
    </div>

    <div class="calendar-wrapper">
      <div class="time-gutter">
        <div v-for="hour in 25" :key="hour" class="time-label-container">
          <span class="time-label">{{ formatHour(hour - 1) }}</span>
        </div>
      </div>

      <div
        class="calendar-grid"
        id="calendar-grid"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        ref="gridRef"
      >
        <!--Horizontal Grid Lines-->
        <div class="grid-lines-horizontal">
          <div v-for="i in 25" :key="i" class="hour-line"></div>
        </div>

        <!--Vertical Grid Lines-->
        <div class="grid-lines-vertical">
          <div v-for="j in 7" :key="j" class="day-column flex-fill"></div>
        </div>

        <!--Ghost Slot-->
        <div
          :style="getSlotStyles(ghostSlot)"
          id="ghost-slot"
          class="ghost-slot"
          v-if="ghostSlot.visible"
        >
          <p class="time-block-label">New session</p>
          <p class="time-block-time">
            {{ ghostSlot.start_time }} - {{ ghostSlot.end_time }}
          </p>
        </div>

        <!--Showing Existing Timeslots-->
        <div
          v-for="slot in timetableSlots"
          :key="slot.id"
          class="time-block"
          :style="getSlotStyles(slot)"
          @click="editSlot(slot)"
        >
          <p class="time-block-label fw-bold">
            {{
              slot.slot_type === "class" ? slot.course_code : slot.custom_name
            }}
          </p>
          <p class="time-block-time small">
            {{ slot.start_time }} - {{ slot.end_time }}
          </p>
        </div>

        <!--Floating Menu-->
        <div v-if="showMenu" id="floating-menu" class="floating-popover">
          <div class="mb-3">
            <label class="small text-muted d-block mb-2">Slot Category</label>
            <select
              v-model="activeSlot.slot_type"
              class="form-select custom-select"
            >
              <option value="class">🏛️ Class</option>
              <option value="self_study">📖 Self Study</option>
              <option value="break">☕ Break</option>
              <option value="activity">🏀 Activity</option>
              <option value="free">☁️ Free Time</option>
            </select>
          </div>

          <div v-if="activeSlot.slot_type === 'class'" class="mb-3">
            <label class="small text-muted d-block mb-2">Select Course</label>
            <select
              v-model="activeSlot.course_code"
              class="form-select custom-select"
            >
              <option v-for="c in courses" :key="c.code" :value="c.code">
                {{ c.code }}
              </option>
            </select>
          </div>

          <div v-else class="mb-3">
            <label class="small text-muted d-block mb-2">Event Name</label>
            <input
              v-model="activeSlot.custom_name"
              type="text"
              class="form-control"
              placeholder="Activity name..."
            />
          </div>

          <div class="row g-2 mb-4">
            <div class="col-6">
              <label class="small text-muted">Start</label>
              <input
                v-model="activeSlot.start_time"
                type="time"
                class="form-control form-control-sm"
              />
            </div>
            <div class="col-6">
              <label class="small text-muted">End</label>
              <input
                v-model="activeSlot.end_time"
                type="time"
                class="form-control form-control-sm"
              />
            </div>
          </div>

          <div class="popover-footer d-flex justify-content-between">
            <button
              class="btn-icon btn-delete text-danger"
              @click="confirmDelete"
              v-if="activeSlot.id"
            >
              <i class="fas fa-trash"></i>
            </button>
            <div class="d-flex gap-2 ms-auto">
              <button class="btn btn-sm btn-light" @click="showMenu = false">
                Cancel
              </button>
              <button class="btn btn-sm btn-primary" @click="saveSlot">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";

const props = defineProps({
  initialSlots: { type: Array, default: () => [] },
  courses: { type: Array, default: () => [] },
});

const gridRef = ref(null);
// --- Constants ---
const MINUTES_PER_BLOCK = 15;
const TOTAL_BLOCK = 96;
const TOTAL_HEIGHT = 1200;
const TOTAL_MINUTES = 1440;
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const PIXELS_PER_BLOCK = TOTAL_HEIGHT / TOTAL_BLOCK;
const PIXELS_PER_HOUR = PIXELS_PER_BLOCK * 4;

// --- State ---
const timetableSlots = ref(props.initialSlots || []);
const showMenu = ref(false);

const isDragging = ref(false);
const dragMode = ref(null); //'MOVE','RESIZE','CREATE'
const activeSlot = ref({});
const ghostSlot = reactive({
  visible: false,
  day_index: 0,
  start_time: "09:00",
  end_time: "10:00",
  slot_type: "free",
});
const menuData = reactive({
  id: null,
  day_index: 0,
  start_time: "",
  end_time: "",
  slot_type: "self_study",
  course_code: "",
  custom_name: "",
});

let dragOffset = { x: 0, y: 0 };

const getCoords = (e) => {
  const rect = gridRef.value.getBoundingClientRect();

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
};

const snapToGrid = (y) => Math.floor(y / PIXELS_PER_BLOCK) * PIXELS_PER_BLOCK;

const snapOneBlock = (y) => Math.floor(y / PIXELS_PER_HOUR) * PIXELS_PER_HOUR;

const timeToPixels = (timeStr) => {
  const [hr, min] = timeStr.split(":").map(Number);
  return (hr * 60 + min) * (PIXELS_PER_HOUR / 60);
};

const pixelsToTime = (px) => {
  const totalMins = Math.round(px / (PIXELS_PER_HOUR / 60));
  const h = Math.floor(totalMins / 60)
    .toString()
    .padStart(2, "0");
  const m = (totalMins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
};
const onMouseDown = (e) => {
  if (showMenu.value) return;
  const { x, y } = getCoords(e);
  const dayWidth = gridRef.value.offsetWidth / 7;
  const dayIndex = Math.floor(x / dayWidth);

  dragMode.value = "CREATE";
  ghostSlot.visible = true;
  ghostSlot.day_index = Math.floor(x / (gridRef.value.offsetWidth / 7));
  ghostSlot.start_time = pixelsToTime(snapOneBlock(y));
  ghostSlot.end_time = pixelsToTime(snapOneBlock(y) + PIXELS_PER_HOUR);
  ghostSlot.day_index = dayIndex;
  window.addEventListener("mouseup", onMouseUp);
};

const onMouseMove = (e) => {};
const onMouseUp = (e) => {};
// --- Helper: Get Styles for Grid Positioning ---
const getSlotStyles = (slot) => {
  const [startH, startM] = slot.start_time.split(":").map(Number);
  const startMins = startH * 60 + startM;

  const [endH, endM] = slot.end_time.split(":").map(Number);
  let endMins = endH * 60 + endM;
  if (endH === 0 && endM === 0) {
    endMins = 1440;
  }

  let duration = endMins - startMins;

  if (duration < 0) {
    duration = 1440 - startMins;
  }

  const top = (startMins / TOTAL_MINUTES) * TOTAL_HEIGHT;
  const height = (duration / TOTAL_MINUTES) * TOTAL_HEIGHT;
  const left = slot.day_index * (100 / 7);
  const width = 100 / 7;

  return {
    top: `${top}px`,
    height: `${height}px`,
    left: `${left}%`,
    width: `${width}%`,
    position: "absolute",
    backgroundColor: getSlotColor(slot.slot_type) + "20",
  };
};

const getSlotColor = (type) => {
  const colors = {
    class: "#4361ee",
    self_study: "#4cc9f0",
    break: "#ff9f1c",
    activity: "#2ec4b6",
    free: "#e2e8f0",
  };
  return colors[type] || "#4361ee";
};

const formatHour = (hour) => {
  if (hour === 0 || hour === 24) return "12 am";
  if (hour < 12) return `${hour} am`;
  if (hour === 12) return `12 pm`;
  return `${hour - 12} pm`;
};

// --- Actions ---
const editSlot = (slot) => {
  Object.assign(activeSlot, slot);
  showMenu.value = true;
  // Position logic would go here based on event.target
};

const saveSlot = () => {
  // Logic to emit update to backend via API
  console.log("Saving Slot:", activeSlot);
  showMenu.value = false;
};

const confirmDelete = () => {
  if (confirm("Remove this session?")) {
    // API Call to delete
    timetableSlots.value = timetableSlots.value.filter(
      (s) => s.id !== activeSlot.id,
    );
    showMenu.value = false;
  }
};

const handleGridMouseDown = (e) => {
  // Logic for drag-to-create could be added here
};
</script>
<style scoped>
/* --- Calendar Layout --- */
.calendar-container {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  font-family: "Inter", sans-serif;
}

.calendar-header {
  display: flex;
  border-bottom: 1px solid #ccc;
  background: #f9fafb;
}

.spacer {
  width: 60px;
  flex-shrink: 0;
  border-right: 1px solid #ccc;
}

.days-row {
  display: flex;
  flex-grow: 1;
}

.day-label {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  font-weight: 700;
  border-right: 1px solid #ccc;
  color: #374151;
  font-size: 0.9rem;
}

.calendar-wrapper {
  display: flex;
  height: 1200px;
  position: relative;
}

/* --- Time Gutter --- */
.time-gutter {
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-right: 1px solid #ccc;
  background-color: #fcfcfc;
}

.time-label-container {
  height: 0;
  position: relative;
}

.time-label-container:first-child .time-label {
  display: none !important;
}

.time-label-container:last-child .time-label {
  display: none !important;
}

.hour-line:first-child,
.hour-line:last-child {
  border-top: none !important;
}
.time-label {
  position: absolute;
  right: 12px;
  transform: translateY(-50%);
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  white-space: nowrap;
}

/* --- Grid & Lines --- */
.calendar-grid {
  flex-grow: 1;
  position: relative;
  background-color: white;
  cursor: crosshair;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.floating-menu {
  user-select: text;
  -webkit-user-select: text;
}

.grid-lines-horizontal {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
}

.hour-line {
  border-top: 1px solid #f3f4f6;
  width: 100%;
  height: 0;
}

.grid-lines-vertical {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  pointer-events: none;
}

.day-column {
  flex: 1;
  border-right: 1px solid #f3f4f6;
}

/* --- Slots --- */
.ghost-slot {
  position: absolute;
  background-color: rgba(99, 102, 241, 0.1);
  border: 2px dashed #6366f1;
  border-radius: 6px;
  pointer-events: auto !important;
  z-index: 100;
  cursor: move;
}
.time-block::after,
.ghost-slot::after {
  content: "";
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  height: 40px;
  cursor: ns-resize;
}

.time-block {
  position: absolute;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  z-index: 20;
  padding: 6px 10px;
  cursor: pointer;
  overflow: hidden;

  transition:
    top 0.2s ease-out,
    left 0.2s ease-out,
    height 0.2s ease-out,
    width 0.2s ease-out,
    transform 0.1s,
    box-shadow 0.1s;
}

.time-block:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  z-index: 21;
}

.time-block.dragging {
  transition:
    transform 0.1s,
    box-shadow 0.1s !important;
  opacity: 0.8;
  z-index: 100;
  cursor: grabbing;
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.time-block-label {
  font-size: 15px;
  font-weight: 700;
  margin: 0;
  color: #1f2937;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.time-block-time {
  font-size: 14px;
  margin: 0;
  color: #4b5563;
  font-weight: 500;
}

/* --- Floating Popover --- */
.floating-popover {
  display: none;
  position: absolute;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  padding: 18px;
  width: 280px;
  z-index: 1000;
}

.floating-popover .form-control,
.custom-select {
  background: #f3f4f6 !important;
  border: 1px solid transparent !important;
  border-radius: 8px !important;
  font-size: 0.85rem !important;
  padding: 8px 12px !important;
  margin-bottom: 10px;
}

.floating-popover .form-control:focus,
.custom-select:focus {
  background: #fff !important;
  border-color: #6366f1 !important;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
  outline: none;
}

/* --- Buttons & Footer --- */
.popover-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f1f5f9;
  padding-top: 12px;
  margin-top: 10px;
}

.btn-icon {
  background: #fee2e2;
  color: #ef4444;
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-icon:hover {
  background: #fecaca;
}

.btn-text {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.btn-cancel {
  background: #f1f5f9;
  color: #64748b;
  margin-right: 4px;
}
.btn-save {
  background: #6366f1;
  color: white;
}

/* --- Mini Delete Modal --- */
.custom-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.mini-modal {
  background: white;
  padding: 1.25rem;
  border-radius: 12px;
  width: 280px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.2s ease-out;
  z-index: 999;
}

.mini-modal-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.mini-modal-header > p {
  margin-bottom: 0;
}
.warning-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: yellow;
}
.modal-actions {
  display: flex;
  gap: 8px;
}
.modal-actions button {
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
}
.btn-cancel-mini {
  background: #f3f4f6;
  color: #4b5563;
}
.btn-delete-mini {
  background: #fff1f2;
  color: #e11d48;
}

@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.shake {
  animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
