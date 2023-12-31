import { boot } from 'quasar/wrappers'
import axios from 'axios'

let api
let apiUrl

export default boot(({ app }) => {
  apiUrl =
    process.env.NODE_ENV === 'production'
      ? '/api'
      : `http://${window.location.hostname}:3000/api`
  api = axios.create({ baseURL: apiUrl, withCredentials: true })

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api, apiUrl }
