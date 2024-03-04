<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import EditAddress from 'src/components/dialog/editAddress.vue'

const $q = useQuasar()
const ttsAddr = ref('')

async function getTTSAddr() {
  const r = await api.get('/setup/tts/addr')
  ttsAddr.value = r.data.ttsAddress
}

async function edit() {
  $q.dialog({
    component: EditAddress,
    componentProps: {
      name: 'TTS서버 주소변경',
      current: ttsAddr.value
    }
  }).onOk(async (newName) => {
    $q.loading.show()
    await api.put('/setup/tts/addr', { newName })
    await getTTSAddr()
    $q.loading.hide()
  })
}

onMounted(async () => {
  await getTTSAddr()
})
</script>

<template>
  <div class="row no-wrap">
    <div class="self-center">
      <span>TTS서버 주소</span>
    </div>
    <q-space />
    <div class="q-gutter-x-sm items-center">
      <span>{{ ttsAddr }}</span>
      <q-btn flat round size="sm" icon="edit" color="primary" @click="edit" />
    </div>
  </div>
</template>

<style scoped></style>
