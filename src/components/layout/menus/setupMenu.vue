<script setup>
import { useRouter } from 'vue-router'

const $r = useRouter()
</script>

<template>
  <div class="btn cursor-pointer">
    Setup
    <span class="down-icon">&#9660;</span>
    <q-menu :offset="[0, 10]">
      <div class="menu-layout">
        <div
          class="menu-width cursor-pointer row no-wrap items-center q-gutter-x-sm"
          v-close-popup
          @click="$r.push('/admin/users')"
        >
          <q-icon name="group" color="primary" size="sm" />
          <span>User management</span>
        </div>
      </div>
    </q-menu>
  </div>
</template>

<style scoped>
.menu-layout {
  padding: 10px 20px;
}
.menu-width {
  min-width: 156px;
}
.down-icon {
  font-size: 10px;
  color: #888;
}
</style>
