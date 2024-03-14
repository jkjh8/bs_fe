import { api } from 'boot/axios'
import { user } from 'src/composables/user/useUser'

export default function (Router) {
  Router.beforeEach(async (to, from, next) => {
    switch (to.path) {
      case '/auth':
      case '/auth/signup':
        next()
        break
      default:
        try {
          const r = await api.get('/auth')
          if (r.data) {
            user.value = r.data
          } else {
            user.value = null
          }
        } catch (err) {
          console.error(`사용자 인증 오류: ${err}`)
          user.value = null
        }
        next()
        break
    }
  })
}
