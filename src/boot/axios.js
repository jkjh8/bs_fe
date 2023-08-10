import { boot } from 'quasar/wrappers'
import axios from 'axios'

let api

export default boot(({ app }) => {
  const apiUrl =
    process.env.NODE_ENV === 'production'
      ? '/api'
      : `http://${window.location.hostname}:3000/api`
  api = axios.create({ baseURL: apiUrl })

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
