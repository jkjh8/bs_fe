import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { fnGetBarix } from './useBarix'

import DeviceAdd from 'components/dialog/devices/addDevice.vue'
import ConfirmDialog from 'components/dialog/confirmDialog'

export const useBarixFunc = () => {
  const $q = useQuasar()

  const fnAddBarixDevice = () => {
    console.log('add')
    $q.dialog({
      component: DeviceAdd,
      componentProps: {
        title: 'IP오디오 전송장치 추가',
        type: 'barix'
      }
    }).onOk(async (items) => {
      $q.loading.show()
      try {
        await api.post('/devices/barix', { ...items })
        await fnGetBarix()
        $q.loading.hide()
      } catch (error) {
        $q.loading.hide()
        console.error(error)
      }
    })
  }

  const fnDeleteBarixDevice = (item) => {
    $q.dialog({
      component: ConfirmDialog,
      componentProps: {
        icon: 'delete',
        iconColor: 'red',
        title: 'IP오디오 전송장치 삭제',
        message: `${item.name} - ${item.ipaddress}`
      }
    }).onOk(async () => {
      $q.loading.show()
      try {
        await api.delete('/devices/barix', { data: { ...item } })
        await fnGetBarix()
        $q.loading.hide()
      } catch (error) {
        $q.loading.hide()
        console.error(error)
      }
    })
  }

  return {
    fnAddBarixDevice,
    fnDeleteBarixDevice
  }
}
