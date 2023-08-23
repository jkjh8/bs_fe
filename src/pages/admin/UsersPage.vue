<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import moment from 'moment'
// composables
import useNotify from 'src/composables/useNotify'

moment.locale = 'ko-KR'
const { notifyErrorFeedback } = useNotify()
// columns
const columns = [
  {
    name: 'email',
    label: 'E-mail',
    align: 'center',
    field: 'email',
    sortable: true
  },
  {
    name: 'name',
    label: 'Name',
    align: 'center',
    field: 'name',
    sortable: true
  },
  {
    name: 'isAdmin',
    label: 'isAdmin',
    align: 'center',
    field: 'isAdmin',
    sortable: true
  },

  {
    name: 'loginAt',
    label: 'Last login',
    align: 'center',
    field: 'loginAt',
    sortable: true
  },
  {
    name: 'createdAt',
    label: 'Created at',
    align: 'center',
    field: 'createdAt',
    sortable: true
  },
  {
    name: 'actions',
    label: 'FN',
    align: 'center'
  }
]

const filter = ref('')
const users = ref([])
// functions
const getUsers = async () => {
  try {
    const r = await api.get('/users')
    users.value = r.data.users
  } catch (err) {
    console.error(err)
    notifyErrorFeedback(err.response)
  }
}

const getTimeFormat = (time) => {
  return {
    yyyymmdd: moment(time).formay('YYYY-MM-DD'),
    hhmmssa: moment(time).formay('hh:mm:ss a')
  }
}

// life cycle hooks
onMounted(async () => {
  await getUsers()
})
</script>

<template>
  <div class="page">
    <div class="list">
      <div class="row no-wrap" style="padding: 10px 20px">
        <div class="text-h6">User Management</div>
        <q-space />
        <!-- table search input -->
        <q-input
          v-model="filter"
          borderless
          dense
          debounce="300"
          placeholder="Search"
          clearable
        >
          <template #append>
            <q-icon class="cursor-pointer" name="search" />
          </template>
        </q-input>
      </div>
      <q-table flat :columns="columns" :rows="users">
        <!-- table body -->
        <template #body="props">
          <q-tr :props="props">
            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="isAdmin" :props="props">
              <q-icon
                v-if="props.row.isAdmin"
                class="cursor-pointer"
                name="check_circle"
                color="primary"
                size="16px"
              />
              <q-icon
                v-else
                class="cursor-pointer"
                name="block"
                color="red-10"
                size="16px"
              />
            </q-td>
            <q-td class="time-font" key="loginAt" :props="props">
              <div>{{ moment(props.row.loginAt).format('YYYY-MM-DD') }}</div>
              <div>{{ moment(props.row.loginAt).format('hh:mm:ss A') }}</div>
            </q-td>
            <q-td class="time-font" key="createdAt" :props="props">
              <div>{{ moment(props.row.createdAt).format('YYYY-MM-DD') }}</div>
              <div>{{ moment(props.row.createdAt).format('hh:mm:ss A') }}</div>
            </q-td>
            <q-td key="actions" :props="props"> </q-td>
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
.time-font {
  font-size: 10px;
}
.list {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 5px 0px 0px 0px;
}
</style>
