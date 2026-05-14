<template>
  <header class="header">

    <div class="logo">
      📝 Offline Notes Manager
    </div>

    <div class="header-actions">

      <!-- DARK MODE -->

      <button
        class="dark-btn"
        @click="$emit('toggle-dark-mode')"
      >
        {{ darkMode ? "☀️ Light" : "🌙 Dark" }}
      </button>

      <!-- EXPORT -->

      <button
        class="export-btn"
        @click="$emit('export-notes')"
      >
        Export JSON
      </button>

    </div>

  </header>
</template>

<script setup>
defineProps({
  darkMode: Boolean,
});

defineEmits([
  "toggle-dark-mode",
  "export-notes",
]);
</script>

<style scoped>
.header {
  height: 72px;

  background: white;

  border-bottom: 1px solid #e2e8f0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 24px;

  box-shadow:
    0 1px 2px rgba(0,0,0,0.05);

  transition: 0.3s;
}

.logo {
  font-size: 22px;
  font-weight: 600;

  color: #2563eb;
}

/* ACTIONS */

.header-actions {
  display: flex;
  gap: 12px;
}

/* DARK BUTTON */

.dark-btn {
  padding: 10px 18px;

  border: none;
  border-radius: 12px;

  background: #0f172a;
  color: white;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;

  transition: 0.2s;
}

.dark-btn:hover {
  background: #1e293b;
}

/* EXPORT BUTTON */

.export-btn {
  padding: 10px 18px;

  border: none;
  border-radius: 12px;

  background: #2563eb;
  color: white;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;

  transition: 0.2s;
}

.export-btn:hover {
  background: #1d4ed8;
}
</style>