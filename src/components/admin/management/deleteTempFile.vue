<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar, format } from 'quasar'
import ConfirmDialog from 'src/components/dialog/confirmDialog'
const $q = useQuasar()

const tempSize = ref(0)

const action = () => {
  $q.dialog({
    component: ConfirmDialog,
    componentProps: {
      icon: 'delete_outline',
      iconColor: 'red',
      title: '임시파일을 삭제 하시겠습니까?',
      caption: `임시파일 총 용량은 ${format.humanStorageSize(tempSize.value)}`
    }
  }).onOk(async () => {
    $q.loading.show()
    try {
      await api.delete('/files/temp')
      await getTempFolder()
      $q.loading.hide()
    } catch (error) {
      console.error(error)
      $q.loading.hide()
    }
  })
}

const getTempFolder = async () => {
  const r = await api.get('/files/size', { params: { fullpath: 'temp' } })
  tempSize.value = r.data.size
}

onMounted(async () => {
  await getTempFolder()
})
</script>

<template>
  <div class="row no-wrap">
    <div class="self-center q-gutter-x-sm">
      <span>임시파일삭제</span>
      <span class="caption">총용량: {{ format.humanStorageSize(tempSize) }}</span>
    </div>
    <q-space />
    <q-btn flat round icon="delete_outline" color="red" size="sm" @click="action" />
  </div>
</template>

<style scoped></style>
