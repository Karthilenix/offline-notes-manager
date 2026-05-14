<template>
  <section class="editor">

    <div class="editor-card">

      <!-- VIEW MODE -->
      <template v-if="selectedNote && !isEditing">

        <div class="view-header">

            <div class="header-left">

            <button
              class="back-btn"
              @click="$emit('clear-selection')"
            >
      ← Back
    </button>

    <h1>{{ selectedNote.title }}</h1>

  </div>

  <div class="action-buttons">

  <button
    class="edit-btn"
    @click="enableEditing"
  >
    Edit
  </button>

  <button
    class="delete-btn"
    @click="
      $emit(
        'delete-note',
        selectedNote.id
      )
    "
  >
    Delete
  </button>

  <button
      class="export-btn"
      @click="
        $emit(
          'export-note',
          selectedNote
        )
      "
    >
      Export
    </button>

</div>

</div>

        <div class="view-content">
          {{ selectedNote.content }}
        </div>

        <div class="tags-container">

          <span
            v-for="tag in selectedNote.tags"
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>

        </div>

      </template>

      <!-- CREATE / EDIT MODE -->
      <template v-else>

        <input
          v-model="title"
          type="text"
          placeholder="Note title"
          class="title-input"
        />

        <textarea
          v-model="content"
          placeholder="Start writing your note..."
          class="content-input"
        ></textarea>

        <input
          v-model="tags"
          type="text"
          placeholder="Tags (comma separated)"
          class="tags-input"
        />

        <button
          class="save-btn"
          @click="saveNote"
        >
          {{ selectedNote ? "Update Note" : "Save Note" }}
        </button>

      </template>

    </div>

  </section>
</template>

<script setup>
import {
  ref,
  watch,
} from "vue";

const props = defineProps({
  selectedNote: Object,
});

const emit = defineEmits([
  "save-note",
  "clear-selection",
  "delete-note",
  "export-note",
]);

const title = ref("");
const content = ref("");
const tags = ref("");

const isEditing = ref(false);

// Watch selected note
watch(
  () => props.selectedNote,
  (note) => {

    if (note) {
      title.value = note.title;
      content.value = note.content;
      tags.value = note.tags.join(", ");

      isEditing.value = false;
    } else {
      title.value = "";
      content.value = "";
      tags.value = "";

      isEditing.value = true;
    }

  },
  { immediate: true }
);

const enableEditing = () => {
  isEditing.value = true;
};

const saveNote = () => {

  if (!title.value.trim()) {
    alert("Title is required");
    return;
  }

  emit("save-note", {
    id: props.selectedNote?.id,

    title: title.value,

    content: content.value,

    tags: tags.value
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag !== ""),

    createdAt: props.selectedNote?.createdAt,
  });

  title.value = "";
  content.value = "";
  tags.value = "";

  isEditing.value = false;
};
</script>

<style>
.editor {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
}

.editor-card {
  background: white;
  border-radius: 18px;

  padding: 28px;

  box-shadow:
    0 4px 12px rgba(0,0,0,0.05);

  min-height: 100%;
}

/* VIEW MODE */

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 24px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  padding: 10px 16px;

  border: none;
  border-radius: 10px;

  background: #e2e8f0;

  color: #334155;

  cursor: pointer;

  font-size: 14px;
  font-weight: 500;

  transition: 0.2s;
}

.back-btn:hover {
  background: #cbd5e1;
}

.view-header h1 {
  font-size: 32px;
  color: #0f172a;
}

.view-content {
  white-space: pre-wrap;

  line-height: 1.8;

  color: #334155;

  font-size: 17px;

  margin-bottom: 30px;
}

.tags-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tag {
  padding: 8px 14px;

  border-radius: 999px;

  background: #dbeafe;

  color: #1d4ed8;

  font-size: 14px;
}

/* EDIT BUTTON */

.edit-btn {
  padding: 10px 18px;

  border: none;
  border-radius: 12px;

  background: #2563eb;
  color: white;

  cursor: pointer;

  font-size: 14px;
  font-weight: 500;
}
.action-buttons {
  display: flex;
  gap: 12px;
}

/*Delete Button*/ 

.delete-btn {
  padding: 10px 18px;

  border: none;
  border-radius: 12px;

  background: #ef4444;
  color: white;

  cursor: pointer;

  font-size: 14px;
  font-weight: 500;

  transition: 0.2s;
}

.delete-btn:hover {
  background: #dc2626;
}

/*Export button*/ 

.export-btn {
  padding: 10px 18px;

  border: none;
  border-radius: 12px;

  background: #10b981;
  color: white;

  cursor: pointer;

  font-size: 14px;
  font-weight: 500;

  transition: 0.2s;
}

.export-btn:hover {
  background: #059669;
}

/* FORM MODE */

.title-input,
.tags-input {
  width: 100%;

  padding: 14px 16px;

  border: 1px solid #dbe2ea;
  border-radius: 12px;

  font-size: 16px;

  margin-bottom: 18px;

  outline: none;
}

.content-input {
  width: 100%;

  min-height: 420px;

  padding: 16px;

  border: 1px solid #dbe2ea;
  border-radius: 12px;

  resize: vertical;

  font-size: 16px;
  line-height: 1.6;

  margin-bottom: 18px;

  outline: none;
}

.title-input:focus,
.tags-input:focus,
.content-input:focus {
  border-color: #2563eb;
}

.save-btn {
  padding: 12px 24px;

  border: none;
  border-radius: 12px;

  background: #2563eb;
  color: white;

  font-size: 15px;
  font-weight: 500;

  cursor: pointer;
}
</style>