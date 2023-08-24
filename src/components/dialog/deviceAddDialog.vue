<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useDialogPluginComponent } from 'quasar'
// composables
import useRules from 'src/composables/usrRules.js'
import makeId from 'src/composables/useMakeId.js'
import useExists from 'src/composables/useExists'
// emit
const emit = defineEmits([...useDialogPluginComponent.emits])
// variables
const { required, minNumber, maxNumber, ckIPv4 } = useRules()
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
const newDevice = reactive({
  name: '',
  deviceId: '',
  ipaddress: '',
  port: '',
  deviceType: {
    deviceType: '',
    model: ''
  }
})
const { fnExist } = useExists()

// functions
const makeNewId = () => {
  newDevice.deviceId = makeId(8)
}

// lifecycle hooks
onMounted(() => {
  makeNewId()
})
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-form @submit="onDialogOK(newDevice)">
        <q-card-section>
          <div class="text-h6">ADD</div>
        </q-card-section>
        <q-card-section>
          <div class="q-px-sm">
            <!-- name -->
            <q-input
              v-model="newDevice.name"
              dense
              outlined
              label="Name"
              :rules="[required, (val) => fnExist({ name: val })]"
              lazy-rules
            />
            <!-- device id -->
            <q-input
              v-model="newDevice.deviceId"
              dense
              outlined
              label="Device Id"
              :rules="[required, (val) => fnExist({ deviceId: val })]"
              lazy-ruls
            >
              <template #append>
                <q-icon
                  class="cursor-pointer"
                  name="refresh"
                  color="primary"
                  @click="makeNewId"
                />
              </template>
            </q-input>
            <!-- ipaddress -->
            <q-input
              v-model="newDevice.ipaddress"
              dense
              outlined
              label="IP Address"
              :rules="[required, ckIPv4, (val) => fnExist({ ipaddress: val })]"
              lazy-rules
            />
            <q-select
              v-model="newDevice.deviceType.deviceType"
              dense
              outlined
              label="Device Type"
              :options="['Q-SYS', 'BARIX']"
              :rules="[required]"
              lazy-rules
            />
            <q-select
              v-if="newDevice.deviceType.deviceType === 'Q-SYS'"
              v-model="newDevice.deviceType.model"
              dense
              outlined
              label="Device Model"
              :options="['Core510', 'Core110f']"
              :rules="[required]"
              lazy-rules
            ></q-select>
            <q-select
              v-if="newDevice.deviceType.deviceType === 'BARIX'"
              v-model="newDevice.deviceType.model"
              dense
              outlined
              label="Device Model"
              :options="['Instreamer', 'Extreamer']"
              :rules="[required]"
              lazy-rules
            ></q-select>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            round
            flat
            color="red-10"
            icon="cancel"
            @click="onDialogCancel"
          />
          <q-btn
            round
            flat
            no-caps
            color="primary"
            icon="check_circle"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
