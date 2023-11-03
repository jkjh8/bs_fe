<script setup>
import { ref, onMounted } from 'vue'
import { api, apiUrl } from 'boot/axios'
import { useQuasar, format } from 'quasar'
// components
import AddFolder from 'src/components/dialog/addFolder.vue'
import ConfirmDeialog from 'src/components/dialog/confirmDialog.vue'
import UploadFile from 'src/components/dialog/uploadFile.vue'
import RenameFile from 'src/components/dialog/renameFile.vue'
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
    if (!name) return
    $q.loading.show()
    await api.post('/files/newfolder', {
      folders: folders.value.join('/'),
      name: name
    })
    await getFiles()
    $q.loading.hide()
  })
}

const removeFile = async () => {
  if (!selected.value.length) return
  $q.dialog({
    component: ConfirmDeialog,
    componentProps: {
      title: `Remove ${
        selected.value[0].type === 'folder' ? 'Folder' : 'File'
      }`,
      message: 'Are you shure to remove File or Folder?'
    }
  }).onOk(async () => {
    $q.loading.show()
    await api.delete('/files/remove', { data: { ...selected.value[0] } })
    await getFiles()
    $q.loading.hide()
  })
}
const fileUploader = async () => {
  $q.dialog({
    component: UploadFile,
    componentProps: {
      folders: folders.value.join('/')
    }
  }).onOk(async () => {
    $q.loading.show()
    await getFiles()
    $q.loading.hide()
  })
}

const fileDownload = async () => {
  if (!selected.value.length) return
  if (selected.value[0].type === 'folder') return
  $q.loading.show()
  const link = document.createElement('a')
  link.setAttribute(
    'href',
    `${apiUrl}/files/download/${encodeURIComponent(
      JSON.stringify(selected.value[0])
    )}`
  )
  link.click()
  link.remove()
  $q.loading.hide()
  selected.value = []
}

const rename = async () => {
  $q.dialog({
    component: RenameFile,
    componentProps: {
      current: selected.value[0]
    }
  }).onOk(async (obj) => {
    if (!obj && !Object.keys(obj).length) return
    $q.loading.show()
    console.log(obj)
    await api.put('/files/rename', { ...obj })
    await getFiles()
    selected.value = []
    $q.loading.hide()
  })
}

const moveDownFolder = async (folder) => {
  console.log(folder)
  $q.loading.show()
  folders.value.push(folder)
  await getFiles()
  $q.loading.hide()
}

const moveUpFolder = async (item) => {
  $q.loading.show()
  if (!item) {
    folders.value = []
    await getFiles()
  } else {
    const idx = folders.value.findIndex((e) => e === item)
    folders.value = folders.value.slice(0, idx + 1)
    await getFiles()
  }
  $q.loading.hide()
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
            <span class="cursor-pointer text-underline" @click="moveUpFolder()"
              >media</span
            >
            <span v-for="(item, idx) in folders" :key="idx">
              <span class="q-mx-xs">/</span>
              <span
                class="cursor-pointer text-underline"
                @click="moveUpFolder(item)"
              >
                {{ item }}
              </span>
            </span>
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
            <q-btn
              round
              flat
              icon="upload"
              color="primary"
              size="sm"
              @click="fileUploader"
            >
              <q-tooltip>File upload</q-tooltip>
            </q-btn>
            <q-btn
              round
              flat
              icon="download"
              color="primary"
              size="sm"
              @click="fileDownload"
            >
              <q-tooltip>File download</q-tooltip>
            </q-btn>
            <q-separator vertical spaced inset />
            <q-btn
              round
              flat
              icon="drive_file_rename_outline"
              color="primary"
              size="sm"
              @click="rename"
            >
              <q-tooltip>File rename</q-tooltip>
            </q-btn>
            <q-btn
              round
              flat
              icon="delete_outline"
              color="red"
              size="sm"
              @click="removeFile"
            >
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
          <template #body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-checkbox dense v-model="props.selected" />
              </q-td>
              <q-td key="name" :props="props">
                <!-- icons -->
                <span v-if="props.row.type === 'folder'">
                  <q-icon name="folder_open" color="primary" size="16px" />
                </span>
                <span v-else-if="props.row.type === 'wav'">
                  <q-icon name="play_arrow" color="primary" size="16px" />
                </span>
                <span v-else-if="props.row.type === 'mp3'">
                  <q-icon name="play_arrow" color="primary" size="16px" />
                </span>
                <!-- name -->
                <span
                  v-if="props.row.type === 'folder'"
                  class="q-ml-xs text-underline cursor-pointer"
                  @click="moveDownFolder(props.row.name)"
                >
                  {{ props.row.name }}
                </span>
                <span v-else>
                  {{ props.row.name }}
                </span>
              </q-td>
              <q-td key="type" :props="props">
                {{ props.row.type }}
              </q-td>
              <q-td key="size" :props="props">
                {{
                  props.row.type !== 'folder'
                    ? format.humanStorageSize(props.row.size)
                    : ''
                }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
