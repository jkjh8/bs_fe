<script setup>
import { ref, onMounted, computed } from 'vue'
import { format } from 'quasar'
import PreviewFile from 'src/components/previewFile'
import { files, folders, selectedFolder, fnUpdateSelectedFolder } from 'composables/files/useFiles'
import { useFileFunc } from 'composables/files/useFileFunc'
const props = defineProps(['selection', 'dialog', 'selected'])
const emits = defineEmits(['update:selected', 'update:preview'])

const { fnRefFileNFolder } = useFileFunc()
const splitterModel = ref(25)

const select = computed({
  get() {
    return props.selected
  },
  set(val) {
    return emits('update:selected', val)
  }
})

onMounted(async () => {
  await fnRefFileNFolder()
})
</script>

<template>
  <q-splitter v-model="splitterModel">
    <template #before>
      <q-tree
        :nodes="folders"
        v-model:selected="selectedFolder"
        node-key="path"
        no-selection-unset
        selected-color="primary"
        @update:selected="fnUpdateSelectedFolder"
      ></q-tree>
    </template>
    <template #after>
      <q-table
        flat
        dense
        :columns="[
          { name: 'name', label: 'NAME', field: 'name', align: 'left', sortable: true },
          { name: 'size', label: 'SIZE', field: 'size', sortable: true }
        ]"
        :rows="files"
        row-key="name"
        :selection="selection"
        v-model:selected="select"
        :pagination="{ rowsPerPage: 0 }"
        hide-bottom
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
                @click="fnUpdateSelectedFolder(props.row.fullpath)"
              >
                {{ props.row.name }}
              </span>
              <span v-else>
                {{ props.row.name }}
                <q-btn
                  v-if="!dialog"
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
  </q-splitter>
</template>

<style scoped></style>
