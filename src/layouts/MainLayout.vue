<script setup>
import { computed, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
// components
import ToolbarLinks from 'src/components/layout/toolbarLinks'

const router = useRouter()

const currentLink = computed(() => {
  return router.currentRoute.value.path
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header">
      <div class="row no-wrap toolbar justify-between items-center">
        <div class="flex flex-center pointer" @click="router.push('/')">
          <q-icon class="main-color" name="home" size="1.2rem"></q-icon>
          <span class="title">APP</span>
        </div>
        <ToolbarLinks v-if="currentLink != '/auth'" />
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
.toolbar {
  height: 100%;
}
.title {
  font-weight: bold;
  font-size: 1rem;
  margin-left: 5px;
}
</style>
