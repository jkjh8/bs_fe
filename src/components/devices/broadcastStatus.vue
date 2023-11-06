<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useQsysStore } from 'src/stores/qsys'

// initialize
const $q = useQuasar()
const { qsysDevices } = storeToRefs(useQsysStore())
const { getQsysDevvices } = useQsysStore()
</script>

<template>
  <q-list>
    <q-expansion-item v-for="(device, idx) in qsysDevices" :key="idx">
      <template #header>
        <q-item-section avatar>
          <q-icon
            :color="device.connected ? 'primary' : 'ref-10'"
            name="location_on"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ device.name }}
          </q-item-label>
          <q-item-label caption>
            {{ device.ipaddress }}
          </q-item-label>
        </q-item-section>
      </template>
    </q-expansion-item>
  </q-list>
</template>

<style scoped></style>
