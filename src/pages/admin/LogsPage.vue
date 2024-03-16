<script setup>
import { ref } from 'vue'
import { api } from 'boot/axios'
// composables
import Table from 'src/components/logs/logTable'
// variables
const filter = ref('')
</script>

<template>
  <div class="q-pa-md">
    <div class="borderd">
      <!-- title -->
      <div class="q-px-lg q-py-sm row items-center bg-grey-2">
        <q-icon name="list_alt" size="24px" color="primary" />
        <span class="text-h6">System Log</span>
        <q-space />
        <q-input v-model="filter" borderless dense debounce="300" placeholder="Search" clearable>
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <!-- table -->
      <Table mode="" :filter="filter" :level="0" />
    </div>
  </div>
</template>

<style scoped></style>
