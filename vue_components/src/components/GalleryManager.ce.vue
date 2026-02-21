<template>
  <div class="discovery-container">
    <!-- Header -->
    <div class="discovery-header">
      <div class="brand">
        <h1 class="brand-title">StudySync</h1>
        <p class="brand-tagline">Discover your ideal study partner</p>
      </div>

      <div class="view-toggles">
        <button
          :class="['toggle-btn', { active: viewMode === 'grid' }]"
          @click="viewMode = 'grid'"
          aria-label="Grid view"
        >
          <span class="toggle-icon">⊞</span>
        </button>
        <button
          :class="['toggle-btn', { active: viewMode === 'list' }]"
          @click="viewMode = 'list'"
          aria-label="List view"
        >
          <span class="toggle-icon">≡</span>
        </button>
      </div>
    </div>

    <!-- Search -->
    <div class="search-section">
      <div class="search-field">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name, course, or major..."
          class="search-input"
        />
        <button
          class="search-submit"
          v-if="searchQuery"
          @click="searchQuery = ''"
        >
          <span class="clear-icon">✕</span>
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-bar">
      <div class="filter-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['filter-tab', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          <span class="tab-emoji">{{ tab.icon }}</span>
          <span class="tab-name">{{ tab.name }}</span>
          <span v-if="tab.count" class="tab-badge">{{ tab.count }}</span>
        </button>
      </div>
    </div>

    <!-- Results -->
    <div class="results-section">
      <transition name="fade" mode="out-in">
        <div
          v-if="filteredResults.length > 0"
          :class="['results-grid', { 'results-list': viewMode === 'list' }]"
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
            @connect="handleConnect"
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
            @connect="handleConnect"
          />
        </div>

        <div v-else class="empty-state">
          <div class="empty-illustration">🔍</div>
          <h3 class="empty-title">No matches found</h3>
          <p class="empty-message">
            Try adjusting your filters or search criteria
          </p>
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
    const parsedSameCourse = JSON.parse(props.sameMajor);

    return {
      all: parsedTopMatches.length,
      best: bestMatches,
      schedule: scheduleMatches,
      major: parsedSameMajor.length,
      course: parsedSameCourse.length,
    };
  } catch (e) {
    console.error(e);
  }
});

const tabs = [
  { id: "all", name: "All matches", icon: "👥", count: parsedData.value.all },
  {
    id: "high",
    name: "Best matches",
    icon: "⭐",
    count: parsedData.value.best,
  },
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

// Map the data based on active tab
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

// Filter by search and tab
const filteredResults = computed(() => {
  let results = parsedResults.value;

  // Search filter
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

  // Tab filters
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

const handleConnect = (username) => {
  console.log(`Connecting with ${username}`);
};

const resetFilters = () => {
  searchQuery.value = "";
  activeTab.value = "all";
};

// Update counts based on actual data (you can enhance this)
watch(parsedResults, (newResults) => {
  // Update tab counts dynamically if needed
  // This is just a placeholder for future enhancement
});
</script>

<style scoped>
.discovery-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
}

/* Header */
.discovery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.brand-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1a1e2b;
  letter-spacing: -0.02em;
  margin: 0 0 0.25rem;
}

.brand-tagline {
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0;
}

.view-toggles {
  display: flex;
  gap: 0.5rem;
  background: white;
  padding: 0.25rem;
  border-radius: 40px;
  border: 1px solid #eef2f6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.toggle-btn {
  width: 42px;
  height: 42px;
  border-radius: 40px;
  border: none;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn:hover {
  color: #4158d0;
  background: #f5f7ff;
}

.toggle-btn.active {
  background: #4158d0;
  color: white;
  box-shadow: 0 4px 10px rgba(65, 88, 208, 0.2);
}

.toggle-icon {
  font-size: 1.3rem;
  line-height: 1;
}

/* Search */
.search-section {
  margin-bottom: 2rem;
}

.search-field {
  max-width: 500px;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1rem;
  color: #94a3b8;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3.5rem;
  font-size: 0.95rem;
  border: 1px solid #eef2f6;
  border-radius: 50px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #4158d0;
  box-shadow: 0 4px 16px rgba(65, 88, 208, 0.08);
}

.search-submit {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s;
}

.search-submit:hover {
  background: #f1f5f9;
  color: #4158d0;
}

/* Filters Bar */
.filters-bar {
  margin-bottom: 2.5rem;
  border-bottom: 1px solid #f0f2f5;
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.75rem;
  scrollbar-width: none;
}

.filter-tabs::-webkit-scrollbar {
  display: none;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border: none;
  background: transparent;
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 40px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.filter-tab:hover {
  background: #f8fafc;
  color: #4158d0;
}

.filter-tab.active {
  background: #f0f2ff;
  color: #4158d0;
}

.tab-emoji {
  font-size: 1.1rem;
}

.tab-badge {
  background: #eef2f6;
  color: #64748b;
  padding: 0.15rem 0.5rem;
  border-radius: 30px;
  font-size: 0.7rem;
  font-weight: 500;
  margin-left: 0.25rem;
}

.filter-tab.active .tab-badge {
  background: white;
  color: #4158d0;
}

/* Results */
.results-section {
  min-height: 400px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.results-list :deep(.gallery-card) {
  display: flex;
  flex-direction: row;
  height: auto;
}

.results-list :deep(.card-cover) {
  width: 120px;
  height: auto;
  flex-shrink: 0;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 32px;
  border: 1px dashed #e2e8f0;
}

.empty-illustration {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.7;
}

.empty-title {
  font-size: 1.3rem;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.empty-message {
  color: #94a3b8;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.empty-reset {
  background: none;
  border: 1px solid #e2e8f0;
  padding: 0.6rem 1.5rem;
  border-radius: 40px;
  color: #64748b;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.empty-reset:hover {
  border-color: #4158d0;
  color: #4158d0;
  background: #f8faff;
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

/* Responsive */
@media (max-width: 768px) {
  .discovery-container {
    padding: 1.5rem 1rem;
  }

  .discovery-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .view-toggles {
    align-self: flex-end;
  }

  .search-field {
    max-width: 100%;
  }

  .results-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .filter-tab {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .empty-state {
    padding: 2rem 1rem;
  }
}
</style>
