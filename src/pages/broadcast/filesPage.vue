<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar, format } from 'quasar'
// components
import FileHeader from 'src/components/files/filesHeader'
import FileSelect from 'components/files/fileSelect'
import PreviewFile from 'src/components/previewFile'
// composables
import { selectedFiles } from 'composables/files/useFiles'
import { fnInitAudioPlayer, fnStartPreview } from 'composables/files/usePreview'
// initialize
// lifecycle hooks
onMounted(async () => {
  fnInitAudioPlayer()
})
</script>

<template>
  <div class="q-pa-md">
    <div class="borderd">
      <!-- title -->
      <FileHeader />
      <!-- table -->
      <fileSelect
        selection="multiple"
        :dialog="false"
        :selected="selectedFiles"
        @update:preview="fnStartPreview"
        @update:selected="(v) => (selectedFiles = v)"
      />
    </div>
  </div>
  <PreviewFile />
</template>
<style scoped></style>
