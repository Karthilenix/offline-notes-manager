<template>
  <aside class="sidebar">

    <!-- HEADER -->
    <div class="sidebar-header">
      <h2>Notes</h2>
    </div>

    <!-- SEARCH -->
    <div class="search-container">
      <input
        :value="searchQuery"
        @input="
          $emit(
            'update-search',
            $event.target.value
          )
        "
        type="text"
        placeholder="Search notes..."
        class="search-input"
      />
    </div>

    <!-- SORT -->
    <div class="sort-container">

      <select
        :value="sortOption"
        @change="
          $emit(
            'update-sort',
            $event.target.value
          )
        "
        class="sort-select"
      >

        <option value="updated-desc">
          Last Modified (Newest)
        </option>

        <option value="updated-asc">
          Last Modified (Oldest)
        </option>

        <option value="created-desc">
          Created Date (Newest)
        </option>

        <option value="created-asc">
          Created Date (Oldest)
        </option>

      </select>

    </div>

    <!-- NOTES -->
    <div class="notes-list">

      <!-- EMPTY STATE -->
      <div
        v-if="notes.length === 0"
        class="empty-state"
      >
        No notes found
      </div>

      <!-- NOTE CARD -->
      <div
        v-for="note in notes"
        :key="note.id"
        class="note-card"
        :class="{
          active: selectedNoteId === note.id
        }"
        @click="
          $emit(
            'select-note',
            note
          )
        "
      >

        <!-- TITLE -->
        <h3>
          {{ note.title }}
        </h3>

        <!-- CONTENT -->
        <p>
          {{
            note.content.length > 80
              ? note.content.slice(0, 80) + "..."
              : note.content
          }}
        </p>

        <!-- TAGS -->
        <div
          v-if="note.tags.length"
          class="tags-container"
        >

          <span
            v-for="tag in note.tags.slice(0, 3)"
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>

        </div>

        <!-- DATE -->
        <span class="date">
          Last updated:
          {{ formatDate(note.updatedAt) }}
        </span>

      </div>

    </div>

  </aside>
</template>

<script setup>
defineProps({
  notes: {
    type: Array,
    default: () => [],
  },

  selectedNoteId: {
    type: Number,
    default: null,
  },

  searchQuery: {
    type: String,
    default: "",
  },

  sortOption: {
    type: String,
    default: "updated-desc",
  },
});

defineEmits([
  "select-note",
  "update-search",
  "update-sort",
]);

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
</script>

<style scoped>
.sidebar {
  width: 340px;

  background: #ffffff;

  border-right: 1px solid #dbe2ea;

  display: flex;
  flex-direction: column;

  padding: 20px;

  box-shadow:
    2px 0 8px rgba(0,0,0,0.04);

  overflow: hidden;
}

/* HEADER */

.sidebar-header {
  margin-bottom: 20px;
}

.sidebar-header h2 {
  font-size: 24px;
  font-weight: 700;

  color: #0f172a;
}

/* SEARCH */

.search-container {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;

  padding: 14px 16px;

  border: 1px solid #dbe2ea;
  border-radius: 12px;

  outline: none;

  font-size: 15px;

  transition: 0.2s;

  background: #f8fafc;

  color: #0f172a;
}

.search-input:focus {
  border-color: #2563eb;
  background: white;
}

.search-input::placeholder {
  color: #94a3b8;
}

/* SORT */

.sort-container {
  margin-bottom: 20px;
}

.sort-select {
  width: 100%;

  padding: 12px 14px;

  border: 1px solid #dbe2ea;
  border-radius: 12px;

  background: #f8fafc;

  font-size: 14px;

  outline: none;

  color: #0f172a;

  cursor: pointer;

  transition: 0.2s;
}

.sort-select:focus {
  border-color: #2563eb;
  background: white;
}

/* NOTES LIST */

.notes-list {
  overflow-y: auto;

  flex: 1;

  padding-right: 4px;
}

/* NOTE CARD */

.note-card {
  padding: 18px;

  border-radius: 16px;

  background: #f8fafc;

  margin-bottom: 16px;

  cursor: pointer;

  transition: all 0.2s ease;

  border: 2px solid transparent;

  box-shadow:
    0 2px 6px rgba(0,0,0,0.04);
}

.note-card:hover {
  background: #eff6ff;

  transform: translateY(-2px);
}

.note-card.active {
  border-color: #2563eb;

  background: #eff6ff;
}

/* TITLE */

.note-card h3 {
  font-size: 17px;

  margin-bottom: 10px;

  color: #0f172a;

  font-weight: 600;
}

/* CONTENT */

.note-card p {
  font-size: 14px;

  color: #475569;

  line-height: 1.5;

  margin-bottom: 14px;
}

/* TAGS */

.tags-container {
  display: flex;

  gap: 8px;

  flex-wrap: wrap;

  margin-bottom: 14px;
}

.tag {
  background: #dbeafe;

  color: #1d4ed8;

  padding: 4px 10px;

  border-radius: 999px;

  font-size: 12px;

  font-weight: 500;
}

/* DATE */

.date {
  font-size: 12px;

  color: #94a3b8;
}

/* EMPTY STATE */

.empty-state {
  text-align: center;

  color: #94a3b8;

  margin-top: 60px;

  font-size: 15px;
}

/* RESPONSIVE */

@media (max-width: 768px) {
  .sidebar {
    width: 100%;

    height: auto;

    border-right: none;

    border-bottom: 1px solid #dbe2ea;
  }

  .notes-list {
    max-height: 300px;
  }
}
</style>