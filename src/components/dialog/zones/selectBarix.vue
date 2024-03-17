<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useDialogPluginComponent } from 'quasar'
import { api } from 'boot/axios'
import { barix, fnGetBarix } from 'composables/barix/useBarix'

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const props = defineProps({ zone: Object })
const emit = defineEmits([...useDialogPluginComponent.emits])

const $q = useQuasar()
const selected = ref(null)
const options = ref([])

const filterFn = (val, update, abort) => {
  update(() => {
    options.value = barix.value.filter((v) => v.name.indexOf(val) > -1)
  })
}

const dub = () => {
  $q.notify({
    type: 'negative',
    icon: 'warning',
    position: 'top',
    message: '네트워크 방송 송출 지역이 이미 사용중입니다.'
  })
}

const onOkDialog = async () => {
  if (selected.value === null) {
    onDialogOK({ selected: selected.value, ipaddress: '' })
  } else {
    const r = await api.get('/devices/qsys/existszone', { params: { id: selected.value } })
    if (r.data && r.data.value && r.data.value.length) {
      const zones = r.data.value[0].ZoneStatus
      const idx = zones.findIndex((v) => v.destination === selected.value)
      if (idx === props.zone.Zone - 1) {
        return onDialogHide()
      }
      return dub()
    } else {
      onDialogOK({
        selected: selected.value,
        ipaddress: barix.value[barix.value.findIndex((v) => v._id === selected.value)].ipaddress
      })
    }
  }
}

onMounted(async () => {
  await fnGetBarix()
  options.value = barix.value
  if (props.zone.destination && props.zone.destination._id) {
    selected.value = props.zone.destination._id
  }
  console.log(props.zone)
})
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="border-radius: 0.6rem">
      <q-card-section>
        <div class="q-px-sm">
          <div class="dialogName">방송구간 선택</div>
        </div>
      </q-card-section>
      <q-card-section>
        <div>
          <q-select
            filled
            dense
            v-model="selected"
            :options="options"
            label="방송구간선택"
            option-value="_id"
            option-label="name"
            hide-selected
            use-input
            fill-input
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
