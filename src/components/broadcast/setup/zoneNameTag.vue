<script setup>
import { useSetupFunc } from 'composables/setup/useSetupFunc'
const props = defineProps(['zone', 'device'])

const { modifyZoneName } = useSetupFunc()
</script>

<template>
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
</template>

<style scoped></style>
