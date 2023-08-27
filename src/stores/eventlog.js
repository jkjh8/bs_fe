import { ref } from 'vue'
import { api } from 'boot/axios'
import { defineStore } from 'pinia'

export const useEventLogStore = defineStore('eventlog', () => {
  const current = ref([])
  const filter = ref('')
  const loading = ref(false)
  const pagination = ref({
    sortBy: 'createdAt',
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0
  })

  const onRequest = async (props) => {
    console.log(props)
    loading.value = true
    const r = await api.get('/logs/eventlog', {
      params: {
        search: props.filter,
        limit: props.pagination.rowsPerPage,
        page: props.pagination.page
      }
    })
    pagination.value.rowsNumber = r.data.count
    pagination.value.page = Number(r.data.page)
    pagination.value.rowsPerPage = Number(r.data.limit)
    current.value = r.data.current
    loading.value = false
  }

  return { current, filter, loading, pagination, onRequest }
})
