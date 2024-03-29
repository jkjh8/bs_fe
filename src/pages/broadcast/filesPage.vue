<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar, format } from 'quasar'
// components
import FileHeader from 'src/components/files/filesHeader'
import FolderTree from 'src/components/files/folderTree.vue'
import FilesTable from 'src/components/files/filesTable'
import PreviewFile from 'src/components/previewFile'
// composables
import {
  files,
  folders,
  selectedFiles,
  selectedFolder,
  fnUpdateSelectedFolder,
  fnRefreshFoldersAndFiles
} from 'composables/files/useFiles'

import { fnStartPreview, fnInitAudioPlayer } from 'composables/files/usePreview'

const splitterModel = ref(20)
// initialize
const $q = useQuasar()
// lifecycle hooks
onMounted(async () => {
  $q.loading.show()
  await fnRefreshFoldersAndFiles()
  fnInitAudioPlayer()
  $q.loading.hide()
})
</script>

<template>
  <div class="q-pa-md">
    <div class="borderd">
      <!-- title -->
      <FileHeader />
      <!-- table -->
      <div>
        <q-splitter v-model="splitterModel">
          <template v-slot:before>
            <FolderTree
              class="q-pa-sm"
              :folders="folders"
              :selected="selectedFolder"
              @update:selected="fnUpdateSelectedFolder"
            />
          </template>
          <template v-slot:after>
            <FilesTable
              :files="files"
              :selectedFiles="selectedFiles"
              @update:selected="(v) => (selectedFiles = v)"
              @update:folder="fnUpdateSelectedFolder"
              @update:preview="fnStartPreview"
            />
          </template>
        </q-splitter>
      </div>
    </div>
  </div>
  <PreviewFile />
</template>
src/composables/files/useFiles
<style scoped></style>
