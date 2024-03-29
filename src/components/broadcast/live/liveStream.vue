<script setup>
import { ref, onMounted } from 'vue'
import { zoneSelected, useZones, rtSelZoneName } from 'composables/broadcast/useZones'
import { useFileFunc } from 'composables/files/useFileFunc'
import { fnRefreshFoldersAndFiles, selectedFile } from 'composables/files/useFiles'

const { fnSelZones } = useZones()
const { fnSelFile } = useFileFunc()
const broadcastMode = ref(null)

onMounted(async () => {
  await fnRefreshFoldersAndFiles()
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
      <div class="row no-wrap items-cetner">
        <div class="self-center">방송구간 선택</div>
        <q-space />
        <q-btn round flat icon="add_circle" color="primary" @click="fnSelZones(zoneSelected)" />
      </div>
      <div v-if="zoneSelected" class="q-gutter-xs">
        <q-badge v-for="zone in rtSelZoneName" :key="zone" :label="zone" />
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row no-wrap items-cetner">
        <div class="self-center">파일 선택</div>
        <q-space />
        <q-btn round flat icon="add_circle" color="primary" @click="fnSelFile()" />
      </div>
      <div
        v-if="selectedFile && selectedFile.length"
        class="row no-wrap items-center q-gutter-x-sm"
      >
        <q-btn round flat icon="play_arrow" color="primary" />
        <div>{{ selectedFile[0].name }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.border {
  border: 1px solid #eee;
}
</style>
