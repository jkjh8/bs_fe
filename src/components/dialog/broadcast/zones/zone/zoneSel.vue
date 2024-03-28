<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <q-checkbox
    :trueValue="modelValue.inCludes(1)"
    @update:model-value="emit('update:modelValue', !modelValue)"
  />
</template>

<style scoped></style>
