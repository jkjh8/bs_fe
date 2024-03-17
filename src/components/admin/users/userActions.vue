<script setup>
import { useUsersFunc } from 'composables/user/useUsers.js'
const props = defineProps(['user'])
const { fnDeleteUser } = useUsersFunc()
</script>

<template>
  <div>
    <q-btn round flat icon="delete" size="sm" color="red" @click="fnDeleteUser(user)" />
  </div>
</template>

<style scoped></style>
