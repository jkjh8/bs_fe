import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

import deviceAdd from 'components/dialog/devices/addDevice.vue'

export const useQsysFunc = () => {
  const $q = useQuasar()

  const AddQsysDevice = () => {
    $q.dialog({
      component: deviceAdd,
      componentProps: {
        title: '주장치 추가',
        type: 'qsys'
      }
    })
  }

  return {
    AddQsysDevice
  }
}
