<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  folders: Array,
  selected: String
})
const emits = defineEmits(['update:selected'])

const selectedFolder = computed({
  get() {
    return props.selected
  },
  set(val) {
    emits('update:selected', val)
  }
})
</script>

<template>
  <div>
    <q-tree
      :nodes="folders"
      v-model:selected="selectedFolder"
      node-key="path"
      no-selection-unset
      selected-color="primary"
    >
    </q-tree>
  </div>
</template>

<style scoped></style>
