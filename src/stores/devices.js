import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
export const useDevicesStore = defineStore('devices', () => {
  const $q = useQuasar()

  const devices = ref([])
  async function addDevice(device) {
    try {
      $q.loading.show()
      await api.post('/devices', { ...device })
      const r = await api.get('/devices')
      devices.value = r.data.devices
      $q.loading.hide()
    } catch (err) {
      $q.loading.hide()
      console.error(err)
    }
  }
  async function updateDevices() {
    try {
      $q.loading.show()
      const r = await api.get('/devices')
      devices.value = r.data.devices
      $q.loading.hide()
    } catch (err) {
      $q.loading.hide()
      console.error(err)
    }
  }
  async function removeDevice(args) {
    try {
      $q.loading.show()
      await api.delete('/devices', { data: { ...args } })
      const r = await api.get('/devices')
      devices.value = r.data.devices
      $q.loading.hide()
    } catch (err) {
      $q.loading.hide()
      console.error(err)
    }
  }
  return { devices, updateDevices, addDevice, removeDevice }
})
