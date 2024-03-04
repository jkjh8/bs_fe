import { api } from 'boot/axios'

export default async function qsysExists(val) {
  const r = await api.get('/devices/qsys/exists', { params: { value: val } })
  if (r.data.result) {
    return '이미 사용중인 값입니다.'
  } else {
    return true
  }
}
