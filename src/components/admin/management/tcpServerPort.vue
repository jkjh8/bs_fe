<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import EditAddress from 'src/components/dialog/editAddress.vue'

const $q = useQuasar()
const tcpPort = ref('')

async function getTcpServerPort() {
  const r = await api.get('/setup/tcp/port')
  tcpPort.value = r.data.tcpServerPort
}

async function edit() {
  $q.dialog({
    component: EditAddress,
    componentProps: {
      name: 'Q-SYS 리턴 TCP 포드 변경',
      label: 'Port',
      type: 'Number',
      current: tcpPort.value
    }
  }).onOk(async (newPort) => {
    $q.loading.show()
    await api.put('/setup/tcp/port', { newPort })
    await getTcpServerPort()
    $q.loading.hide()
  })
}

onMounted(async () => {
  await getTcpServerPort()
})
</script>

<template>
  <div class="row no-wrap">
    <div class="self-center">
      <span>Q-SYS 데이터 리턴 TCP PORT</span>
    </div>
    <q-space />
    <div class="q-gutter-x-sm items-center">
      <span>{{ tcpPort }}</span>
      <q-btn flat round size="sm" icon="edit" color="primary" @click="edit" />
    </div>
  </div>
</template>

<style scoped></style>
