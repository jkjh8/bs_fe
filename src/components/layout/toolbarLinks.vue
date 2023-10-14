<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
// components
import UserAvatar from './userAvatar'
import BroadcastMenu from './menus/broadcastMenu'
import DeviceMenu from './menus/deviceMenu'
import SetupMenu from './menus/setupMenu'
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
    <BroadcastMenu />
    <DeviceMenu />
    <!-- <div class="btn cursor-pointer" @click="$r.push('/devices')">Device</div> -->
    <SetupMenu />
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
