<script setup>
import { useQuasar, useDialogPluginComponent } from 'quasar'
// dialog functions
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// props
const props = defineProps({
  icon: String,
  iconColor: String,
  btnColor: String,
  title: String,
  caption: String,
  message: String
})
// emit
const emit = defineEmits([...useDialogPluginComponent.emits])
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin border-radius sans-font" style="border-radius: 8px">
      <q-card-section class="row no-wrap q-gutter-sm items-center">
        <q-icon
          v-if="icon"
          style="margin-top: 10px"
          :name="icon"
          :color="iconColor ? iconColor : 'primary'"
          size="1.5rem"
        />
        <div>
          <div class="text-subtitle1">{{ title }}</div>
          <div v-if="caption" class="caption">{{ caption }}</div>
        </div>
      </q-card-section>

      <q-card-section v-if="message">
        <div class="row justify-center q-px-md">
          {{ message }}
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn round flat color="red-10" icon="cancel" @click="onDialogCancel" />
        <q-btn
          round
          flat
          no-caps
          :color="btnColor ?? 'primary'"
          icon="check_circle"
          @click="onDialogOK"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style>
.confirmDialog {
  max-width: 300px;
  min-width: 200px;
  border-radius: 0.5rem;
}
</style>
