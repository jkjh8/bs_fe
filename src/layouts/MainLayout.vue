<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { socket } from 'boot/socketio'
// components
import ToolbarLinks from 'src/components/layout/toolbarLinks'
// composables
import useSocket from 'src/composables/useSocket.js'
// computed
const currentLink = computed(() => {
  return router.currentRoute.value.path
})
// Variables
const router = useRouter()
const { initSocketFn } = useSocket()

// Functions

onMounted(() => {
  initSocketFn()
  console.log(currentLink.value.indexOf('auth'))
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header">
      <div class="row no-wrap full-height justify-between items-center">
        <div class="row no-wrap cursor-pointer" @click="router.push('/')">
          <q-icon
            class="self-center"
            name="home"
            size="1.2rem"
            color="primary"
          />
          <span
            class="ubuntumono-font text-bold q-ml-xs"
            style="font-size: 19px"
            >Broadcast server</span
          >
        </div>
        <ToolbarLinks v-if="!currentLink.includes('auth')" />
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scope>
.header {
  background: #fff;
  color: #222;
  height: 3rem;
  border-bottom: 1px solid #ddd;
  padding: 0 1rem 0 1.5rem;
}
</style>
