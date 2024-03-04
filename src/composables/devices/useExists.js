import { api } from 'boot/axios'
export default function useDeviceExists() {
  const fnExist = async (val) => {
    const r = await api.get('/devices/exists', { params: { value: val } })
    console.log(r)
    if (r.data.result) {
      return 'This value has already been used'
    } else {
      return true
    }
  }

  return {
    fnExist
  }
}
