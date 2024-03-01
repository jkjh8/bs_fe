<script setup>
// components
import DeleteTempFiles from 'src/components/admin/management/deleteTempFile.vue'
</script>

<template>
  <div class="q-pa-md">
    <div class="borderd">
      <!-- title -->
      <div class="q-px-lg q-py-sm row no-wrap items-center bg-grey-2">
        <q-icon name="dns" size="20px" color="primary" />
        <div class="text-h6 q-ml-sm">서버 관리</div>
      </div>
      <div class="q-pa-lg q-gutter-y-sm">
        <!-- remove temp file -->
        <DeleteTempFiles />
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
