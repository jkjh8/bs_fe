<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
// components
import ZoneStatus from './zoneStatus'
// composables
import { qsys, fnGetQsys } from 'composables/qsys/useQsys.js'
// initialize
const $q = useQuasar()
import { fnCheckActiveZones } from 'composables/status/useStatus.js'

onMounted(async () => {
  await fnGetQsys()
})
</script>

<template>
  <q-list>
    <q-expansion-item v-for="(device, idx) in qsys" :key="idx" header-class="bg-grey-1">
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
            {{ fnCheckActiveZones(device.ZoneStatus) }}
            <span>지역 방송중</span>
          </div>
        </q-item-section>
      </template>
      <ZoneStatus :zones="device.ZoneStatus" />
    </q-expansion-item>
  </q-list>
</template>

<style scoped></style>
