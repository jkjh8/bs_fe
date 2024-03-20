<script setup>
import { ref, onMounted } from 'vue'
// components
import UsersTable from 'components/admin/users/usersTable.vue'
// composables
import { users, useUsersFunc } from 'composables/user/useUsers'
import { fnGetQsys } from 'composables/qsys/useQsys'

const { fnGetUsers, fnSetAdmin } = useUsersFunc()
const filter = ref('')

// life cycle hooks
onMounted(async () => {
  await fnGetUsers()
  await fnGetQsys()
})
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
      <UsersTable :rows="users" :filter="filter" @update:admin="fnSetAdmin" />
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
