<script setup>
import { onMounted } from 'vue'
// component
import DeviceSetup from 'components/broadcast/setup/setupExpansion.vue'
// composables
import { fnGetQsys } from 'src/composables/qsys/useQsys.js'

onMounted(async () => {
  await fnGetQsys()
})
</script>

<template>
  <div class="q-pa-md">
    <div class="borderd">
      <!-- title -->
      <div class="q-px-lg q-py-sm row items-center bg-grey-2">
        <div class="row no-wrap items-center q-gutter-x-sm">
          <q-icon name="map" size="20px" color="primary" />
          <span class="text-h6 text-bold">방송구간설정</span>
        </div>
        <q-space />
        <q-btn round flat icon="refresh" color="primary" @click="fnGetQsys">
          <q-tooltip>Refresh Devices</q-tooltip>
        </q-btn>
      </div>
      <!-- devices -->
      <div>
        <DeviceSetup />
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  width: 10px;
}
</style>
