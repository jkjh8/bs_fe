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
      <div class="row no-wrap justify-center items-center q-gutter-x-xs" style="width: 70px">
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
    <!-- mute -->
    <q-btn
      round
      flat
      :icon="zone.mute ? 'volume_off' : 'volume_up'"
      :color="zone.mute ? 'red' : 'primary'"
      @click="fnMute(deviceId, zone.Zone, zone.mute ? 0 : 1)"
    >
      <q-tooltip>Mute</q-tooltip>
    </q-btn>
  </div>
</template>

<style scoped>
.gain {
  width: 20px;
}
</style>
