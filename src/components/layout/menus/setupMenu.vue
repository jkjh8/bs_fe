<script setup>
import { useRouter } from 'vue-router'

const $r = useRouter()
const menus = [
  { name: 'User management', icon: 'group', link: 'users' },
  { name: 'Device management', icon: 'dns', link: 'devices' },
  { name: 'System log', icon: 'list-alt', link: 'logs' }
]
</script>

<template>
  <div class="btn cursor-pointer">
    Setup
    <span class="down-icon">&#9660;</span>
    <q-menu :offset="[0, 10]">
      <div v-for="(item, idx) in menus" :key="idx">
        <div>{{ item.name }}</div>
      </div>
      <div>
        <!-- Users -->
        <div
          class="row no-wrap items-center q-py-sm q-gutter-x-md cursor-pointer menu-item"
          v-close-popup
          @click="$r.push('/admin/users')"
        >
          <q-icon name="group" color="primary" size="20px" />
          <div class="ubuntumono-font">User management</div>
        </div>
        <!-- Device registration -->
        <div
          class="row no-wrap items-center q-py-sm q-gutter-x-md cursor-pointer menu-item"
          v-close-popup
          @click="$r.push('/admin/devices')"
        >
          <q-icon name="dns" color="primary" size="20px" />
          <div class="ubuntumono-font">Device management</div>
        </div>
        <div
          class="row no-wrap items-center q-py-sm q-gutter-x-md cursor-pointer menu-item"
          v-close-popup
          @click="$r.push('/admin/logs')"
        >
          <q-icon name="list_alt" color="primary" size="20px" />
          <div class="ubuntumono-font">System Log</div>
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
  min-width: 180px;
}
.down-icon {
  font-size: 10px;
  color: #888;
}
</style>
