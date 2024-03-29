import { ref, computed } from 'vue'
import { api } from 'boot/axios'
import { user } from 'composables/user/useUser'

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

const qsysZones = () => {
  return qsys.value.map((device) => {
    return {
      _id: device._id,
      deviceId: device.deviceId,
      name: device.name,
      ipaddress: device.ipaddress,
      ZoneStatus: device.ZoneStatus.map((zone, i) => {
        return {
          zone: i + 1,
          name: zone.name
        }
      })
    }
  })
}

const permittedQsys = computed(() => {
  if (!user.value) return []
  if (user.value.isAdmin) return qsys.value
  const arr = qsys.value.filter((v) => {
    const ids = user.value.zones
    for (let i = 0; i < ids.length; i++) {
      if (ids[i] === v.deviceId) return true
    }
    return false
  })
  return arr
})

export { qsys, fnGetQsys, fnUpdateZoneStatus, fnUpdateDevice, qsysZones, permittedQsys }
