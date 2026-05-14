<template>
  <div class="app-container">
    <Header
      :darkMode="darkMode"

      @toggle-dark-mode="toggleDarkMode"

      @export-notes="handleExportNotes"
    />

    <div class="main-layout">

      <Sidebar
  :notes="filteredNotes"
  :selectedNoteId="selectedNote?.id"
  :searchQuery="searchQuery"
  :sortOption="sortOption"

  @select-note="handleSelectNote"

  @update-search="
    searchQuery = $event
  "

  @update-sort="updateSort"
/>

      <NoteEditor
        :selectedNote="selectedNote"
        @save-note="handleSaveNote"
        @clear-selection="clearSelection"
        @delete-note="handleDeleteNote"
        @export-note="handleExportSingleNote"
      />

    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted
} from "vue";

import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import NoteEditor from "./components/NoteEditor.vue";

import {
  addNote,
  getAllNotes,
  updateNote,
  deleteNote,
} from "./db/notesDB";

const notes = ref([]);
const selectedNote = ref(null);

const searchQuery = ref("");

const darkMode = ref(false);

const sortOption = ref("updated-desc");
// LOAD NOTES
const loadNotes = async () => {
  notes.value = await getAllNotes();
};

// FILTERED AND SORTED NOTES
const filteredNotes = computed(() => {
  let result = notes.value;

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(note => {
      const titleMatch = note.title.toLowerCase().includes(query);
      const contentMatch = note.content.toLowerCase().includes(query);
      const tagsMatch = note.tags.some(tag => tag.toLowerCase().includes(query));
      return titleMatch || contentMatch || tagsMatch;
    });
  }

  return [...result].sort((a, b) => {
    if (sortOption.value === "updated-desc") {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    }
    if (sortOption.value === "updated-asc") {
      return new Date(a.updatedAt) - new Date(b.updatedAt);
    }
    if (sortOption.value === "created-desc") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortOption.value === "created-asc") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });
});

// SAVE NOTE
const handleSaveNote = async (noteData) => {

  // UPDATE EXISTING NOTE
  if (noteData.id) {

    const updatedNote = {
      ...noteData,
      updatedAt: new Date().toISOString(),
    };

    await updateNote(updatedNote);

  } else {

    // IMPORTANT:
    // REMOVE undefined id
    delete noteData.id;

    const newNote = {
      ...noteData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await addNote(newNote);
  }

  await loadNotes();

  selectedNote.value = null;
};

// SELECT NOTE
const handleSelectNote = (note) => {
  selectedNote.value = note;
};

// CLEAR SELECTION
const clearSelection = () => {
  selectedNote.value = null;
};

const updateSort = (value) => {
  sortOption.value = value;
};

//Dark Mode
const toggleDarkMode = () => {

  darkMode.value = !darkMode.value;

  document.body.classList.toggle(
    "dark",
    darkMode.value
  );
};
// DELETE NOTE
const handleDeleteNote = async (id) => {

  const confirmed = confirm(
    "Are you sure you want to delete this note?"
  );

  if (!confirmed) return;

  await deleteNote(id);

  selectedNote.value = null;

  await loadNotes();
};

const handleExportNotes = () => {

  // Convert notes to JSON
  const notesJSON = JSON.stringify(
    notes.value,
    null,
    2
  );

  // Create file blob
  const blob = new Blob(
    [notesJSON],
    {
      type: "application/json",
    }
  );

  // Create download URL
  const url =
    URL.createObjectURL(blob);

  // Create temporary link
  const link =
    document.createElement("a");

  link.href = url;

  link.download = "notes.json";

  // Trigger download
  link.click();

  // Cleanup
  URL.revokeObjectURL(url);
};

const handleExportSingleNote = (note) => {

  // Convert note to JSON
  const noteJSON = JSON.stringify(
    note,
    null,
    2
  );

  // Create blob
  const blob = new Blob(
    [noteJSON],
    {
      type: "application/json",
    }
  );

  // Create download URL
  const url =
    URL.createObjectURL(blob);

  // Create temporary link
  const link =
    document.createElement("a");

  // Dynamic filename
  const safeTitle =
    note.title
      .toLowerCase()
      .replace(/\s+/g, "-");

  link.href = url;

  link.download =
    `${safeTitle}.json`;

  // Trigger download
  link.click();

  // Cleanup
  URL.revokeObjectURL(url);
};

// INITIAL LOAD
onMounted(() => {
  loadNotes();
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}

body {
  background-color: #f5f7fb;
  color: #1e293b;
}

.app-container {
  height: 100vh;
}

.main-layout {
  display: flex;
  height: calc(100vh - 72px);
}

@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
    height: auto;
  }
}

/* DARK MODE */

body.dark {
  background: #0f172a;
  color: #f8fafc;
}

body.dark .header {
  background: #1e293b;
  border-bottom-color: #334155;
}

body.dark .sidebar {
  background: #1e293b;
  border-right-color: #334155;
}

body.dark .editor-card {
  background: #1e293b;
}

body.dark .note-card {
  background: #334155;
}

body.dark .note-card:hover {
  background: #475569;
}

body.dark .note-card h3,
body.dark .view-header h1,
body.dark .sidebar-header h2 {
  color: #f8fafc;
}

body.dark .note-card p,
body.dark .view-content {
  color: #cbd5e1;
}

body.dark .search-input,
body.dark .sort-select,
body.dark .title-input,
body.dark .tags-input,
body.dark .content-input {
  background: #334155;

  color: #f8fafc;

  border-color: #475569;
}

body.dark .search-input::placeholder,
body.dark .content-input::placeholder,
body.dark .title-input::placeholder,
body.dark .tags-input::placeholder {
  color: #94a3b8;
}
</style>