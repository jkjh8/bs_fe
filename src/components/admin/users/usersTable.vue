<script setup>
import TimeFormat2Lines from 'components/utils/timeFormat2line.vue'
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

const props = defineProps(['rows', 'filter'])
const emits = defineEmits(['update:admin'])
</script>

<template>
  <q-table flat :columns="columns" :rows="rows" :filter="filter">
    <!-- table body -->
    <template #body="props">
      <q-tr :props="props">
        <q-td key="email" :props="props">
          {{ props.row.email }}
        </q-td>
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
        <q-td key="isAdmin" class="row justify-center items-center" :props="props">
          <div class="cursor-pointer" style="width: 16px" @click="emits('update:admin', props.row)">
            <q-icon v-if="props.row.isAdmin" name="check_circle" color="primary" size="16px" />
            <q-icon v-else name="block" color="red-10" size="16px" />
          </div>
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
</template>

<style scoped></style>
