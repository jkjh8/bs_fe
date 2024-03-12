import { ref } from 'vue'
import { api } from 'boot/axios'

const barix = ref([])

const fnGetBarix = async () => {
  try {
    const r = await api.get('/devices/barix')
    barix.value = r.data.devices
    console.log(barix.value)
  } catch (error) {
    console.error(error)
  }
}

export { barix, fnGetBarix }
