<script setup>
import LEDInd from './ledIndicator'
import { fnCheckPriority } from 'composables/status/useStatus.js'

const props = defineProps(['zones'])
</script>

<template>
  <div class="row q-pa-md q-gutter-sm">
    <div v-for="(zone, idx) in zones" :key="idx">
      <div
        class="borderd q-pa-md q-gutter-sx"
        :class="zone.Active ? fnCheckPriority(zone.Priority) : ''"
      >
        <div class="text-bold">
          <span> {{ zone.Zone }}. </span>
        </div>
        <div class="">{{ zone.name ?? 'No Name' }}</div>
        <div v-if="zone.destination">
          <div>
            <q-separator class="q-my-sm" />
          </div>
          <div class="column items-end text-caption">
            <div class="row q-gutter-x-xs">
              {{ zone.destination.name }}
              <LEDInd :barix="zone.destination" />
            </div>
            <div>{{ zone.destination.ipaddress }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
