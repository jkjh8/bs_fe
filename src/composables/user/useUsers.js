import { ref } from 'vue'
import { api } from 'boot/axios'
import moment from 'moment'
import useNotify from 'composables/useNotify'

moment.locale = 'ko-KR'

const users = ref([])

const useUsersFunc = () => {
  const { notifyErrorFeedback } = useNotify()

  const fnGetUsers = async () => {
    try {
      const r = await api.get('/users')
      users.value = r.data.users
    } catch (error) {
      notifyErrorFeedback(err.response)
    }
  }

  return { fnGetUsers }
}

export { users, useUsersFunc }
