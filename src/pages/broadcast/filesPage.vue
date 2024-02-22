<script setup>
import { ref, onMounted } from 'vue'
import { api, apiUrl } from 'boot/axios'
import { useQuasar, format } from 'quasar'
// store
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/user'
import { useFilesStore } from 'src/stores/files'
// components
import AddFolder from 'src/components/dialog/addFolder.vue'
import ConfirmDeialog from 'src/components/dialog/confirmDialog.vue'
import UploadFile from 'src/components/dialog/uploadFile.vue'
import RenameFile from 'src/components/dialog/renameFile.vue'

import FolderTree from 'src/components/files/folderTree.vue'
import FilesTable from 'src/components/files/filesTable'
// variables
const { user } = storeToRefs(useUserStore())
const { files, folders, selectedFolder, selectedFiles } = storeToRefs(useFilesStore())
const { getFolders, getFiles, updateSelectedFolder, newFolder } = useFilesStore()

const selected = ref([])
const splitterModel = ref(20)
// initialize
const $q = useQuasar()
// functions

const addFolder = async () => {
  $q.dialog({
    component: AddFolder
  }).onOk(async (name) => {
    if (!name) return
    $q.loading.show()
    await newFolder(name)
    await getFolders()
    await getFiles(selectedFolder.value)
    $q.loading.hide()
  })
}

const removeFile = async () => {
  if (!selected.value.length) return
  $q.dialog({
    component: ConfirmDeialog,
    componentProps: {
      title: `Remove ${selected.value[0].type === 'folder' ? 'Folder' : 'File'}`,
      message: 'Are you shure to remove File or Folder?'
    }
  }).onOk(async () => {
    $q.loading.show()
    await api.delete('/files/remove', { data: { ...selected.value[0] } })
    await getFiles(selectedFolder.value)
    $q.loading.hide()
  })
}
const fileUploader = async () => {
  $q.dialog({
    component: UploadFile,
    componentProps: {
      folder: selectedFolder.value
    }
  }).onOk(async () => {
    $q.loading.show()
    await getFiles(selectedFolder.value)
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
    `${apiUrl}/files/download/${encodeURIComponent(JSON.stringify(selected.value[0]))}`
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
    await getFiles(selectedFolder.value)
    selected.value = []
    $q.loading.hide()
  })
}

// lifecycle hooks
onMounted(async () => {
  console.log(user.value)
  $q.loading.show()
  await getFolders()
  await getFiles(selectedFolder.value)
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
          <q-space />
          <div class="row no-wrap">
            <q-btn round flat icon="create_new_folder" color="primary" size="sm" @click="addFolder">
              <q-tooltip>New Folder</q-tooltip>
            </q-btn>
            <q-btn round flat icon="upload" color="primary" size="sm" @click="fileUploader">
              <q-tooltip>File upload</q-tooltip>
            </q-btn>
            <q-btn round flat icon="download" color="primary" size="sm" @click="fileDownload">
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
            <q-btn round flat icon="delete_outline" color="red" size="sm" @click="removeFile">
              <q-tooltip>Delete</q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
      <!-- table -->
      <div>
        <q-splitter v-model="splitterModel">
          <template v-slot:before>
            <FolderTree
              class="q-pa-sm"
              :folders="folders"
              :selected="selectedFolder"
              @update:selected="updateSelectedFolder"
            />
          </template>
          <template v-slot:after>
            <FilesTable
              :files="files"
              :selectedFiles="selectedFiles"
              @update:selected="(v) => (selectedFiles = v)"
              @update:folder="updateSelectedFolder"
            />
          </template>
        </q-splitter>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
