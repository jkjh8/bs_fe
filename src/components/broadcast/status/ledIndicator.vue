<script setup>
import { ref, computed } from 'vue'
const props = defineProps(['barix'])

const color = computed(() => {
  if (props.barix.status) {
    if (props.barix.streamurl) {
      return '#00a000'
    } else {
      return '#ffff00'
    }
  } else {
    return '#8b0000'
  }
})
</script>

<template>
  <div class="led"></div>
</template>

<style scoped>
.led {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: v-bind('color');
}
</style>
