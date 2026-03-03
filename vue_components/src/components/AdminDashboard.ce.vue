<template>
  <div class="container" ref="rootContainer">
    <aside class="sidebar">
      <div class="brand">
        <span class="emoji-icon">📚</span>
        STUDYSYNC
      </div>
      <nav>
        <a href="/admin-dashboard/" class="nav-item active">
          <span class="nav-emoji">📊</span> Analytics
        </a>
        <a href="/students/" class="nav-item">
          <span class="nav-emoji">👨‍🎓</span> Students
        </a>
      </nav>
    </aside>

    <main class="viewport">
      <header class="header">
        <h1>Command Center</h1>
        <div class="status-badge" v-if="!isLoading">
          <div class="dot-live"></div>
          OPERATIONAL
        </div>
      </header>

      <section class="stats">
        <div class="card">
          <span class="label">Total Groups</span>
          <span class="value">{{ stats.groups || 0 }}</span>
        </div>
        <div class="card">
          <span class="label">Pending</span>
          <span class="value" style="color: var(--primary)">{{
            stats.pending || 0
          }}</span>
        </div>
        <div class="card">
          <span class="label">Total Students</span>
          <span class="value">{{ stats.students || 0 }}</span>
        </div>
      </section>

      <div class="workspace">
        <inbound-request
          :groups="pendingGroups"
          @action_taken="fetchData"
          @show_details="openDetails"
        ></inbound-request>

        <section class="surface pulse-container">
          <div class="surface-header">
            <div class="surface-title">
              Notifications
              <div class="live-indicator">
                <span class="dot"></span>
              </div>
            </div>
          </div>

          <div class="feed-timeline">
            <div
              v-for="activity in activities"
              :key="activity.id"
              class="feed-item"
              @click="scrollToTarget(activity)"
            >
              <div
                :class="[
                  'feed-icon-wrapper',
                  `bg-${activity.type || 'default'}`,
                ]"
              >
                <span v-if="activity.type === 'register'">👋</span>
                <span v-else-if="activity.type === 'create'">👤</span>
                <span v-else-if="activity.type === 'approve'"> 👍</span>
                <span v-else-if="activity.type === 'deny'">🚫</span>
                <span v-else>🔔</span>
              </div>

              <div class="feed-body">
                <div class="feed-text">
                  <template v-if="activity.type === 'register'">
                    <span class="highlight">{{ activity.sender }}</span> joined
                    our community
                  </template>
                  <template v-else-if="activity.type === 'create'">
                    <span class="highlight">{{ activity.sender }}</span> wants
                    to start
                    <span class="highlight">{{ activity.group.name }}</span>
                  </template>
                  <template v-else-if="activity.type === 'approve'">
                    <span class="highlight">{{ activity.sender }}</span>
                    approved the group
                    <span class="highlight">{{ activity.group.name }}</span>
                  </template>
                  <template v-else-if="activity.type === 'deny'">
                    <span class="highlight">{{ activity.sender }}</span>
                    denied the group
                    <span class="highlight">{{ activity.group.name }}</span>
                  </template>
                  <template v-else>
                    {{ activity.message || "Update" }}
                  </template>
                </div>
                <span class="feed-time">{{ activity.time_ago }}</span>
              </div>
            </div>

            <div v-if="!activities?.length && !isLoading" class="empty-state">
              <p>📭 No recent pulses.</p>
            </div>
          </div>
        </section>

        <div
          v-if="showModal && selectedGroup"
          class="modal-overlay"
          @click.self="showModal = false"
        >
          <div class="modal-card">
            <!-- Compact header -->
            <div class="modal-header">
              <div class="header-top">
                <div class="badge-group">
                  <span class="badge major">
                    {{ selectedGroup.major || "Undeclared" }}
                  </span>
                  <span class="badge" :class="selectedGroup.group_type">
                    {{
                      selectedGroup.group_type === "general"
                        ? "General"
                        : "Project"
                    }}
                  </span>
                  <span
                    class="badge status"
                    :class="selectedGroup.status.toLowerCase()"
                  >
                    {{ selectedGroup.status }}
                  </span>
                </div>
                <button class="close-btn" @click="showModal = false">✕</button>
              </div>
            </div>

            <!-- Compact body -->
            <div class="modal-body">
              <!-- Title and course row -->
              <div class="title-row">
                <h3 class="group-title">{{ selectedGroup.name }}</h3>
                <span
                  class="course-tag"
                  :class="{ 'is-null': !selectedGroup.course }"
                >
                  <span class="tag-emoji">📖</span>
                  <span>{{ selectedGroup.course_name || "No course" }}</span>
                </span>
              </div>

              <!-- Description - compact -->
              <div class="description-box" v-if="selectedGroup.description">
                <p class="description-text">
                  “{{ selectedGroup.description }}”
                </p>
              </div>

              <!-- Info grid - 2 columns -->
              <div class="info-grid">
                <!-- Schedule -->
                <div class="info-item">
                  <span class="item-emoji">📅</span>
                  <div class="item-content">
                    <span class="item-label">Day</span>
                    <span class="item-value">{{
                      selectedGroup.study_day || "TBD"
                    }}</span>
                  </div>
                </div>

                <!-- Time -->
                <div class="info-item">
                  <span class="item-emoji">⏰</span>
                  <div class="item-content">
                    <span class="item-label">Time</span>
                    <span class="item-value">{{
                      formatTimeSlot(
                        selectedGroup.start_time,
                        selectedGroup.end_time,
                      )
                    }}</span>
                  </div>
                </div>

                <!-- Interest -->
                <div class="info-item">
                  <span class="item-emoji">🎯</span>
                  <div class="item-content">
                    <span class="item-label">Interest</span>
                    <span
                      class="item-value"
                      :class="{ 'is-null': !selectedGroup.interest }"
                    >
                      {{ selectedGroup.interest || "None" }}
                    </span>
                  </div>
                </div>

                <!-- Semester -->
                <div class="info-item">
                  <span class="item-emoji">📚</span>
                  <div class="item-content">
                    <span class="item-label">Semester</span>
                    <span
                      class="item-value"
                      :class="{ 'is-null': !selectedGroup.semester }"
                    >
                      {{ selectedGroup.semester || "—" }}
                    </span>
                  </div>
                </div>

                <!-- Members -->
                <div class="info-item">
                  <span class="item-emoji">👥</span>
                  <div class="item-content">
                    <span class="item-label">Members</span>
                    <span class="item-value"
                      >{{ selectedGroup.max_members }} max</span
                    >
                  </div>
                </div>

                <!-- Creator -->
                <div class="info-item">
                  <span class="item-emoji">👤</span>
                  <div class="item-content">
                    <span class="item-label">Creator</span>
                    <span class="item-value"
                      >ID: {{ selectedGroup.creator }}</span
                    >
                  </div>
                </div>
              </div>

              <!-- Meta chips - compact row -->
              <div class="meta-row">
                <span
                  class="meta-chip"
                  :class="{ admin: selectedGroup.project_admin_managed }"
                >
                  <span class="chip-dot"></span>
                  {{
                    selectedGroup.project_admin_managed
                      ? "Admin managed"
                      : "User managed"
                  }}
                </span>
                <span
                  class="meta-chip"
                  :class="{ auto: selectedGroup.auto_created }"
                >
                  <span class="chip-dot"></span>
                  {{ selectedGroup.auto_created ? "Auto" : "Manual" }}
                </span>
                <span
                  class="meta-chip"
                  :class="{
                    active: selectedGroup.is_active,
                    inactive: !selectedGroup.is_active,
                  }"
                >
                  <span class="chip-dot"></span>
                  {{ selectedGroup.is_active ? "Active" : "Inactive" }}
                </span>
              </div>
            </div>

            <!-- Compact footer -->
            <div class="modal-footer">
              <button
                @click="handleAction(selectedGroup.id, 'deny')"
                class="btn btn-outline"
              >
                ✕ Decline
              </button>
              <button
                @click="handleAction(selectedGroup.id, 'approve')"
                class="btn btn-primary"
              >
                ✓ Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const selectedGroup = ref(null);
