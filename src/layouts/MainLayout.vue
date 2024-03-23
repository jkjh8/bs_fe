<script setup>
import { onMounted } from 'vue'
import { socket } from 'boot/socketio'
// components
import HomeLogo from 'src/components/layout/homeLogo'
import ToolbarLinks from 'src/components/layout/toolbarLinks'
// composables
import { fnGetGainStep } from 'src/composables/useServer.js'

// computed
// Variables
// Functions

//lifecycle
onMounted(() => {
  fnGetGainStep()
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header">
      <div class="row no-wrap full-height justify-between items-center">
        <HomeLogo />
        <ToolbarLinks />
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scope></style>
