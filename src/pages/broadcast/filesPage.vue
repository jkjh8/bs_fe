<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
// components
import AddFolder from 'src/components/dialog/addFolder.vue'
// variables
const selected = ref([])
const folders = ref([])
const files = ref([])
// initialize
const $q = useQuasar()
// functions
const getFiles = async () => {
  const r = await api.get('/files', {
    params: { folders: folders.value.join('/') }
  })
  files.value = r.data.files
  // files.value = r.data.files
}

const addFolder = async () => {
  $q.dialog({
    component: AddFolder
  }).onOk(async (name) => {
    $q.loading.show()
    await api.post('/files/newfolder', {
      folders: folders.value.join('/'),
      name: name
    })
    await getFiles()
    $q.loading.hide()
  })
}
// lifecycle hooks
onMounted(async () => {
  $q.loading.show()
  await getFiles()
  $q.loading.hide()
})
</script>

<template>
  <div class="q-pa-md">
    <div class="borderd">
      <!-- title -->
      <div class="q-px-md q-py-sm row items-center bg-grey-2">
        <div class="row no-wrap items-center q-gutter-x-sm full-width">
          <q-icon name="folder" size="20px" color="primary" />
          <span class="text-h6">Files</span>
          <div class="text-caption q-mt-xs q-ml-md">
            <span class="cursor-pointer text-underline">media</span>
          </div>
          <q-space />
          <div class="row no-wrap">
            <q-btn
              round
              flat
              icon="create_new_folder"
              color="primary"
              size="sm"
              @click="addFolder"
            >
              <q-tooltip>New Folder</q-tooltip>
            </q-btn>
            <q-btn round flat icon="upload" color="primary" size="sm">
              <q-tooltip>File upload</q-tooltip>
            </q-btn>
            <q-btn round flat icon="download" color="primary" size="sm">
              <q-tooltip>File download</q-tooltip>
            </q-btn>
            <q-separator vertical spaced inset />
            <q-btn
              round
              flat
              icon="drive_file_rename_outline"
              color="primary"
              size="sm"
            >
              <q-tooltip>File rename</q-tooltip>
            </q-btn>
            <q-btn round flat icon="delete_outline" color="red" size="sm">
              <q-tooltip>Delete</q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
      <!-- table -->
      <div>
        <q-table
          flat
          dense
          :columns="[
            {
              name: 'name',
              label: 'Name',
              field: 'name',
              align: 'left',
              sortable: true
            },
            {
              name: 'type',
              label: 'Type',
              field: 'type',
              align: 'center',
              sortable: true
            },
            {
              name: 'size',
              label: 'Size',
              field: 'size',
              align: 'center',
              sortable: true
            }
          ]"
          :rows="files"
          row-key="name"
          selection="single"
          v-model:selected="selected"
          :pagination="{ rowsPerPage: 0 }"
        >
          <template #header-cell-name="props">
            <q-th :props="props" style="width: 60%">
              {{ props.col.label }}
            </q-th>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