const showModal = ref(false);
const pendingGroups = ref([]);
const stats = ref({});
const activities = ref([]);
const isLoading = ref(true);
const rootContainer = ref(null);

const fetchData = async () => {
  try {
    const response = await axios.get("/api/admin/dashboard-data");
    pendingGroups.value = response.data.pendingGroups || [];
    stats.value = response.data.stats || {};
    activities.value = response.data.activities || [];
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    isLoading.value = false;
  }
};

const scrollToTarget = (activity) => {
  if (activity.type === "create" && activity.group.id) {
    const targetId = `group-${activity.group.id}`;
    const inboundComp = rootContainer.value.querySelector("inbound-request");

    if (inboundComp && inboundComp.shadowRoot) {
      const element = inboundComp.shadowRoot.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        console.log("here inside element");

        element.style.outline = "2px solid var(--primary)";
        element.style.borderRadius = "20px";
        setTimeout(() => {
          element.style.outline = "transparent";
        }, 2000);
      }
    }
  } else {
    console.error("Element not found in shadow root:", targetId);
  }
};

const openDetails = async (event) => {
  const groupId = event.detail ? event.detail[0] : event;
  if (!groupId || typeof groupId === "object") {
    console.error("Invalid ID received:", groupId);
    return;
  }
  try {
    const response = await axios.get(`/api/group/${groupId}`);
    selectedGroup.value = response.data;
    showModal.value = true;
  } catch (error) {
    console.error("Could not load group details");
  }
};

