import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDevicesStore = defineStore('devices', () => {
  const columns = [{ name: 'name', algin: 'center' }]
  const devices = ref([])
  return { devices }
})
