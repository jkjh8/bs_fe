<script setup></script>

<template>
  <q-card class="q-px-md">
    <q-card-section>
      <div>
        <q-select
          v-model="broadcastMode"
          :options="['실시간', 'TTS', '파일재생']"
          filled
          label="방송모드"
        ></q-select>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
