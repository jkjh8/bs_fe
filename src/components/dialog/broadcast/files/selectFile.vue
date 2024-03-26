<script setup>
import { useDialogPluginComponent } from 'quasar'
const { dialogRef, onDialogCancel, onDialogHide, onDialogOK } = useDialogPluginComponent()
const props = defineProps({ title: String, type: String })
const emit = defineEmits([...useDialogPluginComponent.emits])
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card>
      <q-card-section>
        <div>파일선택</div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
