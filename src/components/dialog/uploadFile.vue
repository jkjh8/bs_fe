<script setup>
import { useDialogPluginComponent, useQuasar } from 'quasar'
import { apiUrl } from 'boot/axios'

const { dialogRef, onDialogCancel, onDialogHide, onDialogOK } = useDialogPluginComponent()

const props = defineProps({
  folder: String
})

const $q = useQuasar()

function onRejected(rejectedEntries) {
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`
  })
}
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-uploader
      class="uploader"
      style="border-radius: 0.6rem"
      multiple
      :url="`${apiUrl}/files`"
      accept="audio/*"
      :headers="[{ name: 'folder', value: encodeURIComponent(folder) }]"
      @rejected="onRejected"
      @finish="onDialogOK"
    >
      <template #header="scope">
        <div class="row no-wrap items-center q-pa-sm q-gutter-x-xs">
          <!-- clear all btn -->
          <q-btn
            v-if="scope.queuedFiles.length > 0"
            round
            flat
            icon="clear_all"
            size="sm"
            @click="scope.removeQueuedFiles"
          >
            <q-tooltip>Clear All</q-tooltip>
          </q-btn>
          <!-- remove uploaded files -->
          <q-btn v-if="scope.uploadedFiles.length > 0" round flat icon="done_all" size="sm">
            <q-tooltip>Remove Uploaded Files</q-tooltip>
          </q-btn>
          <!-- is uploading -->
          <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
          <!-- Name Tag -->
          <div class="col q-px-sm">
            <div class="q-uploader__title">Upload Files</div>
            <div class="q-uploader__subtitle">
              {{ scope.uploadSizeLabel }} / {{ scope.uploadProgressLabel }}
            </div>
          </div>
          <!-- add files -->
          <q-btn
            v-if="scope.canAddFiles"
            round
            flat
            type="a"
            icon="add_box"
            size="sm"
            @click="scope.pickFiles"
          >
            <q-uploader-add-trigger />
            <q-tooltip>Pick Files</q-tooltip>
          </q-btn>
          <!-- upload files -->
          <q-btn v-if="scope.canUpload" round dense flat icon="cloud_upload" @click="scope.upload">
            <q-tooltip>Upload Files</q-tooltip>
          </q-btn>
          <!-- abort upload -->
          <q-btn v-if="scope.isUploading" round flat icon="clear" size="sm" @click="scope.abort">
            <q-tooltip>Abort Upload</q-tooltip>
          </q-btn>
          <!-- close dialog -->
          <q-btn round flat color="blue-grey-2" icon="close" size="sm" @click="onDialogOK">
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </div>
      </template>
    </q-uploader>
  </q-dialog>
</template>

<style scoped></style>
