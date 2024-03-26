<script setup>
import { ref } from 'vue'
import BroadcastStatusTree from 'components/broadcast/status/broadcastStatusTree.vue'
import LiveStream from 'components/broadcast/live/liveStream.vue'

const splitterModel = ref(40)
const broadcastMode = ref(null)
</script>

<template>
  <div class="q-pa-md">
    <div class="borderd">
      <div class="q-px-lg q-py-sm row items-center bg-grey-2">
        <div class="row no-wrap items-center q-gutter-x-sm">
          <q-icon name="mic" size="20px" color="primary" />
          <span class="text-h6 bold">실시간 방송</span>
        </div>
      </div>
      <div>
        <q-splitter v-model="splitterModel">
          <template v-slot:before>
            <div class="q-pa-sm">
              <BroadcastStatusTree />
            </div>
          </template>
          <template v-slot:after>
            <div class="q-pa-sm">
              <LiveStream />
            </div>
          </template>
        </q-splitter>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
