<script setup>
import { useRouter } from 'vue-router'

const $r = useRouter()
</script>

<template>
  <div class="btn cursor-pointer">
    Setup
    <span class="down-icon">&#9660;</span>
    <q-menu :offset="[0, 10]">
      <q-list style="min-width: 220px">
        <!-- Users -->
        <q-item clickable v-close-popup @click="$r.push('/admin/users')">
          <q-item-section avatar>
            <q-icon name="group" color="primary" />
          </q-item-section>
          <q-item-section> User management </q-item-section>
        </q-item>
        <!-- Device registration -->
        <q-item clickable v-close-popup @click="$r.push('/admin/devices')">
          <q-item-section avatar>
            <q-icon name="dns" color="primary" />
          </q-item-section>
          <q-item-section> Device management </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="$r.push('/admin/logs')">
          <q-item-section avatar>
            <q-icon name="list_alt" color="primary" />
          </q-item-section>
          <q-item-section>System Log</q-item-section>
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
