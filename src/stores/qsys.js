import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'boot/axios'

export const useQsysStore = defineStore('qsys', () => {
  const qsysDevices = ref([])

  async function getQsysDevices() {
    const r = await api.get('/devices/qsys')
    qsysDevices.value = r.data.devices
  }

  function updateQsysDevices(args) {
    qsysDevices.value = args
  }

  return { qsysDevices, getQsysDevices, updateQsysDevices }
})