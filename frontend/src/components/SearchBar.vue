<template>
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
</template>

<script setup>
defineProps({
  searchQuery: String,
});

defineEmits([
  "update-search",
]);
</script>

<style scoped>
.search-input {
  width: 100%;

  padding: 14px 16px;

  border: 1px solid #dbe2ea;
  border-radius: 12px;

  outline: none;

  font-size: 15px;

  margin-bottom: 20px;

  transition: 0.2s;
}

.search-input:focus {
  border-color: #2563eb;
}
</style>