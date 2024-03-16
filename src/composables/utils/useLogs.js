import { ref } from 'vue'
import { api } from 'boot/axios'

const rows = ref([])
const loading = ref(false)
const pagination = ref({
  sortBy: 'createdAt',
  descending: true,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0
})
const logLevel = ref(0)

const fnGetLogs = async (obj) => {
  loading.value = true
  console.log(obj)
  const r = await api.get(
    `logs?options=${JSON.stringify({
      pagination: obj.pagination,
      filter: obj.filter,
      level: logLevel.value
    })}`
  )
  console.log(r)
  rows.value = r.data.current
  pagination.value = r.data.pagination
  loading.value = false
}

const fnSetColorLog = (level) => {
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

export { rows, logLevel, loading, pagination, fnGetLogs, fnSetColorLog }
