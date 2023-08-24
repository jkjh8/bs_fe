<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
// components
import DeviceAddDialog from 'src/components/dialog/deviceAddDialog'
import ConfirmDeialog from 'src/components/dialog/confirmDialog'
// composables
import columns from 'src/composables/columns/devices'
// stores
import { useDevicesStore } from '/src/stores/devices.js'

// variables
const $q = useQuasar()
const devicesStore = useDevicesStore()
const devices = computed(() => devicesStore.devices)
const filter = ref('')
// functions
const openDialogForAddDevice = () => {
  $q.dialog({
    component: DeviceAddDialog
  }).onOk(async (device) => {
    await devicesStore.addDevice(device)
    await devicesStore.updateDevices()
  })
}

const openDialogForRemove = (props) => {
  $q.dialog({
    component: ConfirmDeialog,
    componentProps: {
      icon: 'delete',
      iconColor: 'red',
      title: 'Delete device',
      message: `Name: ${props.name}, IP_Address: ${props.ipaddress}`
    }
  }).onOk(async () => {
    await devicesStore.removeDevice(props._id)
  })
}
// lifecycle hooks
onMounted(async () => {
  $q.loading.show()
  devicesStore.updateDevices()
  $q.loading.hide()
})
</script>

<template>
  <div class="page">
    <div class="form">
      <div class="q-mx-lg row items-center">
        <q-icon name="dns" size="20px" color="primary" />
        <span class="text-h6">Devices</span>
        <q-btn
          round
          flat
          icon="add_circle"
          color="primary"
          @click="openDialogForAddDevice"
        />
        <q-space />
        <q-input
          v-model="filter"
          borderless
          dense
          debounce="300"
          clearable
          placeholder="Search"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <q-table flat :columns="columns" :rows="devices" :filter="filter">
        <template #body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="deviceId" :props="props">
              {{ props.row.deviceId }}
            </q-td>
            <q-td key="ipaddress" :props="props">
              <a :href="`http://${props.row.ipaddress}`">{{
                props.row.ipaddress
              }}</a>
            </q-td>
            <q-td key="deviceType" :props="props">
              <div>{{ props.row.deviceType.deviceType }}</div>
              <div class="caption">{{ props.row.deviceType.model }}</div>
            </q-td>
            <q-td key="actions" :props="props">
              <div>
                <q-btn
                  round
                  flat
                  color="red-10"
                  size="sm"
                  icon="delete"
                  @click="openDialogForRemove(props.row)"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 20px;
}
.form {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px 0px;
}
.caption {
  font-size: 10px;
}
</style>
