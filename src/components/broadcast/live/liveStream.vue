<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { qsys } from 'composables/qsys/useQsys'
const selected = ref({})
const broadcastMode = ref(null)

onBeforeMount(() => {
  for (let i = 0; i < qsys.value.length; i++) {
    selected.value[qsys.value[i].deviceId] = []
  }
  console.log(selected.value)
})
</script>

<template>
  <q-card flat class="q-px-md">
    <q-card-section>
      <div>방송모드 선택</div>
      <div>
        <q-select
          v-model="broadcastMode"
          :options="['실시간', 'TTS', '파일재생']"
          filled
          label="방송모드"
        ></q-select>
      </div>
    </q-card-section>
    <q-card-section>
      <div>방송구간 선택</div>
      <q-table
        :rows="qsys[0].ZoneStatus"
        :columns="[]"
        row-key="Zone"
        selection="multiple"
        v-model:selected="selected[qsys[0].deviceId]"
        grid
        grid-header
        :pagination="{ rowsPerPage: 0 }"
        hide-header
        hide-bottom
      >
        <template v-slot:header="scope">
          <div>
            <q-checkbox v-model="scope.selected" />
            {{ qsys[0].name }}
          </div>
        </template>
        <template v-slot:item="props">
          <div
            class="q-pa-xs col-4 grid-style-transition"
            :style="props.selected ? 'transform: scale(0.95);' : ''"
          >
            <div
              class="border"
              :class="props.selected ? ($q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2') : ''"
            >
              <div class="q-pa-sm">
                <q-checkbox dense v-model="props.selected" :label="props.row.name ?? 'No Name'" />
              </div>
            </div>
          </div>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.border {
  border: 1px solid #eee;
}
</style>
