<script setup>
import { ref } from 'vue'
// components
import Table from 'src/components/logs/logTable'
// variables
const filter = ref('')
</script>

<template>
  <div class="q-pa-md">
    <div class="borderd">
      <!-- title -->
      <div class="q-px-lg q-py-sm bg-grey-2 row items-center">
        <q-icon name="list_alt" size="24px" color="primary"></q-icon>
        <span class="text-h6">Event Log</span>
        <q-space />
        <q-input v-model="filter" borderless dense debounce="300" placeholder="Search" clearable>
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <!-- body -->
      <Table mode="eventlog" :filter="filter" :level="2" />
    </div>
  </div>
</template>

<style scoped></style>
