<script setup>
import { ref, onMounted } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { barix, fnGetBarix } from 'composables/barix/useBarix'

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const props = defineProps({ current: String })
const emit = defineEmits([...useDialogPluginComponent.emits])

onMounted(async () => {
  await fnGetBarix()
  console.log(barix.value)
})
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-actions align="right">
        <div class="q-px-sm">
          <q-btn round flat color="red-10" icon="cancel" @click="onDialogCancel" />
          <q-btn round flat no-caps color="primary" icon="check_circle" @click="onDialogOK" />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
