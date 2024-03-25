<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

import DeviceHeader from 'components/broadcast/setup/deviceHeader.vue'
import ZoneNameTag from 'components/broadcast/setup/zoneNameTag.vue'

import SelectZone from 'components/dialog/zones/selectBarix.vue'
import MuteAndGain from 'components/broadcast/muteAndGain.vue'
import Destination from 'components/broadcast/destinationView.vue'

import { qsys, fnGetQsys } from 'src/composables/qsys/useQsys.js'

const $q = useQuasar()

// dialogs
const modifyZoneName = (name, zone, deviceId) => {
  $q.dialog({
    component: ZoneNameDialog,
    componentProps: {
      currentName: name,
      zone: zone
    }
  }).onOk(async (modifiedName) => {
    $q.loading.show()
    const r = await api.put('/devices/qsys/modifiedzonename', {
      deviceId,
      zone,
      name: modifiedName
    })
    // useQsysStore().updateQsysDevices(r.data.devices)
    $q.loading.hide()
  })
}
</script>

<template>
  <q-list>
    <!-- locations -->
    <q-expansion-item v-for="(device, idx) in qsys" :key="idx" header-class="q-px-lg bg-grey-1">
      <!-- header -->
      <template #header>
        <DeviceHeader :device="device" />
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
            <ZoneNameTag :zone="zone" :device="device" />

            <!-- destination -->
            <Destination :zone="zone" :device="device" />
          </div>

          <q-space />
          <MuteAndGain :zone="zone" :deviceId="device.deviceId" />
        </div>
      </div>
    </q-expansion-item>
  </q-list>
</template>

<style scoped></style>
