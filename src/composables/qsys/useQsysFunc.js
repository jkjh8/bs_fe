import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { fnGetQsys } from './useQsys'

import DeviceAdd from 'components/dialog/devices/addDevice.vue'
import ConfirmDialog from 'components/dialog/confirmDialog'

export const useQsysFunc = () => {
  const $q = useQuasar()

  const fnAddQsysDevice = () => {
    console.log('add')
    $q.dialog({
      component: DeviceAdd,
      componentProps: {
        title: '주장치 추가',
        type: 'qsys'
      }
    }).onOk(async (items) => {
      $q.loading.show()
      try {
        await api.post('/devices/qsys', { ...items })
        await fnGetQsys()
        $q.loading.hide()
      } catch (error) {
        $q.loading.hide()
        console.error(error)
      }
    })
  }

  const fnDeleteQsysDevice = (item) => {
    $q.dialog({
      component: ConfirmDialog,
      componentProps: {
        icon: 'delete',
        iconColor: 'red',
        title: '주장치 삭제',
        message: `${item.name} - ${item.ipaddress}`
      }
    }).onOk(async () => {
      $q.loading.show()
      try {
        await api.delete('/devices/qsys', { data: { ...item } })
        await fnGetQsys()
        $q.loading.hide()
      } catch (error) {
        $q.loading.hide()
        console.error(error)
      }
    })
  }

  return {
    fnAddQsysDevice,
    fnDeleteQsysDevice
  }
}
