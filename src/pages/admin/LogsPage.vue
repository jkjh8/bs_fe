<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import columns from 'src/composables/columns/logs'

const search = ref('')
const current = ref([])
const pagination = ref({
  sortBy: 'createdAt',
  descending: false,
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 0
})

onMounted(async () => {
  const r = await api.get('/logs', {
    params: {
      search,
      limit: pagination.value.rowsPerPage,
      page: pagination.value.page
    }
  })
  console.log(r)
  pagination.value.rowsPerPage = r.data.limit
  pagination.value.page = r.data.page
  pagination.value.rowsNumber = r.data.count
  current.value = r.data.current
})
</script>

<template>
  <div class="page">
    <div class="form">
      <div class="q-mx-lg row items-center">
        <q-icon name="list_alt" size="24px" color="primary" />
        <span class="text-h6">System Log</span>
        <q-space />
        <q-input
          v-model="search"
          borderless
          dense
          debounce="300"
          placeholder="Search"
          clearable
        >
          <template #append>
            <q-icon class="cursor-pointer" name="search" color="primary" />
          </template>
        </q-input>
      </div>
      <q-table
        flat
        :columns="columns"
        :rows="current"
        v-model:pagination="pagination"
      ></q-table>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 20px;
}
.form {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px 0px;
}
.caption {
  font-size: 10px;
}
</style>
