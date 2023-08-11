<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="row no-wrap cursor-pointer" @click="router.push('/')">
    <q-icon class="self-center" name="home" size="1.2rem" color="primary" />
    <span class="ubuntumono-font text-bold q-ml-sm" style="font-size: 19px"
      >Broadcast server</span
    >
  </div>
</template>

<style scoped></style>
