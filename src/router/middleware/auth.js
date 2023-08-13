import { api } from 'boot/axios'
import { useUserStore } from 'src/stores/user'

export default function (Router) {
  const { updateUser } = useUserStore()

  Router.beforeEach(async (to, from, next) => {
    switch (to.path) {
      case '/auth':
      case '/auth/signup':
        next()
        break
      default:
        try {
          const r = await api.get('/auth')
          console.log(r)
          if (r.data) {
            updateUser(r.data)
          } else {
            updateUser(null)
          }
        } catch (err) {
          console.error('Router Check User Error: ', err)
          updateUser(null)
        }
        next()
        break
    }
  })
}
