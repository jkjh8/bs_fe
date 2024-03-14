<script setup>
import moment from 'moment'
moment.locale = 'ko-KR'
const props = defineProps(['time'])
</script>

<template>
  <div class="time-font">
    <div>{{ moment(time).format('YYYY-MM-DD') }}</div>
    <div>{{ moment(time).format('hh:mm:ss A') }}</div>
  </div>
</template>

<style scoped>
.time-font {
  font-size: 10px;
}
</style>
