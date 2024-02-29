<script setup>
import { storeToRefs } from 'pinia'
import { useFilesStore } from 'src/stores/files'
const {
  getFolders,
  getFiles,
  updateSelectedFolder,
  deleteFiles,
  makeFolder,
  fileUpload,
  removeFile,
  fileDownload,
  renameFile,
  refreshFoldersAndFiles
} = useFilesStore()
</script>

<template>
  <div class="q-px-md q-py-sm row items-center bg-grey-2">
    <div class="row no-wrap items-center q-gutter-x-sm full-width">
      <q-icon name="folder" size="20px" color="primary" />
      <span class="text-h6">Files</span>
      <q-space />
      <div class="row no-wrap">
        <q-btn round flat icon="create_new_folder" color="primary" size="sm" @click="makeFolder">
          <q-tooltip>New Folder</q-tooltip>
        </q-btn>
        <q-btn round flat icon="upload" color="primary" size="sm" @click="fileUpload">
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
          @click="renameFile"
        >
          <q-tooltip>File rename</q-tooltip>
        </q-btn>
        <q-btn round flat icon="delete_outline" color="red" size="sm" @click="removeFile">
          <q-tooltip>Delete</q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
