<script setup>
import { ref } from 'vue'

const splitterModel = ref(30)
</script>

<template>
  <div class="q-pa-md">
    <div class="borderd">
      <div class="q-px-lg q-py-sm row items-center bg-grey-2">
        <div class="row no-wrap items-center q-gutter-x-sm">
          <q-icon name="schedule" size="20px" color="primary" />
          <span class="text-h6">예약 방송</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
