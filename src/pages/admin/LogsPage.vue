<script setup>
import { ref, computed, onMounted } from 'vue'
import moment from 'moment'
import { storeToRefs } from 'pinia'
import { api } from 'boot/axios'
// composables
import columns from 'src/composables/columns/logs'

// stores
import { useLogsStore } from 'src/stores/logs'

// initializes
moment.locale = 'ko-KR'

// variables
const { current, filter, loading, pagination } = storeToRefs(useLogsStore())

// functions

// lifecycle hooks
onMounted(async () => {
  await useLogsStore().onRequest({
    filter: filter.value,
    pagination: pagination.value
  })
})
</script>

<template>
  <div class="q-pa-md">
    <div class="borderd">
      <!-- title -->
      <div class="q-px-lg q-py-sm row items-center bg-grey-2">
        <q-icon name="list_alt" size="24px" color="primary" />
        <span class="text-h6">System Log</span>
        <q-space />
        <q-input
          v-model="filter"
          borderless
          dense
          debounce="300"
          placeholder="Search"
          clearable
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <!-- table -->
      <q-table
        flat
        :columns="columns"
        :rows="current"
        :filter="filter"
        :loading="loading"
        row-key="_id"
        v-model:pagination="pagination"
        @request="useLogsStore().onRequest"
      >
        <template #body="props">
          <q-tr :props="props">
            <q-td key="createdAt" :props="props">
              {{ moment(props.row.createdAt).format('YYYY-MM-DD hh:mm:ss A') }}
            </q-td>
            <q-td key="level" :props="props">
              {{ props.row.level.toUpperCase() }}
            </q-td>
            <q-td key="message" :props="props">
              {{ props.row.message }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<style scoped></style>
