<script setup>
import { useSetupFunc } from 'composables/setup/useSetupFunc'
import { useQsysFunc } from 'composables/qsys/useQsysFunc'
const props = defineProps(['device'])
const { fnSTrs } = useQsysFunc()
</script>

<template>
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

<style scoped></style>
