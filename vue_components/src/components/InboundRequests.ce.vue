<template>
  <section class="surface">
    <div class="surface-header">
      <div class="surface-title">
        Inbound Requests
        <span class="badge">{{ groups?.length || 0 }} NEW</span>
      </div>
    </div>

    <div class="request-list">
      <div
        v-for="group in groups"
        :key="group.id"
        class="request-card"
        :id="'group-' + group.id"
      >
        <div class="group-info">
          <div class="avatar">{{ group.name.charAt(0).toUpperCase() }}</div>
          <div class="text-content">
            <span class="group-name">{{ group.name }}</span>
            <span class="creator-tag">by @{{ group.creator }}</span>
          </div>
        </div>

        <div class="action-group">
          <button class="btn-action btn-view" @click="showDetails(group)">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>

          <button class="btn-action btn-approve" @click="approve(group.id)">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>

          <button class="btn-action btn-deny" @click="deny(group.id)">
            <svg
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
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
const props = defineProps({
  groups: Array,
});

const emit = defineEmits(["action_taken", "show_details"]);
const selectedGroup = ref(null);

const showDetails = (group) => {
  selectedGroup.value = group;
  emit("show_details", group.id);
};

const approve = async (id) => {
  try {
    await axios.post(`/api/group/${id}/approve`);
    emit("action_taken");
  } catch (err) {
    console.error(err);
  }
};
const deny = async (id) => {
  try {
    await axios.post(`/api/group/${id}/deny`);
    emit("action_taken");
  } catch (err) {
    console.error(err);
  }
};
</script>
<style scoped>
.btn-approve {
  flex: 1;
  background: #10b981bc;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}
.btn-deny {
  flex: 1;
  background: #fee2e2;
  color: #ef4444;
  border: none;
  padding: 5px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}

.surface {
  background: var(--panel);
  border-radius: 24px;
  padding: 24px;
  border: 1px solid var(--border);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
}

.badge {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--primary);
  background: #eef2ff;
  padding: 4px 10px;
  border-radius: 8px;
}

.request-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}

.request-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.request-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.04);
}

.group-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.avatar {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, var(--primary), #818cf8);
  border-radius: 12px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.1rem;
}

.text-content {
  display: flex;
  flex-direction: column;
}

.group-name {
  font-weight: 700;
  color: var(--text-main);
  font-size: 0.9rem;
}

.creator-tag {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.action-group {
  display: flex;
  gap: 10px;
}

.btn-action {
  width: 32px;
  height: 32px;
  border-radius: 8px;

  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-action svg {
  width: 14px;
  height: 14px;
}

.btn-view {
  background-color: #f0f4ff;
  color: #4f46e5;
}

/* Hover States */
.btn-action:hover {
  transform: translateY(-1px);
  filter: brightness(0.95);
}

.btn-view:hover {
  background-color: #4f46e5;
  color: white;
}
.btn-approve:hover {
  background-color: #10b981;
  color: white;
}
.btn-deny:hover {
  background-color: #f43f5e;
  color: white;
}
</style>
