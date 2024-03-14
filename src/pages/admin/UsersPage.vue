<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
// components
import TimeFormat2Lines from 'components/utils/timeFormat2line.vue'
// composables
import useNotify from 'composables/useNotify'
import { users, useUsersFunc } from 'composables/user/useUsers'
import { fnGetTimeFormat } from 'composables/utils/useTime'

const { notifyErrorFeedback } = useNotify()
const { fnGetUsers } = useUsersFunc()

const filter = ref('')

// life cycle hooks
onMounted(async () => {
  await fnGetUsers()
})

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
</script>

<template>
  <div class="q-pa-md">
    <div class="borderd">
      <div class="q-px-lg q-py-sm row no-wrap items-center bg-grey-2">
        <div class="row no-wrap items-cetner q-gutter-x-sm">
          <q-icon name="group" size="24px" color="primary" />
          <div class="text-h6">User Management</div>
        </div>
        <q-space />
        <!-- table search input -->
        <q-input v-model="filter" borderless dense debounce="300" placeholder="Search" clearable>
          <template #append>
            <q-icon class="cursor-pointer" name="search" />
          </template>
        </q-input>
      </div>
      <q-table flat :columns="columns" :rows="users" :filter="filter">
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
              <q-icon v-else class="cursor-pointer" name="block" color="red-10" size="16px" />
            </q-td>
            <q-td key="loginAt" :props="props">
              <TimeFormat2Lines :time="props.row.loginAt" />
            </q-td>
            <q-td key="createdAt" :props="props">
              <TimeFormat2Lines :time="props.row.createdAt" />
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
.list {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 5px 0px 0px 0px;
}
</style>
