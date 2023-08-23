<script setup>
import { ref, onMounted, computed } from 'vue'
// composables
import columns from 'src/composables/columns/devices'
// stores
import { useDevicesStore } from '/src/stores/devices.js'

const devicesStore = useDevicesStore()
const devices = computed(() => devicesStore.devices)
</script>

<template>
  <div class="page">
    <div class="form">
      <div class="text-h6 q-ml-lg">Devices</div>
      <q-table flat :columns="columns" :rows="devices"></q-table>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 20px;
}
.form {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px 0px;
}
</style>
