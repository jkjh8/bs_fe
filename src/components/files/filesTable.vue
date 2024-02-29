<script setup>
import { ref, computed } from 'vue'
import { format } from 'quasar'

const columns = [
  {
    name: 'name',
    label: 'NAME',
    field: 'name',
    align: 'left',
    sortable: true
  },
  {
    name: 'size',
    label: 'SIZE',
    field: 'size',
    sortable: true
  }
]
const props = defineProps({
  files: Array,
  selectedFiles: Array
})

const emits = defineEmits(['update:selected', 'update:folder', 'update:preview'])

const selected = computed({
  get() {
    return props.selectedFiles
  },
  set(val) {
    emits('update:selected', val)
  }
})
</script>

<template>
  <q-table
    flat
    dense
    :columns="columns"
    :rows="files"
    row-key="name"
    selection="multiple"
    v-model:selected="selected"
    :pagination="{ rowsPerPage: 0 }"
  >
    <template #header="props">
      <q-tr :props="props">
        <q-th auto-width>
          <q-checkbox size="22px" v-model="props.selected" />
        </q-th>
        <q-th key="name" :props="props"> NAME </q-th>
        <q-th key="size" :props="props"> SIZE </q-th>
      </q-tr>
    </template>
    <template #body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-checkbox size="22px" v-model="props.selected" v-if="props.row.name !== '..'" />
        </q-td>
        <q-td key="name" :props="props">
          <span v-if="props.row.type === 'folder'">
            <q-icon name="folder_open" color="primary" size="16px" />
          </span>
          <span
            v-if="props.row.type === 'folder'"
            class="q-ml-xs cursor-pointer"
            @click="emits('update:folder', props.row.fullpath)"
          >
            {{ props.row.name }}
          </span>
          <span v-else>
            {{ props.row.name }}
            <q-btn
              flat
              round
              size="xs"
              color="primary"
              icon="play_arrow"
              @click="emits('update:preview', props.row)"
            />
          </span>
        </q-td>
        <q-td key="size" :props="props">
          {{ props.row.type !== 'folder' ? format.humanStorageSize(props.row.size) : '' }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<style scoped></style>
