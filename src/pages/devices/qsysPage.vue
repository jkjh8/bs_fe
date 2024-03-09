<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
// components
import Table from 'components/devices/deviceTable.vue'
import deviceAdd from 'components/dialog/qsysAdd.vue'
import ConfirmDialog from 'components/dialog/confirmDialog'

// composables
import { qsys, fnGetQsys } from 'src/composables/qsys/useQsys.js'

// initialize
const $q = useQuasar()

// variables
const filter = ref('')
const rows = ref([])
const loading = ref(false)
// functions
const openDialogQSysAdd = () => {
  // add qsys device
  $q.dialog({
    component: deviceAdd
  }).onOk(async (item) => {
    console.log(item)
    $q.loading.show()
    const r = await api.post('/devices/qsys', { ...item })
    $q.loading.hide()
    if (r && r.data) {
      fnGetQsys()
    }
    // TODO: send devices data bridge
  })
}

const openDialogQSysRemove = (args) => {
  $q.dialog({
    component: ConfirmDialog,
    componentProps: {
      icon: 'delete',
      iconColor: 'red',
      title: 'Remove Q-SYS Device',
      message: `Are you sure to remove ${args.name}:${args.ipaddress}-${args.deviceId}?`
    }
  }).onOk(async () => {
    $q.loading.show()
    await api.delete('/devices/qsys', { data: { ...args } })
    $q.loading.hide()
    getQsys()
    // TODO: send devices data bridge
  })
}

onMounted(() => {
  fnGetQsys()
})
</script>

<template>
  <div class="q-pa-md">
    <div class="borderd">
      <!-- title -->
      <div class="q-px-lg q-py-sm row items-center bg-grey-2">
        <div class="row no-wrap items-center q-gutter-x-sm">
          <q-icon name="img:qsys-logo.svg" size="20px" color="primary" />
          <span class="text-h6">Q-SYS</span>
          <q-icon
            class="cursor-pointer"
            name="add_circle"
            color="primary"
            size="sm"
            @click="openDialogQSysAdd"
          />
        </div>
        <q-space />
        <q-input v-model="filter" borderless dense debounce="300" clearable placeholder="Search">
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <!-- table -->
      <q-table
        flat
        :filter="filter"
        :loading="loading"
        :rows="qsys"
        :columns="[
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
        ]"
      >
        <template #body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="deviceId" :props="props">
              {{ props.row.deviceId }}
            </q-td>
            <q-td key="ipaddress" :props="props">
              <a :href="`http://${props.row.ipaddress}`" target="_blank">{{
                props.row.ipaddress
              }}</a>
            </q-td>
            <q-td key="actions" :props="props">
              <div>
                <q-btn
                  round
                  flat
                  color="red-10"
                  size="sm"
                  icon="delete"
                  @click="openDialogQSysRemove(props.row)"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<style scoped></style>
