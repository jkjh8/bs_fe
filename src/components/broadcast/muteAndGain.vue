<script setup>
import { fnVolumeUp, fnVolumeDn, fnMute } from 'src/composables/qsys/useVol.js'
const props = defineProps({
  zone: Object,
  deviceId: String
})
</script>

<template>
  <div class="row no-wrap items-center">
    <!-- gain -->
    <div class="row no-wrap">
      <div class="row no-wrap items-center q-gutter-x-xs">
        <div class="gain">{{ zone.gain }}</div>
        <div class="fit column no-wrap justify-start items-start content-start">
          <q-btn
            class="btn"
            flat
            icon="keyboard_arrow_up"
            size="xs"
            @click="fnVolumeUp(deviceId, zone.Zone)"
          />
          <q-btn
            class="btn"
            flat
            icon="keyboard_arrow_down"
            size="xs"
            @click="fnVolumeDn(deviceId, zone.Zone)"
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
      @click="fnMute(device.deviceId, zone.Zone, zone.mute ? 0 : 1)"
    >
      <q-tooltip>Mute</q-tooltip>
    </q-btn>
  </div>
</template>

<style scoped></style>
