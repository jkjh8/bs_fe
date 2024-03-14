<script setup>
import { useQuasar } from 'quasar'
import SelectZone from 'components/dialog/zones/selectBarix.vue'
import { api } from 'boot/axios'
import { fnGetQsys } from 'composables/qsys/useQsys'

const props = defineProps({ zone: Object, device: Object })
const $q = useQuasar()

const selectZone = () => {
  $q.dialog({ component: SelectZone, componentProps: { zone: props.zone } }).onOk(
    async (selected) => {
      await api.put('/devices/qsys/zoneupdate', {
        id: props.device._id,
        zone: props.zone.Zone,
        destination: selected
      })
      await fnGetQsys()
    }
  )
}
</script>

<template>
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
  <q-btn round flat icon="edit" color="primary" size="sm" @click="selectZone(zone)">
    <q-tooltip>Edit Destination</q-tooltip>
  </q-btn>
</template>

<style scoped></style>
