<script setup>
const props = defineProps(['rows', 'filter', 'loading', 'deviceType'])
const emits = defineEmits(['remove'])
const columns = [
  {
    name: 'name',
    label: 'Name',
    align: 'center',
    field: 'name',
    sortable: true
  },
  {
    name: 'deviceId',
    label: 'Device ID',
    align: 'center',
    field: 'deviceId',
    sortable: true
  },
  {
    name: 'ipaddress',
    label: 'IP Address',
    align: 'center',
    field: 'ipaddress',
    sortable: true
  },
  {
    name: 'actions',
    label: 'FN',
    align: 'center'
  }
]

const checkBarixStatus = (device) => {
  if (device.status) {
    if (device.streamurl) {
      return 'green-5'
    } else {
      return 'yellow'
    }
  } else {
    return 'red-10'
  }
}
</script>

<template>
  <q-table flat :filter="filter" :loading="loading" :rows="rows" :columns="columns">
    <template #body="props">
      <q-tr :props="props">
        <q-td key="name" :props="props">
          <!-- 큐시스 상태 체크 -->
          <q-badge
            v-if="deviceType === 'qsys'"
            rounded
            :color="props.row.connected ? 'green-5' : 'red-10'"
          />
          <!-- 바릭스 상태 체크 -->
          <q-badge v-if="deviceType === 'barix'" rounded :color="checkBarixStatus(props.row)" />
          {{ props.row.name }}
        </q-td>
        <q-td key="deviceId" :props="props">
          {{ props.row.deviceId }}
        </q-td>
        <q-td key="ipaddress" :props="props">
          <a :href="`http://${props.row.ipaddress}`" target="_blank">{{ props.row.ipaddress }}</a>
        </q-td>
        <q-td key="actions" :props="props">
          <div>
            <q-btn
              round
              flat
              color="red-10"
              size="sm"
              icon="delete"
              @click="emits('remove', props.row)"
            />
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<style scoped>
.badge {
  width: 10px;
  height: 10px;
  background-color: red;
}
</style>
