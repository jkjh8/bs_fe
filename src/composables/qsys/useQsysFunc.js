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

  const fnGTrs = (item) => {
    $q.dialog({
      component: ConfirmDialog,
      componentProps: {
        icon: 'warning',
        iconColor: 'yellow-8',
        title: '전송장치갱신',
        message: `${item.name} - ${item.ipaddress} 네트워크 전송 채널을 재수집합니다.`
      }
    }).onOk(async () => {
      try {
        $q.loading.show()
        await api.get('/devices/qsys/gtrs', { params: { deviceId: item.deviceId } })
        await fnGetQsys()
        $q.loading.hide()
      } catch (error) {
        $q.loading.hide()
        console.error(error)
      }
    })
  }

  const fnSTrs = (item) => {
    $q.dialog({
      component: ConfirmDialog,
      componentProps: {
        icon: 'warning',
        iconColor: 'yellow-8',
        title: '전송장치재설정',
        message: `${item.name} - ${item.ipaddress} 네트워크 전송 채널을 재설정합니다.`
      }
    }).onOk(async () => {
      try {
        $q.loading.show()
        await api.put('/devices/qsys/strs', { device: item })
        $q.loading.hide()
      } catch (error) {
        $q.loading.hide()
        console.error(error)
      }
    })
  }

  const fnCancelAll = (device) => {
    $q.dialog({
      component: ConfirmDialog,
      componentProps: {
        icon: 'cancel',
        iconColor: 'orange',
        title: '방송 강제 취소',
        message: `${device.name} - ${device.ipaddress}의 진행중인 방송을 취소하시겠습니까?`
      }
    }).onOk(async () => {
      $q.loading.show()
      try {
        await api.get('/devices/qsys/cancel', { params: { deviceId: device.deviceId } })
        $q.loading.hide()
      } catch (error) {
        console.log(error)
        $q.loading.hide()
      }
    })
  }

  return {
    fnAddQsysDevice,
    fnDeleteQsysDevice,
    fnCancelAll,
    fnGTrs,
    fnSTrs
  }
}
