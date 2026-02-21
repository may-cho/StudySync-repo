<template>
  <nav class="aura-navbar" :class="{ scrolled: isScrolled }">
    <div class="aura-container">
      <a class="aura-brand" :href="dashboardUrl">
        <div class="brand-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span class="brand-name">StudySync</span>
      </a>

      <div class="aura-nav-desktop">
        <div class="nav-menu">
          <a
            v-for="item in navItems"
            :key="item.path"
            :href="item.path"
            class="nav-item"
            :class="{ 'is-active': isActiveRoute(item.path) }"
          >
            <span class="nav-indicator"></span>
            <span class="nav-label">{{ item.label }}</span>
          </a>
        </div>

        <div class="nav-actions">
          <div v-if="isAuthenticated" class="action-wrapper">
            <button
              class="action-trigger"
              @click="toggleDropdown('notifications')"
            >
              <svg class="action-icon" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
              <span v-if="unreadCount > 0" class="notification-badge">{{
                unreadCount
              }}</span>
            </button>

            <transition name="fade-down">
              <div
                v-if="activeDropdown === 'notifications'"
                class="dropdown-menu notifications-dropdown"
              >
                <div class="dropdown-header">
                  <h3>Notifications</h3>
                  <span class="badge-soft">{{ unreadCount }} new</span>
                </div>
                <div class="dropdown-body">
                  <div
                    v-if="notifications && notifications.length"
                    class="notification-list"
                  >
                    <div
                      v-for="note in notifications"
                      :key="note.id"
                      class="notification-item"
                    >
                      <div class="notification-content">
                        <p class="notification-text">{{ note.message }}</p>
                        <span class="notification-time">{{ note.time }}</span>
                      </div>
                    </div>
                  </div>
                  <div v-else class="empty-state">
                    <p>No notifications yet</p>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <div v-if="isAuthenticated" class="action-wrapper">
            <button class="profile-trigger" @click="toggleDropdown('profile')">
              <div class="profile-avatar">
                <span>{{ userInitial }}</span>
              </div>
              <div class="profile-info">
                <span class="profile-name">{{ username }}</span>
                <span class="profile-role">{{
                  isAdmin ? "Admin" : "Student"
                }}</span>
              </div>
            </button>

            <transition name="fade-down">
              <div
                v-if="activeDropdown === 'profile'"
                class="dropdown-menu profile-dropdown"
              >
                <div class="dropdown-body">
                  <a
                    v-for="item in userMenuItems"
                    :key="item.path"
                    :href="item.path"
                    class="dropdown-item"
                    :class="{ 'is-danger': item.isLogout }"
                    @click="item.isLogout ? handleLogout($event) : null"
                  >
                    <i :class="item.icon" class="item-icon"></i>
                    <span>{{ item.label }}</span>
                  </a>
                </div>
              </div>
            </transition>
          </div>

          <div v-else class="guest-actions">
            <a :href="loginUrl" class="btn btn-ghost">Sign in</a>
            <a :href="registerUrl" class="btn btn-primary">Create account</a>
          </div>

          <button class="mobile-menu-btn" @click="toggleMobileMenu">
            <span class="hamburger" :class="{ 'is-active': isMobileMenuOpen }">
              <span></span><span></span><span></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  isAuthenticated: { type: Boolean, default: false },
  username: { type: String, default: "" },
  isAdmin: { type: Boolean, default: false },
  unreadCount: { type: Number, default: 0 },
  dashboardUrl: { type: String, default: "/" },
  loginUrl: { type: String, default: "/login/" },
  registerUrl: { type: String, default: "/register/" },
  notificationsUrl: { type: String, default: "/notifications/" },
  notifications: { type: Array, default: () => [] },
  currentPath: { type: String, default: "/" },
});

const emit = defineEmits(["logout"]);
const isMobileMenuOpen = ref(false);
const activeDropdown = ref(null);
const isScrolled = ref(false);

const userInitial = computed(() =>
  props.username ? props.username.charAt(0).toUpperCase() : "?",
);

const navItems = [
  { label: "Dashboard", path: "/dashboard/", icon: "fas fa-chart-pie" },
  { label: "Timetable", path: "/timetable/", icon: "fas fa-calendar" },
  { label: "Groups", path: "/groups/", icon: "fas fa-users" },
];

const userMenuItems = [
  { label: "Profile", path: "/profile/", icon: "fas fa-user" },
  { label: "Sign Out", path: "#", icon: "fas fa-sign-out-alt", isLogout: true },
];

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
const toggleDropdown = (type) => {
  activeDropdown.value = activeDropdown.value === type ? null : type;
};

const handleLogout = (e) => {
  e.preventDefault();
  emit("logout");
};

const isActiveRoute = (path) => props.currentPath.startsWith(path);
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --background: #f8fafc;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --border: #e2e8f0;
  /* CRITICAL: No slashes, no line breaks in these strings */
  --shadow-sm:
    0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-md:
    0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --radius-xl: 28px;
}

.aura-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  z-index: 1100;
}

.aura-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.75rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-left: 0.5rem;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: var(--background);
  padding: 0.25rem;
  border-radius: var(--radius-xl);
}

.nav-item {
  padding: 0.5rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
}

.nav-item.is-active {
  background: white;
  color: var(--primary);
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.action-wrapper {
  position: relative;
}

.profile-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--background);
  border: 1px solid var(--border);
  padding: 0.25rem 0.75rem;
  border-radius: 40px;
  cursor: pointer;
}

.profile-avatar {
  width: 32px;
  height: 32px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-menu {
  position: absolute;
  top: 110%;
  right: 0;
  width: 220px;
  background: white;
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  z-index: 100;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
}

.dropdown-item:hover {
  background: var(--background);
}
.btn-primary {
  background: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 40px;
  text-decoration: none;
  font-weight: 600;
}
</style>
