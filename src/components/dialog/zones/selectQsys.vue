<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useDialogPluginComponent } from 'quasar'

import { qsys, fnGetQsys } from 'composables/qsys/useQsys'

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const props = defineProps({ zones: Array })
const emit = defineEmits([...useDialogPluginComponent.emits])

const $q = useQuasar()
const selected = ref([])
const options = ref([])

const filterFn = (val, update, abort) => {
  update(() => {
    options.value = qsys.value.filter((v) => v.name.indexOf(val) > -1)
  })
}

const onOkDialog = async () => {
  console.log(selected.value)
  onDialogOK(selected.value)
}

onMounted(async () => {
  await fnGetQsys()
  options.value = qsys.value
  selected.value = props.zones
})
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="q-dialog-plugin" style="border-radius: 0.6rem">
      <q-card-section>
        <div class="q-px-sm">
          <div class="dialogName">방송지역권한</div>
        </div>
      </q-card-section>
      <q-card-section>
        <div>
          <q-select
            filled
            dense
            v-model="selected"
            :options="options"
            multiple
            label="방송지역선택"
            option-value="deviceId"
            option-label="name"
            use-chips
            stack-label
            use-input
            input-debounce="0"
            emit-value
            map-options
            @filter="filterFn"
          >
            <template v-if="selected" v-slot:append>
              <q-icon
                name="cancel"
                size="18px"
                @click.stop.prevent="selected = null"
                class="cursor-pointer"
              />
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-icon name="storage" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.name }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.ipaddress }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <div class="q-px-sm">
          <q-btn round flat color="red-10" icon="cancel" @click="onDialogCancel" />
          <q-btn round flat no-caps color="primary" icon="check_circle" @click="onOkDialog" />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
