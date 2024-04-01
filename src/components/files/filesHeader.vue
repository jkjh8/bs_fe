<script setup>
import { useQuasar } from 'quasar'
// composables
import { useFileFunc } from 'src/composables/files/useFileFunc.js'

const { fnMkDir, fnFileUP, fnFileDN, fnFileRename, fnFileDel } = useFileFunc()
const $q = useQuasar()
</script>

<template>
  <div class="q-px-md q-py-sm row items-center bg-grey-2">
    <div class="row no-wrap items-center q-gutter-x-sm full-width">
      <q-icon name="folder" size="20px" color="primary" />
      <span class="text-h6">Files</span>
      <q-space />
      <div class="row no-wrap">
        <q-btn round flat icon="create_new_folder" color="primary" size="sm" @click="fnMkDir">
          <q-tooltip>New Folder</q-tooltip>
        </q-btn>
        <q-btn round flat icon="upload" color="primary" size="sm" @click="fnFileUP">
          <q-tooltip>File upload</q-tooltip>
        </q-btn>
        <q-btn round flat icon="download" color="primary" size="sm" @click="fnFileDN">
          <q-tooltip>File download</q-tooltip>
        </q-btn>
        <q-separator vertical spaced inset />
        <q-btn
          round
          flat
          icon="drive_file_rename_outline"
          fnFileDel
          color="primary"
          size="sm"
          @click="fnFileRename"
        >
          <q-tooltip>File rename</q-tooltip>
        </q-btn>
        <q-btn round flat icon="delete_outline" color="red" size="sm" @click="fnFileDel">
          <q-tooltip>Delete</q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
