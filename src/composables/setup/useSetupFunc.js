import ZoneNameDialog from 'components/dialog/zoneName.vue'
import { fnGetQsys } from '../qsys/useQsys'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const useSetupFunc = () => {
  const $q = useQuasar()

  const fnRefreshAllQsysStreamAddr = async (deviceId) => {
    try {
      $q.loading.show()
      await api.get('/devices/qsys/refreshall', { params: { deviceId } })
      $q.loading.hide()
    } catch (error) {
      console.log(error)
      $q.loading.hide()
    }
  }

  const modifyZoneName = (name, zone, deviceId) => {
    $q.dialog({
      component: ZoneNameDialog,
      componentProps: {
        currentName: name,
        zone: zone
      }
    }).onOk(async (modifiedName) => {
      $q.loading.show()
      await api.put('/devices/qsys/modifiedzonename', {
        deviceId: deviceId,
        zone,
        name: modifiedName
      })
      await fnGetQsys()
      $q.loading.hide()
    })
  }

  return { fnRefreshAllQsysStreamAddr, modifyZoneName }
}

export { useSetupFunc }
