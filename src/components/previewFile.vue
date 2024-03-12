<script setup>
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import {
  audioPlayer,
  modal,
  previewFile,
  fnStartPreview,
  playStatus,
  playTime
} from 'composables/files/usePreview'
</script>

<template>
  <audio ref="audioPlayer" />
  <q-dialog v-model="modal" seamless position="bottom">
    <q-card style="width: 350px">
      <q-linear-progress :value="playTime" color="primary" />

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
          @click="audioPlayer.pause()"
        />
        <q-btn v-else flat round icon="play_arrow" color="primary" @click="audioPlayer.play()" />
        <q-btn flat round icon="close" v-close-popup @click="audioPlayer.pause()" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
