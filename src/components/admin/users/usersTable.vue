<script setup>
import TimeFormat2Lines from "components/utils/timeFormat2line.vue";
import UserActions from "components/admin/users/userActions.vue";
import UserZones from "components/admin/users/userZones.vue";
const columns = [
  {
    name: "email",
    label: "E-mail",
    align: "center",
    field: "email",
    sortable: true,
  },
  {
    name: "name",
    label: "Name",
    align: "center",
    field: "name",
    sortable: true,
  },
  {
    name: "isAdmin",
    label: "isAdmin",
    align: "center",
    field: "isAdmin",
    sortable: true,
  },
  {
    name: "zones",
    label: "Zones",
    align: "center",
    field: "zones",
    sortable: true,
  },
  {
    name: "loginAt",
    label: "Last login",
    align: "center",
    field: "loginAt",
    sortable: true,
  },
  {
    name: "createdAt",
    label: "Created at",
    align: "center",
    field: "createdAt",
    sortable: true,
  },
  {
    name: "actions",
    label: "FN",
    align: "center",
  },
];

const props = defineProps(["rows", "filter"]);
const emits = defineEmits(["update:admin"]);
</script>

<template>
  <q-table flat :columns="columns" :rows="rows" :filter="filter" :wrap-cells="false">
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
            class="cursor-pointer"
            :name="props.row.isAdmin ? 'check_circle' : 'block'"
            :color="props.row.isAdmin ? 'primary' : 'red-10'"
            size="16px"
            @click="emits('update:admin', props.row)"
          />
        </q-td>
        <q-td key="zones" class="row justify-center" :props="props">
          <UserZones :user="props.row" />
        </q-td>
        <q-td key="loginAt" :props="props">
          <TimeFormat2Lines :time="props.row.loginAt" />
        </q-td>
        <q-td key="createdAt" :props="props">
          <TimeFormat2Lines :time="props.row.createdAt" />
        </q-td>
        <q-td key="actions" :props="props">
          <UserActions :user="props.row" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<style scoped></style>
