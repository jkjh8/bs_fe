<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const current = computed(() => router.currentRoute.value)
</script>

<template>
  <div class="row no-wrap items-center">
    <div class="btn cursor-pointer">Summary</div>
    <div class="btn cursor-pointer">Broadcast</div>
    <div class="btn cursor-pointer">Device</div>
    <div class="btn cursor-pointer">Setup</div>
    <div class="q-ml-sm">
      <div class="btn-login cursor-pointer" @click="router.push('/auth')">
        Login
      </div>
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
.btn-login {
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  padding: 4px 12px 4px 12px;
  background: #3eaf7c;
  border-radius: 5px;
}
.btn-login:hover {
  background: #2e9f6c;
}
</style>