const formatTimeSlot = (start, end) => {
  const extractHHMM = (timeStr) => {
    if (!timeStr) return null;

    const timeMatch = timeStr.match(/(\d{2}:\d{2}):\d{2}/);
    return timeMatch ? timeMatch[1] : timeStr;
  };

  const startTime = extractHHMM(start);
  const endTime = extractHHMM(end);

  if (!startTime && !endTime) return "Time TBD";
  if (!startTime) return `Starts at ${endTime || "TBD"}`;
  if (!endTime) return `${startTime} - End TBD`;
  return `${startTime} — ${endTime}`;
};

const handleAction = (group_id, action) => {
  if (action === "approve") {
    approve(group_id);
  } else {
    deny(group_id);
  }
};
const approve = async (id) => {
  try {
    await axios.post(`/api/group/${id}/approve`);
    showModal.value = false;
    fetchData();
  } catch (err) {
    console.error(err);
  }
};
const deny = async (id) => {
  try {
    await axios.post(`/api/group/${id}/deny`);
    showModal.value = false;
    fetchData();
  } catch (err) {
    console.error(err);
  }
};
onMounted(fetchData);
</script>

<style>
:host {
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  --primary: #4f46e5;
  --bg-canvas: #f1f5f9;
  --sidebar: #0f172a;
  --panel: #ffffff;
  --text-main: #1e293b;
  --text-muted: #64748b;
  --accent-success: #10b981;
  --border: rgba(226, 232, 240, 0.6);

  background-color: var(--bg-canvas);
  font-family:
    system-ui,
    -apple-system,
    sans-serif;

  overflow: visible;
}

.container {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
  padding: 40px 20px;
}

/* --- Sidebar --- */
.sidebar {
  background: var(--sidebar);
  border-radius: 20px;
  padding: 24px 16px;
  color: white;
  height: fit-content;
  position: sticky;
  top: 40px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  margin-bottom: 40px;
  padding-left: 10px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 12px;
  font-size: 0.85rem;
  margin-bottom: 4px;
}

.nav-item.active {
  color: white;
  background: var(--primary);
}

.nav-emoji {
  font-size: 1.1rem;
}

/* --- Main Content --- */
.viewport {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.header h1 {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
}

.status-badge {
  background: white;
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--border);
}

.dot {
  width: 6px;
  height: 6px;
  background: var(--accent-success);
  border-radius: 50%;
  animation: pulse-op 2s infinite;
}

/* --- Stats Cards --- */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.card {
  background: white;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid var(--border);
}
.card .label {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
}
.card .value {
  font-size: 2rem;
  font-weight: 800;
  display: block;
  margin-top: 8px;
}

/* --- Grid Layout --- */
.workspace {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 24px;
}
.surface {
  background: white;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid var(--border);
}

/* --- Pulse Feed --- */
.surface-title {
  display: flex;
  justify-content: space-between;
  font-weight: 800;
  margin-bottom: 20px;
}

.feed-item {
  position: relative;
  display: flex;
  gap: 12px;
  padding-bottom: 20px;
  cursor: pointer;
}

.feed-item:not(:last-child)::before {
  content: "";
  position: absolute;
  left: 16px;
  top: 32px;
  bottom: 0;
  width: 1px;
  background: #e2e8f0;
}

.feed-icon-wrapper {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  z-index: 2;
  background: #f8fafc;
}

.bg-register {
  background: #f5f3ff;
}
.bg-create {
  background: #fffbeb;
}

.feed-text {
  font-size: 0.8rem;
  color: var(--text-main);
}
.highlight {
  font-weight: 700;
}
.feed-time {
  font-size: 0.7rem;
  color: var(--text-muted);
  display: block;
  margin-top: 2px;
}

