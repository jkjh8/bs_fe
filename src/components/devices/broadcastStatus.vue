<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useQsysStore } from 'src/stores/qsys'
import ZoneStatus from 'src/components/devices/zoneStatus'

// initialize
const $q = useQuasar()
const { qsysDevices } = storeToRefs(useQsysStore())
const { getQsysDevices } = useQsysStore()

function checkActiveZones(zones) {
  console.log(zones)
  const activeZones = 0
  for (let i = 0; i < zones.length; i++) {
    if (zones[i].Active) {
      activeZones = activeZones + 1
    }
  }
  return activeZones
}

onMounted(async () => {
  await getQsysDevices()
})
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
        <q-item-section side>
          Zones
          <div>
            {{ checkActiveZones(device.ZoneStatus) }}
          </div>
        </q-item-section>
      </template>
      <ZoneStatus :zones="device.ZoneStatus" />
    </q-expansion-item>
  </q-list>
</template>

<style scoped></style>
