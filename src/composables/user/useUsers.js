import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import moment from 'moment'

import ConfirmDialog from 'components/dialog/confirmDialog.vue'

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

  return { fnGetUsers, fnSetAdmin }
}

export { users, useUsersFunc }