/* --- Animations --- */
@keyframes pulse-op {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}

.empty-state {
  text-align: center;
  padding: 40px 0;
  color: var(--text-muted);
  font-size: 0.85rem;
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.2s ease;
}

/* Modal card - compact */
.modal-card {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 35px -8px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.25s ease;
  overflow: hidden;
}

/* Compact header */
.modal-header {
  padding: 1rem 1.25rem;
  background: #fafbfc;
  border-bottom: 1px solid #edf2f7;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  background: white;
  border: 1px solid #e2e8f0;
  color: #4a5568;
}

.badge.major {
  background: #e9d8fd;
  border-color: #d6bcfa;
  color: #553c9a;
}

.badge.general {
  background: #c6f6d5;
  border-color: #9ae6b4;
  color: #22543d;
}

.badge.project {
  background: #feebc8;
  border-color: #fbd38d;
  color: #7b341e;
}

.badge.status.rejected {
  background: #fed7d7;
  border-color: #fc8181;
  color: #9b2c2c;
}

.close-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: #edf2f7;
  color: #4a5568;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #e2e8f0;
  transform: rotate(90deg);
}

/* Compact body */
.modal-body {
  padding: 1.25rem;
}

/* Title row */
.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.group-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
  line-height: 1.3;
}

.course-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem 0.75rem;
  background: #ebf4ff;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #2c5282;
  border: 1px solid #bee3f8;
  white-space: nowrap;
}

.course-tag.is-null {
  background: #f7fafc;
  color: #718096;
  border-color: #e2e8f0;
}

.tag-emoji {
  font-size: 0.8rem;
}

/* Description box */
.description-box {
  background: #faf9ff;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border-left: 3px solid #9f7aea;
}

.description-text {
  margin: 0;
  font-size: 0.85rem;
  color: #2d3748;
  line-height: 1.5;
}

/* Info grid - 2 columns */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #edf2f7;
}

.item-emoji {
  font-size: 1rem;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.item-label {
  font-size: 0.6rem;
  font-weight: 700;
  color: #a0aec0;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.item-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: #1a202c;
  line-height: 1.3;
}

.item-value.is-null {
  color: #a0aec0;
  font-style: italic;
}

/* Meta row - compact chips */
.meta-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding-top: 0.5rem;
  border-top: 1px dashed #e2e8f0;
}

.meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.6rem;
  background: #f7fafc;
  border-radius: 30px;
  font-size: 0.65rem;
  font-weight: 600;
  color: #4a5568;
  border: 1px solid #e2e8f0;
}

.chip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #a0aec0;
}

.meta-chip.admin .chip-dot {
  background: #805ad5;
}

.meta-chip.admin {
  background: #faf5ff;
  border-color: #d6bcfa;
  color: #553c9a;
}

.meta-chip.auto .chip-dot {
  background: #3182ce;
}

.meta-chip.auto {
  background: #ebf8ff;
  border-color: #bee3f8;
  color: #2c5282;
}

.meta-chip.active .chip-dot {
  background: #38a169;
}

.meta-chip.active {
  background: #f0fff4;
  border-color: #c6f6d5;
  color: #22543d;
}

.meta-chip.inactive .chip-dot {
  background: #e53e3e;
}

.meta-chip.inactive {
  background: #fff5f5;
  border-color: #fed7d7;
  color: #9b2c2c;
}

/* Compact footer */
.modal-footer {
  padding: 1rem 1.25rem 1.25rem;
  display: flex;
  gap: 0.75rem;
  border-top: 1px solid #edf2f7;
}

.btn {
  flex: 1;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.btn-outline {
  background: white;
  border: 1.5px solid #e2e8f0;
  color: #4a5568;
}

.btn-outline:hover {
  border-color: #f56565;
  color: #c53030;
  background: #fff5f5;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.25);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 15px rgba(102, 126, 234, 0.3);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile adjustments */
@media (max-width: 480px) {
  .modal-card {
    max-width: 100%;
    margin: 0.5rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .badge-group {
    gap: 0.3rem;
  }

  .badge {
    padding: 0.2rem 0.5rem;
    font-size: 0.65rem;
  }

  .meta-row {
    gap: 0.3rem;
  }

  .meta-chip {
    padding: 0.2rem 0.5rem;
    font-size: 0.6rem;
  }
}
</style>
