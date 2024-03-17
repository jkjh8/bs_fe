import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import moment from 'moment'

import ConfirmDialog from 'components/dialog/confirmDialog.vue'
import SelectQsys from 'components/dialog/zones/selectQsys.vue'

import useNotify from 'composables/useNotify'

moment.locale = 'ko-KR'

const users = ref([])

const useUsersFunc = () => {
  const $q = useQuasar()
  const { fnNotiFB } = useNotify()

  const fnGetUsers = async () => {
    try {
      const r = await api.get('/users')
      users.value = r.data.users
    } catch (error) {
      fnNotiFB(err.response)
    }
  }

  const fnSetAdmin = (user) => {
    $q.dialog({
      component: ConfirmDialog,
      componentProps: {
        icon: 'check',
        iconColor: 'green',
        title: user.isAdmin ? '관리자 권한 해제' : '관리자 권한 설정',
        message: user.isAdmin
          ? '관리자 권한을 해제하시겠습니까?'
          : '관리자 권한을 설정하시겠습니까?'
      }
    }).onOk(async () => {
      $q.loading.show()
      try {
        await api.put('/users/admin', { user })
        await fnGetUsers()
        $q.loading.hide()
      } catch (error) {
        $q.loading.hide()
        fnNotiFB(error)
      }
    })
  }

  const fnUserZones = async (user) => {
    $q.dialog({
      component: SelectQsys,
      componentProps: {
        zones: user.zones
      }
    }).onOk(async (selected) => {
      $q.loading.show()
      try {
        await api.put('/users', { user, update: { zones: selected } })
        await fnGetUsers()
        $q.loading.hide()
      } catch (error) {
        $q.loading.hide()
        fnNotiFB(error)
      }
    })
  }

  const fnDeleteUser = (user) => {
    $q.dialog({
      component: ConfirmDialog,
      componentProps: {
        icon: 'delete',
        iconColor: 'red-10',
        title: '사용자 삭제',
        message: `${user.name} - ${user.email} 사용자를 삭제 하시겠습니까?`
      }
    }).onOk(async () => {
      $q.loading.show()
      try {
        await api.delete('/users', { data: { user } })
        await fnGetUsers()
        $q.loading.hide()
      } catch (error) {
        $q.loading.hide()
        fnNotiFB(error)
      }
    })
  }

  return { fnGetUsers, fnSetAdmin, fnUserZones, fnDeleteUser }
}

export { users, useUsersFunc }
