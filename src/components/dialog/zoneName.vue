<script setup>
import { ref, onMounted } from 'vue'
import { useDialogPluginComponent } from 'quasar'
// emit
const props = defineProps({
  currentName: String,
  zone: Number
})
const emit = defineEmits([...useDialogPluginComponent.emits])
// initialize
const { dialogRef, onDialogCancel, onDialogHide, onDialogOK } = useDialogPluginComponent()
// variables
const name = ref('')

onMounted(() => {
  if (props.currentName) {
    name.value = props.currentName
  }
})
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="q-px-sm">
          <div class="dialogName">{{ `방송구간 채널 ${zone} 이름 변경` }}</div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-px-sm">
          <q-input v-model="name" dense outlined label="Name" />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <div class="q-px-sm">
          <q-btn round flat color="red-10" icon="cancel" @click="onDialogCancel" />
          <q-btn round flat no-caps color="primary" icon="check_circle" @click="onDialogOK(name)" />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.dialogName {
  font-size: 1rem;
  font-family: ubuntumono;
  font-weight: bold;
}
</style>
