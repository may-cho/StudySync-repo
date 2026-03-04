<template>
  <div class="discovery-main">
    <!-- Compact Header Row -->
    <div class="discovery-header">
      <div class="header-left">
        <h1 class="header-title">Find Study Partners</h1>
        <p class="header-subtitle">Connect with classmates</p>
      </div>

      <div class="header-actions">
        <div class="search-wrapper">
          <span class="search-icon">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="search-input"
          />
          <button
            class="search-clear"
            v-if="searchQuery"
            @click="searchQuery = ''"
          >
            ✕
          </button>
        </div>

        <div class="view-toggles">
          <button
            :class="['view-btn', { active: viewMode === 'grid' }]"
            @click="viewMode = 'grid'"
            title="Grid view"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
          <button
            :class="['view-btn', { active: viewMode === 'list' }]"
            @click="viewMode = 'list'"
            title="List view"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Filter Tabs - Horizontal Scroll -->
    <div class="filter-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['filter-tab', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        <span class="tab-emoji">{{ tab.icon }}</span>
        <span class="tab-name">{{ tab.name }}</span>
        <span class="tab-badge">{{ tab.count }}</span>
      </button>
    </div>

    <!-- Results Grid -->
    <div class="results-container">
      <transition name="fade" mode="out-in">
        <div
          v-if="filteredResults.length > 0"
          :class="['results-flex', { 'results-list': viewMode === 'list' }]"
        >
          <GalleryCard
            v-if="viewMode === 'grid'"
            v-for="(data, index) in filteredResults"
            :key="index"
            :profile="data.profile"
            :match-percent="data.match_percent"
            :overlap-hours="data.overlap_hours"
            :overlap-courses="data.overlap_courses"
            :time-slots="data.daily_schedules"
          />

          <GalleryCardHorizontal
            v-else
            v-for="(data, index) in filteredResults"
            :profile="data.profile"
            :key="data.profile.username.substring(0, 2) + index"
            :match-percent="data.match_percent"
            :overlap-hours="data.overlap_hours"
            :overlap-courses="data.overlap_courses"
            :time-slots="data.daily_schedules"
          />
        </div>

        <div v-else class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No matches found</h3>
          <p>Try adjusting your filters</p>
          <button class="empty-reset" @click="resetFilters">
            Clear all filters
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import GalleryCard from "./GalleryCard.ce.vue";
import GalleryCardHorizontal from "./GalleryCardCompat.ce.vue";

const props = defineProps({
  topMatches: String,
  sameMajor: String,
  sameCourse: String,
});

const viewMode = ref("grid");
const searchQuery = ref("");
const activeTab = ref("all");

const parsedData = computed(() => {
  try {
    const parsedTopMatches = JSON.parse(props.topMatches);
    const bestMatches = parsedTopMatches.reduce((acc, cur) => {
      if (cur.match_percent > 85) return (acc += 1);
      return acc;
    }, 0);
    const scheduleMatches = parsedTopMatches.reduce((acc, cur) => {
      if (cur.overlap_hours > 5) return (acc += 1);
      return acc;
    }, 0);
    const parsedSameMajor = JSON.parse(props.sameMajor);
    const parsedSameCourse = JSON.parse(props.sameCourse);

    return {
      all: parsedTopMatches.length,
      best: bestMatches,
      schedule: scheduleMatches,
      major: parsedSameMajor.length,
      course: parsedSameCourse.length,
    };
  } catch (e) {
    console.error(e);
    return { all: 0, best: 0, schedule: 0, major: 0, course: 0 };
  }
});

const tabs = [
  { id: "all", name: "All", icon: "👥", count: parsedData.value.all },
  { id: "high", name: "Best", icon: "⭐", count: parsedData.value.best },
  {
    id: "schedule",
    name: "Schedule",
    icon: "🕒",
    count: parsedData.value.schedule,
  },
  {
    id: "courses",
    name: "Courses",
    icon: "📚",
    count: parsedData.value.course,
  },
  { id: "major", name: "Major", icon: "🎓", count: parsedData.value.major },
];

const currentDataString = computed(() => {
  if (activeTab.value === "major") return props.sameMajor;
  if (activeTab.value === "courses") return props.sameCourse;
  return props.topMatches;
});

const parsedResults = computed(() => {
  try {
    return JSON.parse(currentDataString.value || "[]");
  } catch (e) {
    return [];
  }
});

const filteredResults = computed(() => {
  let results = parsedResults.value;

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    results = results.filter(
      (item) =>
        item.profile.username.toLowerCase().includes(q) ||
        item.profile.major.toLowerCase().includes(q) ||
        item.overlap_courses?.some((course) =>
          course.toLowerCase().includes(q),
        ),
    );
  }

  switch (activeTab.value) {
    case "high":
      results = results.filter((r) => r.match_percent >= 85);
      break;
    case "schedule":
      results = results.filter((r) => r.overlap_hours >= 5);
      break;
    case "courses":
      results = results.filter((r) => r.overlap_courses?.length >= 2);
      break;
  }

  return results;
});

