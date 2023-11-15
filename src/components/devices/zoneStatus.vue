<script setup>
const props = defineProps({
  zones: Array
})

function checkPriority(priority) {
  switch (priority) {
    case 1:
      return 'bg-red'
    case 3:
    case 4:
      return 'bg-yellow'
    default:
      return ''
  }
}
</script>

<template>
  <div class="row q-pa-md q-gutter-sm">
    <div v-for="(zone, idx) in zones" :key="idx">
      <div
        class="borderd q-pa-sm q-gutter-sx"
        :class="zone.Active ? checkPriority(zone.Priority) : ''"
      >
        <div>
          <span class="text-grey">Zone </span>
          <span>
            {{ zone.Zone }}
          </span>
        </div>
        <div class="text-grey">{{ zone.name ?? 'No Name' }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
