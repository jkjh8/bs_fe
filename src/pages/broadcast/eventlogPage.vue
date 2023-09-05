<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import moment from 'moment'
// stores
import { useEventLogStore } from 'src/stores/eventlog.js'
// composables
import columns from 'src/composables/columns/eventlog.js'

// initialize
moment.locale = 'ko-KR'
// variables
const { current, filter, loading, pagination } = storeToRefs(useEventLogStore())

// lifecycle hooks
onMounted(async () => {
  await useEventLogStore().onRequest({
    filter: filter.value,
    pagination: pagination.value
  })
})
</script>

<template>
  <div class="page">
    <div class="form full-width">
      <!-- title -->
      <div class="q-mx-lg row items-center">
        <q-icon name="list_alt" size="24px" color="primary"></q-icon>
        <span class="text-h6">Event Log</span>
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
      <!-- body -->
      <q-table
        flat
        :columns="columns"
        :rows="current"
        :filter="filter"
        :loading="loading"
        row-key="_id"
        v-model:pagination="pagination"
        @request="useEventLogStore().onRequest"
      >
        <template #body="props">
          <q-tr :props="props">
            <q-td key="createdAt" :props="props">
              {{ moment(props.row.createdAt).format('YYYY-MM-DD hh:mm:ss A') }}
            </q-td>
            <q-td key="level" :props="props">
              {{
                typeof props.row.level == 'string'
                  ? props.row.level.toUpperCase()
                  : props.row.level
              }}
            </q-td>
            <q-td key="user" :props="props">
              {{ props.row.user }}
            </q-td>
            <q-td key="zones" :props="props">
              {{ props.row.zones }}
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
