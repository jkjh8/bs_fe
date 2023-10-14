<script setup>
import { ref, onMounted } from 'vue'
import moment from 'moment'
import { api } from 'boot/axios'
// composables
import columns from 'src/composables/columns/logs'

// initializes
moment.locale = 'ko-KR'

// props
const props = defineProps({ mode: String, filter: String })
// variables
const loading = ref(false)
const current = ref([])
const pagination = ref({
  sortBy: 'createdAt',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0
})

// functions
function setLogColor(level) {
  switch (level) {
    case 'error':
      return 'bg-red text-white'
    case 'warn':
      return 'bg-yellow'
    case 'debug':
      return 'bg-blue-3'
    case 'info':
      return 'text-green'
  }
}
async function onRequest(args) {
  loading.value = true
  const r = await api.get(`/logs${props.mode ? '/' + props.mode : ''}`, {
    params: {
      search: args.filter,
      limit: args.pagination.rowsPerPage,
      page: args.pagination.page
    }
  })
  console.log(r)
  pagination.value.rowsNumber = Number(r.data.count)
  pagination.value.page = Number(r.data.page)
  pagination.value.rowsPerPage = Number(r.data.limit)
  current.value = r.data.current
  loading.value = false
}
// lifecycle hooks
onMounted(async () => {
  await onRequest({
    filter: props.filter.value,
    pagination: pagination.value
  })
})
</script>

<template>
  <!-- table -->
  <q-table
    flat
    :columns="columns"
    :rows="current"
    :filter="filter"
    :loading="loading"
    row-key="_id"
    v-model:pagination="pagination"
    @request="onRequest"
  >
    <template #body="props">
      <q-tr :props="props" :class="setLogColor(props.row.level)">
        <q-td key="createdAt" :props="props">
          {{ moment(props.row.createdAt).format('YYYY-MM-DD hh:mm:ss A') }}
        </q-td>
        <q-td key="level" :props="props">
          {{ props.row.level.toUpperCase() }}
        </q-td>
        <q-td key="source" :props="props">
          {{
            props.row.source
              ? props.row.source.charAt(0).toUpperCase() +
                props.row.source.slice(1)
              : ''
          }}
        </q-td>
        <q-td key="category" :props="props">
          {{
            props.row.category
              ? props.row.category.charAt(0).toUpperCase() +
                props.row.category.slice(1)
              : ''
          }}
        </q-td>
        <q-td key="message" :props="props">
          {{ props.row.message }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<style scoped></style>
