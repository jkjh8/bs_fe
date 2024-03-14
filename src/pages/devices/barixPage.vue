<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
// components
import DeviceTable from 'components/devices/deviceTable.vue'
// composables
import { barix, fnGetBarix } from 'composables/barix/useBarix'
import { useBarixFunc } from 'composables/barix/useBarixFunc'

// initialize
const $q = useQuasar()
const { fnAddBarixDevice, fnDeleteBarixDevice } = useBarixFunc()

// variables
const filter = ref('')
const loading = ref(false)
// functions

onMounted(async () => {
  await fnGetBarix()
})
</script>

<template>
  <div class="q-pa-md">
    <div class="borderd">
      <!-- title -->
      <div class="q-px-lg q-py-sm row items-center bg-grey-2">
        <div class="row no-wrap items-center q-gutter-x-sm">
          <q-icon name="img:barix-logo.svg" size="14px" color="primary" />
          <span class="text-h6">Barix</span>
          <q-icon
            class="cursor-pointer"
            name="add_circle"
            color="primary"
            size="sm"
            @click="fnAddBarixDevice"
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
        :rows="barix"
        :filter="filter"
        :loading="loading"
        @remove="fnDeleteBarixDevice"
        deviceType="barix"
      />
    </div>
  </div>
</template>

<style scoped></style>
