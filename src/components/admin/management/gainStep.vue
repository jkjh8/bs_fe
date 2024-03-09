<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import EditAddress from 'src/components/dialog/editAddress.vue'
import { gainStep, fnGetGainStep } from 'src/composables/useServer.js'

const $q = useQuasar()

async function edit() {
  $q.dialog({
    component: EditAddress,
    componentProps: {
      name: '볼륨 간격(dB)',
      label: 'dB',
      type: 'Number',
      current: gainStep.value
    }
  }).onOk(async (newGainStep) => {
    $q.loading.show()
    await api.put('/setup/qsys/gainstep', { newGainStep })
    await fnGetGainStep()
    $q.loading.hide()
  })
}

onMounted(async () => {
  await fnGetGainStep()
})
</script>

<template>
  <div class="row no-wrap">
    <div class="self-center">
      <span>볼륨 간격(dB)</span>
    </div>
    <q-space />
    <div class="q-gutter-x-sm items-center">
      <span>{{ gainStep }}</span>
      <q-btn flat round size="sm" icon="edit" color="primary" @click="edit" />
    </div>
  </div>
</template>

<style scoped></style>
