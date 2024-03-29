<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

import SelectZone from 'components/dialog/zones/selectBarix.vue'
import { useSetupFunc } from 'composables/setup/useSetupFunc'
import { qsys, fnGetQsys } from 'composables/qsys/useQsys.js'
import { useQsysFunc } from 'composables/qsys/useQsysFunc'
import { fnVolumeUp, fnVolumeDn, fnMute } from 'composables/qsys/useVol.js'

const { modifyZoneName } = useSetupFunc()
const { fnSTrs } = useQsysFunc()

const $q = useQuasar()

const selectZone = (obj) => {
  const { device, zone } = obj
  $q.dialog({ component: SelectZone, componentProps: { zone: zone } }).onOk(async (args) => {
    await api.put('/devices/qsys/zoneupdate', {
      deviceId: device.deviceId,
      zone: zone.Zone,
      destination: args.selected,
      ipaddress: args.ipaddress
    })
    await fnGetQsys()
  })
}
</script>

<template>
  <q-list>
    <!-- locations -->
    <q-expansion-item v-for="(device, idx) in qsys" :key="idx" header-class="q-px-lg bg-grey-1">
      <!-- header -->
      <template #header>
        <q-item-section avatar>
          <q-icon :color="device.connected ? 'primary' : 'red-10'" name="location_on" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="q-gutter-x-sm">
            <span>
              {{ device.name }}
            </span>
            <span>
              <q-icon name="refresh" color="primary" @click.prevent.stop="fnSTrs(device)"></q-icon>
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
            <q-avatar color="grey-2" size="26px">{{ zone.Zone }}</q-avatar>
            <div style="width: 150px">
              <div class="q-gutter-x-sm">
                <span>
                  {{ zone.name ? zone.name : 'No Name' }}
                </span>
                <!-- modify zone name -->
                <q-btn
                  round
                  flat
                  icon="edit"
                  color="primary"
                  size="sm"
                  @click="modifyZoneName(zone.name, zone.Zone, device.deviceId)"
                >
                  <q-tooltip>Edit Name</q-tooltip>
                </q-btn>
              </div>
              <div class="text-caption text-grey">Zone {{ zone.Zone }}</div>
            </div>

            <!-- destination -->
            <div class="q-ml-xl q-gutter-x-sm text-caption text-grey justify-start">
              <div>오디오 출력 디바이스</div>
              <div class="text-black">
                <div v-if="zone.destination" class="q-gutter-x-sm">
                  <span>{{ zone.destination.name }}</span>
                  <span>{{ zone.destination.ipaddress }}</span>
                </div>
                <div v-else>Local</div>
              </div>
            </div>
            <q-btn
              round
              flat
              icon="edit"
              color="primary"
              size="sm"
              @click="selectZone({ device, zone })"
            >
              <q-tooltip>Edit Destination</q-tooltip>
            </q-btn>
          </div>

          <q-space />
          <div class="row no-wrap items-center">
            <!-- gain -->
            <div class="row no-wrap">
              <div
                class="row no-wrap justify-center items-center q-gutter-x-xs"
                style="width: 70px"
              >
                <div class="text-grey q-pr-sm">VOL</div>
                <div class="row justify-center">
                  <div>
                    {{ zone.gain }}
                  </div>
                </div>
              </div>
              <div class="column no-wrap">
                <q-btn
                  class="btn"
                  flat
                  icon="keyboard_arrow_up"
                  size="xs"
                  @click="fnVolumeUp(device.deviceId, zone.Zone)"
                />
                <q-btn
                  class="btn"
                  flat
                  icon="keyboard_arrow_down"
                  size="xs"
                  @click="fnVolumeDn(device.deviceId, zone.Zone)"
                />
              </div>
            </div>
            <!-- mute -->
            <q-btn
              round
              flat
              :icon="zone.mute ? 'volume_off' : 'volume_up'"
              :color="zone.mute ? 'red' : 'primary'"
              @click="fnMute(device.deviceId, zone.Zone, zone.mute ? 0 : 1)"
            >
              <q-tooltip>Mute</q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
    </q-expansion-item>
  </q-list>
</template>

<style scoped></style>
