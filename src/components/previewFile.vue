<script setup>
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { storeToRefs } from 'pinia'
import { usePreviewStore } from 'src/stores/preview.js'
const { audioplayer, modal, previewFile, time, playStatus } = storeToRefs(usePreviewStore())
</script>

<template>
  <audio ref="audioplayer" />
  <q-dialog v-model="modal" seamless position="bottom">
    <q-card style="width: 350px">
      <q-linear-progress :value="time" color="primary" />

      <q-card-section class="row items-center no-wrap">
        <div>
          <div>{{ previewFile.name }}</div>
        </div>
        <q-space />
        <q-btn
          v-if="playStatus"
          flat
          round
          icon="pause"
          color="yellow-8"
          @click="audioplayer.pause()"
        />
        <q-btn v-else flat round icon="play_arrow" color="primary" @click="audioplayer.play()" />
        <q-btn flat round icon="close" v-close-popup @click="audioplayer.pause()" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
