<script setup>
import { useQuasar } from 'quasar'
// components
import AddFolder from 'src/components/dialog/files/addFolder.vue'
import UploadFile from 'src/components/dialog/files/uploadFile.vue'
import DeleteFiles from 'src/components/dialog/files/deleteFiles.vue'
import RenameFile from 'src/components/dialog/files/renameFile.vue'
// composables
import {
  files,
  folders,
  selectedFiles,
  selectedFolder,
  globalFolder,
  userFolder,
  fnMakeFolder,
  fnGetFolders,
  fnGetFiles,
  fnFileDownload,
  fnDeleteFiles,
  fnRenameFile,
  fnUpdateSelectedFolder,
  fnRefreshFoldersAndFiles
} from 'composables/files/useFiles'

const $q = useQuasar()

const mkdir = () => {
  $q.dialog({ component: AddFolder }).onOk(async (name) => {
    $q.loading.show()
    await fnMakeFolder(name)
    $q.laoding.hide()
  })
}

const uploader = () => {
  $q.dialog({
    component: UploadFile,
    componentProps: { folder: selectedFolder.value }
  }).onOk(async () => {
    $q.loading.show()
    await fnRefreshFoldersAndFiles()
    $q.loading.hide()
  })
}

const downloader = async () => {
  if (!selectedFiles.value.length) return
  $q.loading.show()
  await fnFileDownload()
  $q.loading.hide()
}

const rename = () => {
  if (!selectedFile.value.length) return
  $q.dialog({
    component: RenameFile,
    componentProps: { current: selectedFiles.value[0] }
  }).onOk(async (obj) => {
    $q.loading.show()
    await fnRenameFile()
    $q.loading.hide()
  })
}

const selectedDel = async () => {
  if (!selectedFiles.value.length) return
  $q.loading.show()
  await fnDeleteFiles(selectedFile.value)
  $q.loading.hide()
}
</script>

<template>
  <div class="q-px-md q-py-sm row items-center bg-grey-2">
    <div class="row no-wrap items-center q-gutter-x-sm full-width">
      <q-icon name="folder" size="20px" color="primary" />
      <span class="text-h6">Files</span>
      <q-space />
      <div class="row no-wrap">
        <q-btn round flat icon="create_new_folder" color="primary" size="sm" @click="mkdir">
          <q-tooltip>New Folder</q-tooltip>
        </q-btn>
        <q-btn round flat icon="upload" color="primary" size="sm" @click="uploader">
          <q-tooltip>File upload</q-tooltip>
        </q-btn>
        <q-btn round flat icon="download" color="primary" size="sm" @click="downloader">
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
        <q-btn round flat icon="delete_outline" color="red" size="sm" @click="selectedDel">
          <q-tooltip>Delete</q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
