<script setup>
import { useRouter } from 'vue-router'
// Props
const props = defineProps({
  message: String,
  linkName: String,
  link: String
})
const router = useRouter()
</script>

<template>
  <div class="row no-wrap">
    <span class="text-grey-9">{{ props.message }}</span>
    <div
      class="alink no-decoration text-purple text-bold cursor-pointer q-ml-sm"
      @click="router.push(props.link)"
    >
      {{ props.linkName }}
    </div>
  </div>
</template>

<style scoped></style>
