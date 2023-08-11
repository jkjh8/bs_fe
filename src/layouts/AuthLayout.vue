<script setup>
// components
import HomeLogo from 'src/components/layout/homeLogo'
import ToolbarLinks from 'src/components/layout/toolbarLinks'
// composables
// computed
// Variables
// Functions
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header">
      <div class="row no-wrap full-height justify-between items-center">
        <HomeLogo />
      </div>
    </q-header>
    <q-page-container>
      <div>
        <div class="row no-wrap justify-center q-pt-xl q-pb-lg">
          <q-icon class="self-center" name="home" size="24px" color="primary" />
          <div class="ubuntumono-font main-title text-bold q-ml-sm">
            Broadcast server
          </div>
        </div>
        <router-view class="form" />
      </div>
    </q-page-container>
  </q-layout>
</template>

<style scope>
.form {
  margin: auto;
  max-width: 400px;
  background: #f8f8f8;
  border: none;
  border-radius: 8px;
  padding: 3rem 1.5rem 2rem 1.5rem;
}
</style>
