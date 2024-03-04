<script setup>
import { reactive, onMounted } from 'vue'
import { useDialogPluginComponent } from 'quasar'
// composables
import makeUid from 'src/composables/useMakeUid.js'
import useRules from 'src/composables/useRules.js'
import fnExist from 'src/composables/devices/useQsysExists'
// emit
const emit = defineEmits([...useDialogPluginComponent.emits])
// initialize
const { dialogRef, onDialogCancel, onDialogHide, onDialogOK } = useDialogPluginComponent()
const { required, ckIPv4 } = useRules()
// variables
const newDevice = reactive({
  name: '',
  deviceId: makeUid(12),
  ipaddress: ''
})

// functions
const makeNewDeviceId = () => {
  newDevice.deviceId = makeUid(12)
}
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-form @submit="onDialogOK(newDevice)">
        <!-- name -->
        <q-card-section>
          <div class="q-px-sm">
            <div class="dialogName">Q-SYS Device Add</div>
          </div>
        </q-card-section>
        <!-- input list -->
        <q-card-section class="q-py-none">
          <div class="q-px-sm">
            <q-input
              v-model="newDevice.name"
              dense
              outlined
              label="Name"
              :rules="[required]"
              lazy-rules
            />
            <q-input
              v-model="newDevice.deviceId"
              dense
              outlined
              label="Device ID"
              :rules="[required, (val) => fnExist({ deviceId: val })]"
              lazy-rules
            >
              <template #append>
                <q-icon
                  class="cursor-pointer"
                  name="refresh"
                  color="primary"
                  @click="makeNewDeviceId"
                />
              </template>
            </q-input>
            <q-input
              v-model="newDevice.ipaddress"
              dense
              outlined
              label="IP Address"
              :rules="[required, ckIPv4, (val) => fnExist({ ipaddress: val })]"
              lazy-rules
            />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <div class="q-px-sm">
            <q-btn round flat color="red-10" icon="cancel" @click="onDialogCancel" />
            <q-btn round flat no-caps color="primary" icon="check_circle" type="submit" />
          </div>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.dialogN ame {
  font-size: 1rem;
  font-family: ubuntumono;
  font-weight: bold;
}
</style>
