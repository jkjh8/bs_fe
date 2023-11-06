<script setup>
import BroadcastStatus from 'src/components/devices/broadcastStatus'
</script>

<template>
  <div class="q-pa-md">
    <div class="borderd">
      <!-- title -->
      <div class="q-px-lg q-py-sm row items-center bg-grey-2">
        <div class="row no-wrap items-center q-gutter-x-sm">
          <q-icon name="map" size="20px" color="primary" />
          <span class="text-h6">Broadcast Status</span>
        </div>
      </div>
      <BroadcastStatus />
    </div>
  </div>
</template>

<style scoped></style>
