<script setup>
import { onMounted } from 'vue'
// components
// composables
import { qsys, fnGetQsys } from 'composables/qsys/useQsys.js'
import { fnCheckActiveZones, fnCheckPriority } from 'composables/status/useStatus.js'
// initialize

const fnCkColor = (barix) => {
  console.log(barix)
  if (barix && barix.status) {
    if (barix.streamurl) return 'green'
    return 'yellow'
  } else {
    return 'red'
  }
}

onMounted(async () => {
  await fnGetQsys()
})
</script>

<template>
  <q-list>
    <q-expansion-item v-for="(device, idx) in qsys" :key="idx" header-class="bg-grey-1">
      <!-- header -->
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
      <!-- body -->
      <div class="row q-pa-md q-gutter-sm">
        <div v-for="(zone, idx) in device.ZoneStatus" :key="idx">
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
                  <q-icon name="circle" :color="fnCkColor(zone.destination)" />
                </div>
                <div>{{ zone.destination.ipaddress }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-expansion-item>
  </q-list>
</template>

<style scoped>
.led {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: v-bind('color');
}
</style>
