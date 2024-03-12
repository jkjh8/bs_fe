<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import EditAddress from 'src/components/dialog/editAddress.vue'
import { interval, fnGetInterval } from 'src/composables/useServer.js'

const $q = useQuasar()

async function edit() {
  $q.dialog({
    component: EditAddress,
    componentProps: {
      name: 'HTTP 장치 확인 간격(초',
      label: '초',
      type: 'Number',
      current: interval.value
    }
  }).onOk(async (newInterval) => {
    $q.loading.show()
    await api.put('/setup/barix/interval', { newInterval })
    await fnGetInterval()
    $q.loading.hide()
  })
}

onMounted(async () => {
  await fnGetInterval()
})
</script>

<template>
  <div class="row no-wrap">
    <div class="self-center">
      <span>HTTP 장치 확인 간격(초)</span>
    </div>
    <q-space />
    <div class="q-gutter-x-sm items-center">
      <span>{{ interval }}</span>
      <q-btn flat round size="sm" icon="edit" color="primary" @click="edit" />
    </div>
  </div>
</template>

<style scoped></style>
