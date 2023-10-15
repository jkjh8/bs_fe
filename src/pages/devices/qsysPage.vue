<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
// components
import Table from 'src/components/devices/deviceTable.vue'
import deviceAdd from 'src/components/dialog/deviceAdd.vue'
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
  })
}
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
      <!-- table -->
      <q-table
        flat
        :filter="filter"
        :loading="loading"
        :rows="rows"
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
      </q-table>
    </div>
  </div>
</template>

<style scoped></style>
