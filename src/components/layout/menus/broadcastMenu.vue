<script setup>
import { useRouter } from 'vue-router'

const $r = useRouter()
</script>

<template>
  <div class="btn cursor-pointer">
    Broadcast
    <span class="down-icon">&#9660;</span>
    <q-menu :offset="[55, 10]">
      <q-list style="min-width: 220px">
        <!-- Eventlog -->
        <q-item clickable v-close-popup @click="$r.push('/broadcast/eventlog')">
          <q-item-section avatar>
            <q-icon name="list_alt" color="primary" />
          </q-item-section>
          <q-item-section> Event Log </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<style scoped>
.menu-layout {
  padding: 10px 20px;
}
.menu-width {
  min-width: 180px;
}
.down-icon {
  font-size: 10px;
  color: #888;
}
</style>
