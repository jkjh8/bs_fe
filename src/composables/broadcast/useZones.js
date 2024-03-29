import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import ZoneSelect from 'components/dialog/broadcast/zones/DLSelectZones.vue'
import { qsys } from 'composables/qsys/useQsys'

const zoneSelected = ref({})

const useZones = () => {
  const $q = useQuasar()

  const fnSelZones = (zones) => {
    $q.dialog({
      component: ZoneSelect,
      componentProps: {
        sel: zones
      }
    }).onOk((items) => {
      zoneSelected.value = items
    })
  }

  return { fnSelZones }
}

const rtSelZoneName = computed(() => {
  let rt = []
  for (let zone in zoneSelected.value) {
    let deviceId = zone
    let zones = zoneSelected.value[zone]
    let idx = qsys.value.findIndex((e) => e.deviceId === deviceId)
    if (idx !== -1) {
      if (zones.length === qsys.value[idx].ZoneStatus.length) {
        rt.push(`${qsys.value[idx].name} -- ALL`)
      } else {
        if (zones.length) {
          console.log(zones)
          let names = []
          for (let z of zones) {
            if (z.name) {
              names.push(z.name)
            } else {
              names.push(z.Zone)
            }
          }
          rt.push(`${qsys.value[idx].name}: ${names.join(', ')}`)
        }
      }
    }
  }
  return rt
})
export { zoneSelected, useZones, rtSelZoneName }
