<script setup>
// components
import DeleteTempFiles from 'src/components/admin/management/deleteTempFile.vue'
import TTSServerAddr from 'src/components/admin/management/ttsServerAddr.vue'
import TCPServerPort from 'src/components/admin/management/tcpServerPort.vue'
import GainStep from 'src/components/admin/management/gainStep.vue'
</script>

<template>
  <div class="q-pa-md">
    <div class="borderd">
      <!-- title -->
      <div class="q-px-lg q-py-sm row no-wrap items-center bg-grey-2">
        <q-icon name="dns" size="20px" color="primary" />
        <div class="q-ml-sm title">서버 관리</div>
      </div>
      <div class="q-pa-lg q-gutter-y-sm">
        <!-- remove temp file -->
        <DeleteTempFiles />
        <TTSServerAddr />
        <TCPServerPort />
        <GainStep />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 20px;
}
.list {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px 20px;
}
</style>