// In GalleryManager.ce.vue
const handleConnect = (username) => {
  // DELETE the axios call and the alert from here!
  // Just leave a log so you know the button was pressed.
  console.log("Card is now handling the form for:", username);
};
const resetFilters = () => {
  searchQuery.value = "";
  activeTab.value = "all";
};

watch(parsedResults, (newResults) => {
  // Update counts if needed
});
</script>

<style scoped>
/* Main container - accounts for left sidebar */
.discovery-main {
  /* width: 100%; */
  padding: 1.5rem;
  font-family: "Inter", sans-serif;
  overflow-y: auto;
  height: 100vh;
}

/* Styling for the Connect button inside the Gallery Cards */
:deep(.connect-btn) {
  width: 100%;
  padding: 0.6rem;
  background: #3b82f6; /* Accent color from your root */
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: auto; /* Pushes button to bottom of card */
}

:deep(.connect-btn:hover) {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

:deep(.connect-btn:active) {
  transform: translateY(0);
}

/* Loading state for the button */
:deep(.connect-btn.loading) {
  background: #94a3b8;
  cursor: wait;
}

/* Header - Compact with no overlap */
.discovery-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 0.5rem;
  width: 70vw;
}

.header-left {
  flex-shrink: 0;
}

.header-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.1rem;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.header-subtitle {
  font-size: 0.7rem;
  color: #64748b;
  margin: 0;
  white-space: nowrap;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  width: 350px;
}

/* Search - Fixed width */
.search-wrapper {
  position: relative;
  width: 200px;
  flex-shrink: 0;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 0.8rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem 1.8rem 0.5rem 2.2rem;
  border: 1px solid #f1f5f9;
  border-radius: 40px;
  background: white;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #1e3a5f;
  box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.1);
}

.search-clear {
  position: absolute;
  right: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  border: none;
  background: #f1f5f9;
  border-radius: 11px;
  color: #64748b;
  font-size: 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.search-clear:hover {
  background: #e2e8f0;
  color: #1e3a5f;
}

/* View Toggles - Fixed width */
.view-toggles {
  display: flex;
  gap: 0.2rem;
  background: #f8fafc;
  padding: 0.2rem;
  border-radius: 40px;
  border: 1px solid #f1f5f9;
  flex-shrink: 0;
}

.view-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 30px;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding: 0;
}

.view-btn:hover {
  color: #1e3a5f;
  background: white;
}

.view-btn.active {
  background: #1e3a5f;
  color: white;
}

/* Filter Tabs - Horizontal Scroll */
.filter-tabs {
  display: flex;
  gap: 0.4rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  scrollbar-width: none;
  width: 100%;
}

.filter-tabs::-webkit-scrollbar {
  display: none;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 1rem;
  border: 1px solid #f1f5f9;
  background: white;
  border-radius: 40px;
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
}

.filter-tab:hover {
  background: #f8fafc;
  color: #1e3a5f;
}

.filter-tab.active {
  background: #1e3a5f;
  color: white;
  border-color: #1e3a5f;
}

.tab-emoji {
  font-size: 0.85rem;
}

.tab-badge {
  background: #f1f5f9;
  padding: 0.1rem 0.4rem;
  border-radius: 30px;
  font-size: 0.6rem;
  color: #64748b;
  margin-left: 0.1rem;
}

.filter-tab.active .tab-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* Results Container */
.results-container {
  min-height: 400px;
  width: 100%;
}

/* FLEXBOX GRID - No overlapping */
.results-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  width: 100%;
}

/* Card items with fixed width */
.results-flex > * {
  flex: 0 0 calc(25% - 0.9rem); /* 4 columns with gap accounted */
  min-width: 280px;
  max-width: 100%;
  height: 340px; /* Fixed height */
  margin-bottom: 0; /* No extra margin */
}

/* Ensure GalleryCard takes full dimensions */
:deep(.grid-card) {
  height: 100%;
  width: 100%;
  margin: 0;
}

/* List view */
.results-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.results-list > * {
  width: 100%;
  height: auto;
  min-height: 200px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 32px;
  border: 2px dashed #f1f5f9;
  width: 100%;
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.3rem;
}

.empty-state p {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 1.2rem;
}

.empty-reset {
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  padding: 0.5rem 1.5rem;
  border-radius: 40px;
  color: #1e3a5f;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.empty-reset:hover {
  background: #1e3a5f;
  color: white;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* Full width */
  height: 100vh; /* Full height */
  background: rgba(0, 0, 0, 0.7); /* Darker background */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999 !important; /* Forces it to the very front */
}

/* Responsive breakpoints */
@media (max-width: 1200px) {
  .results-flex > * {
    flex: 0 0 calc(33.333% - 0.8rem); /* 3 columns */
  }
}

@media (max-width: 900px) {
  .results-flex > * {
    flex: 0 0 calc(50% - 0.6rem); /* 2 columns */
  }
}

@media (max-width: 768px) {
  .discovery-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-left {
    width: 100%;
  }

  .header-title,
  .header-subtitle {
    white-space: normal;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }

  .search-wrapper {
    width: calc(100% - 90px);
  }

  .results-flex > * {
    flex: 0 0 100%; /* 1 column */
    height: auto;
    min-height: 340px;
  }
}
</style>
