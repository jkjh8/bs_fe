import { ref } from 'vue'
import { api } from 'boot/axios'

const qsys = ref([])

const fnGetQsys = async () => {
  try {
    const r = await api.get('/devices/qsys')
    qsys.value = r.data.devices
  } catch (error) {
    console.error(error)
  }
}

const fnUpdateZoneStatus = (deviceId, ZoneStatus) => {
  try {
    const idx = qsys.value.findIndex((e) => e.deviceId === deviceId)
    qsys.value[idx].ZoneStatus = ZoneStatus
  } catch (error) {
    console.error(error)
  }
}

const fnUpdateDevice = (deviceId, data) => {
  const idx = qsys.value.findIndex((e) => e.deviceId === deviceId)
  qsys.value[idx] = { ...qsys.value[idx], ...data }
}

export { qsys, fnGetQsys, fnUpdateZoneStatus, fnUpdateDevice }
