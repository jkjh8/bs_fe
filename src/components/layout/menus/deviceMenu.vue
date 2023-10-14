<script setup>
import { useRouter } from 'vue-router'

const $r = useRouter()
</script>

<template>
  <div class="btn cursor-pointer">
    Devices
    <span class="down-icon">&#9660;</span>
    <q-menu :offset="[55, 10]">
      <q-list style="min-width: 220px">
        <!-- Eventlog -->
        <q-item clickable v-close-popup @click="$r.push('/devices/qsys')">
          <q-item-section avatar>
            <q-icon name="img:qsys-logo.svg" color="primary" />
          </q-item-section>
          <q-item-section> Q-SYS </q-item-section>
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
