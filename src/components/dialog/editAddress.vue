<script setup>
import { ref, onMounted } from 'vue'
import { useDialogPluginComponent } from 'quasar'
// emit
const emit = defineEmits([...useDialogPluginComponent.emits])
// props
const props = defineProps({
  name: String,
  current: String,
  type: String,
  label: String
})
// initialize
const { dialogRef, onDialogCancel, onDialogHide, onDialogOK } = useDialogPluginComponent()
// variables

const newName = ref('')

onMounted(() => {
  newName.value = props.current
})
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="border-radius: 8px">
      <q-card-section>
        <div class="q-px-sm">
          <div class="dialogName">{{ name }}</div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-px-sm">
          <q-input
            v-model="newName"
            dense
            outlined
            :label="label ? label : 'Address'"
            :type="type ? type : 'String'"
          />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn round flat color="red-10" icon="cancel" @click="onDialogCancel" />
        <q-btn
          round
          flat
          no-caps
          color="primary"
          icon="check_circle"
          @click="onDialogOK(newName)"
        />
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
