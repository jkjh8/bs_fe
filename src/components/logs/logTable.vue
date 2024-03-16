<script setup>
import { ref, onMounted } from 'vue'
import moment from 'moment'
import { api } from 'boot/axios'
// composables
import {
  rows,
  logLevel,
  loading,
  pagination,
  fnGetLogs,
  fnSetColorLog
} from 'composables/utils/useLogs'
// initializes
import { fnGetTimeFormat } from 'composables/utils/useTime'

// props
const props = defineProps(['mode', 'filter', 'level'])
// variables
const columns = [
  {
    name: 'createdAt',
    label: 'Time',
    align: 'center',
    field: 'createdAt',
    sortable: true
  },
  {
    name: 'level',
    label: 'Level',
    align: 'center',
    field: 'level',
    sortable: true
  },
  {
    name: 'source',
    label: 'Source',
    align: 'center',
    field: 'source',
    sortable: true
  },
  {
    name: 'zones',
    label: 'Zones',
    align: 'center',
    field: 'zones',
    sortable: true
  },
  {
    name: 'message',
    label: 'Message',
    align: 'left',
    field: 'message',
    sortable: true
  }
]

// lifecycle hooks
onMounted(async () => {
  logLevel.value = props.level
  await fnGetLogs({ pagination: { ...pagination.value }, filter: props.filter.value })
})
</script>

<template>
  <!-- table -->
  <q-table
    flat
    :columns="columns"
    :rows="rows"
    :filter="filter"
    :loading="loading"
    wrap-cells="false"
    row-key="_id"
    v-model:pagination="pagination"
    @request="fnGetLogs"
  >
    <template #body="props">
      <q-tr :props="props" :class="fnSetColorLog(props.row.level)">
        <q-td key="createdAt" :props="props">
          {{ fnGetTimeFormat(props.row.createdAt) }}
        </q-td>
        <q-td key="level" :props="props">
          {{ props.row.level.toUpperCase() }}
        </q-td>
        <q-td key="source" :props="props">
          {{ props.row.source }}
        </q-td>
        <q-td key="zones" :props="props">
          {{
            props.row.zones
              ? props.row.zones.charAt(0).toUpperCase() + props.row.zones.slice(1)
              : ''
          }}
        </q-td>
        <q-td class="message" key="message" :props="props">
          {{ props.row.message }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<style scoped>
.message {
  overflow: hidden;
  white-space: initial;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
</style>
