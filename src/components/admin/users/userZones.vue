<script setup>
import { onMounted, ref, computed } from 'vue'
import { useUsersFunc } from 'composables/user/useUsers'
import { qsys, fnGetQsys } from 'composables/qsys/useQsys'
const props = defineProps(['user'])
const { fnUserZones } = useUsersFunc()

const zonesName = ref([])
const userZonesName = async (zones) => {
  if (zones && zones.length) {
    for (let id of zones) {
      zonesName.value.push(qsys.value[qsys.value.findIndex((e) => e.deviceId === id)].name)
    }
  }
}

const names = computed(() => {
  const zones = props.user.zones
  if (zones && zones.length) {
    const r = []
    for (let id of zones) {
      const idx = qsys.value.findIndex((e) => e.deviceId === id)
      if (idx !== -1) {
        r.push(qsys.value[idx].name)
      }
    }
    return r.join(', ')
  } else {
    return 'N/A'
  }
})

onMounted(async () => {
  await fnGetQsys()
})
</script>

<template>
  <div class="row justify-center items-center q-gutter-x-sm">
    <span>
      {{ names }}
    </span>
    <span>
      <q-icon
        class="cursor-pointer"
        size="xs"
        name="edit"
        color="primary"
        @click="fnUserZones(user)"
      />
    </span>
  </div>
</template>

<style scoped></style>
