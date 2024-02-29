<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar, format } from 'quasar'
// store
import { storeToRefs } from 'pinia'
import { useFilesStore } from 'src/stores/files'
import { usePreviewStore } from 'src/stores/preview.js'
// components
import FileHeader from 'src/components/files/filesHeader'
import FolderTree from 'src/components/files/folderTree.vue'
import FilesTable from 'src/components/files/filesTable'
import PreviewFile from 'src/components/previewFile'
// variables
const { files, folders, selectedFolder, selectedFiles } = storeToRefs(useFilesStore())
const { modal, previewFile } = storeToRefs(usePreviewStore())
const { refreshFoldersAndFiles, updateSelectedFolder } = useFilesStore()

const selectedPreview = ref(null)
const selected = ref([])
const splitterModel = ref(20)
// initialize
const $q = useQuasar()
// functions
function startPreview(file) {
  previewFile.value = file
  modal.value = true
  usePreviewStore().setSource()
}
// lifecycle hooks
onMounted(async () => {
  $q.loading.show()
  await refreshFoldersAndFiles()
  $q.loading.hide()
  usePreviewStore().initAudioPlayer()
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
              @update:selected="updateSelectedFolder"
            />
          </template>
          <template v-slot:after>
            <FilesTable
              :files="files"
              :selectedFiles="selectedFiles"
              @update:selected="(v) => (selectedFiles = v)"
              @update:folder="updateSelectedFolder"
              @update:preview="startPreview"
            />
          </template>
        </q-splitter>
      </div>
    </div>
  </div>
  <PreviewFile />
</template>

<style scoped></style>
