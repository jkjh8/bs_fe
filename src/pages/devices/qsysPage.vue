<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
// components
import DeviceTable from 'components/devices/deviceTable.vue'
// composables
import { qsys, fnGetQsys } from 'src/composables/qsys/useQsys.js'
import { useQsysFunc } from 'composables/qsys/useQsysFunc.js'
// initialize
const $q = useQuasar()
const { fnAddQsysDevice, fnDeleteQsysDevice } = useQsysFunc()

// variables
const filter = ref('')
const loading = ref(false)

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
            @click="fnAddQsysDevice"
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
      <DeviceTable
        :rows="qsys"
        :filter="filter"
        :loading="loading"
        @remove="fnDeleteQsysDevice"
        deviceType="qsys"
      />
    </div>
  </div>
</template>

<style scoped></style>
