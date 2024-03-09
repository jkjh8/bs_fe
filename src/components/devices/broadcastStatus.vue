<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
// components
import ZoneStatus from 'src/components/devices/zoneStatus'
// composables
import { qsys, fnGetQsys } from 'composables/qsys/useQsys.js'
// initialize
const $q = useQuasar()

function checkActiveZones(zones) {
  const activeZones = 0
  for (let i = 0; i < zones.length; i++) {
    if (zones[i].Active) {
      activeZones = activeZones + 1
    }
  }
  return activeZones
}

onMounted(async () => {
  await fnGetQsys()
})
</script>

<template>
  <q-list>
    <q-expansion-item v-for="(device, idx) in qsys" :key="idx">
      <template #header>
        <q-item-section avatar>
          <q-icon :color="device.connected ? 'primary' : 'ref-10'" name="location_on" />
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
          <div class="row q-gutter-x-sm">
            {{ checkActiveZones(device.ZoneStatus) }}
            <span>지역 방송중</span>
          </div>
        </q-item-section>
      </template>
      <ZoneStatus :zones="device.ZoneStatus" />
    </q-expansion-item>
  </q-list>
</template>

<style scoped></style>
