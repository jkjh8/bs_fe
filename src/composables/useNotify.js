import { useQuasar } from 'quasar'

export default function useNotify() {
  const $q = useQuasar()
  const fnNotiInfo = (msg, caption, location) => {
    $q.notify({
      type: 'positive',
      message: msg,
      caption: caption,
      position: location ? location : 'top',
      actions: [
        {
          icon: 'close',
          color: 'white',
          round: true,
          dense: true
        }
      ]
    })
  }
  const fnNotiError = (msg, caption, location) => {
    $q.notify({
      type: 'negative',
      message: msg,
      caption: caption ? caption : '',
      position: location ? location : 'top',
      actions: [
        {
          icon: 'close',
          color: 'white',
          round: true,
          dense: true
        }
      ]
    })
  }
  const fnNotiFB = (res) => {
    let msg
    let caption
    switch (res.status) {
      case 401:
        msg = '인증 오류'
        caption = '로그인 후에 다시 시도해 주세요.'
        break
      case 403:
        msg = '권한 오류'
        caption = '해당 서비스에 대한 권한이 없습니다.'
        break
      default:
        msg = '서버 오류'
        caption = '서버 오류가 발생하였습니다. 잠시 후에 다시 시도 해주세요.'
        break
    }

    $q.notify({
      type: 'negative',
      message: msg,
      caption: caption,
      position: 'top',
      actions: [{ icon: 'close', color: 'white', round: true, dense: true }]
    })
  }
  return { fnNotiInfo, fnNotiError, fnNotiFB }
}
