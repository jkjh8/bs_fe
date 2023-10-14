<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
// components
import UserAvatar from './userAvatar'
import DropdownMenu from './menus/dropdownMenu'
// stores
import { useUserStore } from 'src/stores/user'
// computed
const current = computed(() => router.currentRoute.value)
// variables
const $r = useRouter()
const { user } = useUserStore()
</script>

<template>
  <div class="row no-wrap items-center">
    <div class="btn cursor-pointer">Summary</div>
    <DropdownMenu
      name="Broadcast"
      :offset="[0, 0]"
      :items="[
        { name: 'Eventlog', icon: 'list_alt', link: '/broadcast/eventlog' }
      ]"
    />
    <DropdownMenu
      name="Devices"
      :offset="[0, 0]"
      :items="[
        {
          name: 'Q-Sys',
          icon: 'img:qsys-logo.svg',
          iconSize: '16px',
          link: 'devices/qsys'
        }
      ]"
    />
    <DropdownMenu
      name="Setup"
      :offset="[0, 10]"
      :items="[
        { name: 'User management', icon: 'group', link: '/admin/users' },
        { name: 'Device management', icon: 'dns', link: '/admin/devices' },
        { name: 'System log', icon: 'list_alt', link: '/admin/logs' }
      ]"
    />
    <div class="q-ml-sm">
      <UserAvatar />
    </div>
  </div>
</template>

<style scoped>
.btn {
  font-size: 12px;
  font-weight: 400;
  padding: 4px 10px 4px 10px;
  border-radius: 5px;
}
.btn:hover {
  background: #eee;
}
.btn-selected {
}
.btn-login:hover {
  background: #2e9f6c;
}
</style>
