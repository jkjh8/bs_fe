import { ref } from 'vue'

const broadcastMode = ref(null)
const selectedZones = ref({})
const selectedFile = ref([])

const fnResetBroadcast = () => {
  broadcastMode.value = null
  selectedZones.value = {}
  selectedFile.value = []
}

export { broadcastMode, selectedZones, selectedFile, fnResetBroadcast }
