<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { storeToRefs } from 'pinia'

import { useQsysStore } from 'src/stores/qsys'

const { qsysDevices } = storeToRefs(useQsysStore())
const { getQsysDevices } = useQsysStore()

const fnVolumeUp = async (deviceId, zone, value) => {
  await api.put('/devices/qsys/volume', {
    deviceId,
    zone,
    value: value + 1
  })
}
const fnVolumeDown = (deviceId, zone, value) => {}

onMounted(async () => {
  await getQsysDevices()
})
</script>

<template>
  <div class="q-pa-md">
    <div class="borderd">
      <!-- title -->
      <div class="q-px-lg q-py-sm row items-center bg-grey-2">
        <div class="row no-wrap items-center q-gutter-x-sm">
          <q-icon name="map" size="20px" color="primary" />
          <span class="text-h6">Zone Setup</span>
        </div>
        <q-space />
        <q-btn
          round
          flat
          icon="refresh"
          color="primary"
          @click="getQsysDevices"
        >
          <q-tooltip>Refresh Devices</q-tooltip>
        </q-btn>
      </div>
      <!-- devices -->
      <div>
        <q-list>
          <!-- locations -->
          <q-expansion-item
            v-for="(device, idx) in qsysDevices"
            :key="idx"
            header-class="q-px-lg bg-blue-grey-1"
          >
            <!-- header -->
            <template #header>
              <q-item-section avatar>
                <q-icon
                  :color="device.connected ? 'primary' : 'red-10'"
                  name="location_on"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label class="q-gutter-x-sm">
                  <span>
                    {{ device.name }}
                  </span>
                </q-item-label>
                <q-item-label caption>{{ device.ipaddress }}</q-item-label>
              </q-item-section>
            </template>
            <!-- zones -->
            <div class="q-px-md q-ml-lg">
              <div
                v-for="zone in device.ZoneStatus"
                :key="zone.Zone"
                class="row no-wrap items-center q-px-sm"
              >
                <!-- zone name tag -->
                <div class="row no-wrap items-center q-gutter-x-lg">
                  <q-avatar color="grey-2" size="26px">{{
                    zone.Zone
                  }}</q-avatar>
                  <div>
                    <div class="q-gutter-x-sm">
                      <span>
                        {{ zone.name ? zone.name : 'No Name' }}
                      </span>
                      <q-btn round flat icon="edit" color="primary" size="sm">
                        <q-tooltip>Edit Name</q-tooltip>
                      </q-btn>
                    </div>
                    <div class="text-caption text-grey">
                      Zone {{ zone.Zone }}
                    </div>
                  </div>

                  <!-- destination -->
                  <div class="q-ml-xl q-gutter-x-sm text-caption text-grey">
                    <div>Destination</div>
                    <div>
                      {{ zone.destination ? zone.destination : 'Local' }}
                    </div>
                  </div>
                  <q-btn round flat icon="edit" color="primary" size="sm">
                    <q-tooltip>Edit Destination</q-tooltip>
                  </q-btn>
                </div>

                <q-space />

                <div class="row no-wrap items-center">
                  <!-- gain -->
                  <div class="row no-wrap">
                    <div class="row no-wrap items-center q-gutter-x-xs">
                      <div class="gain">{{ zone.gain }}</div>
                      <div
                        class="fit column no-wrap justify-start items-start content-start"
                      >
                        <q-btn
                          class="btn"
                          flat
                          icon="keyboard_arrow_up"
                          size="xs"
                          @click="
                            volumeup(device.deviceId, zone.Zone, zone.gain)
                          "
                        />
                        <q-btn
                          class="btn"
                          flat
                          icon="keyboard_arrow_down"
                          size="xs"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- mute -->
                  <q-btn
                    round
                    flat
                    :icon="zone.mute ? 'volume_off' : 'volume_up'"
                    :color="zone.mute ? 'red' : 'primary'"
                  >
                    <q-tooltip>Mute</q-tooltip>
                  </q-btn>
                </div>
              </div>
            </div>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  width: 10px;
}
</style>
