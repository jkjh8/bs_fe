import { ref } from 'vue'
import { api } from 'boot/axios'

const gainStep = ref(2)

const fnGetGainStep = async () => {
  const r = await api.get('/setup/qsys/gainstep')
  if (r.data && r.data.value) {
    gainStep.value = r.data.value
  }
}

export { gainStep, fnGetGainStep }
