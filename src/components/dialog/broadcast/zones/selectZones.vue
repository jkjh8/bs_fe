<script setup>
import { ref, onBeforeMount } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { qsysZones, fnGetQsys } from 'composables/qsys/useQsys'

const { dialogRef, onDialogCancel, onDialogHide, onDialogOK } = useDialogPluginComponent()
const props = defineProps(['sel'])
const emit = defineEmits([...useDialogPluginComponent.emits])

const selected = ref({})
const zones = qsysZones()

const fnSelectAll = () => {
  for (const item of zones) {
    selected.value[item.deviceId] = [...item.ZoneStatus]
  }
}

onBeforeMount(async () => {
  await fnGetQsys()
  for (let i = 0; i < zones.length; i++) {
    selected.value[zones[i].deviceId] = []
  }
  if (props.sel) {
    for (let z in props.sel) {
      if (props.sel[z].length) {
        selected.value[z] = props.sel[z]
      }
    }
  }
})
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card style="max-width: 90%">
      <q-card-section>
        <div class="row no-wrap q-gutter-x-xs items-center">
          <q-icon name="location_on" color="primary" size="24px" />
          <div class="title">방송구간선택</div>
          <q-space />
          <q-btn flat round icon="select_all" color="primary" @click="fnSelectAll">
            <q-tooltip>전체선택</q-tooltip>
          </q-btn>
        </div>
      </q-card-section>
      <div v-for="item in zones" :key="item._id" class="q-px-md">
        <q-table
          :rows="item.ZoneStatus"
          :columns="[]"
          row-key="zone"
          selection="multiple"
          v-model:selected="selected[item.deviceId]"
          grid
          grid-header
          :pagination="{ rowsPerPage: 0 }"
          hide-header
          hide-bottom
          @update:selected="console.log(selected)"
        >
          <template #header="scope">
            <div class="row no-wrap items-center">
              <q-checkbox v-model="scope.selected" />
              <div class="text-bold">
                {{ item.name }}
              </div>
            </div>
          </template>
          <template #item="props">
            <div
              class="q-pa-xs col-xs-6 col-sm-3 col-md-2 col-lg-1 grid-style-transition"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <div
                class="border"
                :class="props.selected ? ($q.dark.isActive ? 'bg-grey-10' : 'bg-grey-3') : ''"
              >
                <div class="q-pa-sm">
                  <q-checkbox
                    dense
                    v-model="props.selected"
                    :label="
                      props.row.name
                        ? `${props.row.zone}. ${props.row.name}`
                        : `${props.row.zone}. No Name`
                    "
                  />
                </div>
              </div>
            </div>
          </template>
        </q-table>
      </div>
      <q-card-actions align="right">
        <div class="q-px-sm">
          <q-btn round flat color="red-10" icon="cancel" @click="onDialogCancel" />
          <q-btn
            round
            flat
            no-caps
            color="primary"
            icon="check_circle"
            @click="onDialogOK(selected)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.border {
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
