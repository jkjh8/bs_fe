import { api } from 'boot/axios'
import { fnUpdateUser } from 'src/composables/user'

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
            fnUpdateUser(r.data)
          } else {
            fnUpdateUser(null)
          }
        } catch (err) {
          console.error(`사용자 인증 오류: ${err}`)
          fnUpdateUser(null)
        }
        next()
        break
    }
  })
}
