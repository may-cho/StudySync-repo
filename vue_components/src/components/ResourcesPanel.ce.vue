<template>
  <div class="resources-panel">
    <div class="panel-header">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20Z"
          stroke="currentColor"
          stroke-width="2"
        />
        <path d="M2 8H22" stroke="currentColor" stroke-width="2" />
      </svg>
      <h4>Resources</h4>
    </div>
    <div class="resources-list">
      <div v-if="files.length === 0" class="empty">No resources yet</div>
      <div v-for="file in files" :key="file.id" class="resource-item">
        <div class="resource-info">
          <span>📄</span>
          <div>
            <p>{{ file.filename }}</p>
            <small>by {{ file.uploader.username }}</small>
          </div>
        </div>
        <a :href="file.file.url" class="download-btn" download>↓</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResourcesPanel",
  props: {
    files: { type: Array, default: () => [] },
  },
};
</script>

<style scoped>
.resources-panel {
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 35px -8px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow: hidden;
}

.panel-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f0f2f5;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
}

.resources-list {
  padding: 0.5rem;
  overflow-y: auto;
  height: calc(100% - 60px);
}

.resource-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 8px;
}

.resource-item:hover {
  background: #f8fafc;
}

.resource-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

.resource-info p {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.resource-info small {
  font-size: 0.65rem;
  color: #a0aec0;
}

.download-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f8f9fa;
  color: #4a5568;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 1.2rem;
}

.download-btn:hover {
  background: #667eea;
  color: white;
}

.empty {
  text-align: center;
  color: #a0aec0;
  padding: 2rem;
  font-style: italic;
}
</style>
