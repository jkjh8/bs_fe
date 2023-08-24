import { useQuasar } from 'quasar'

export default function useNotify() {
  const $q = useQuasar()
  const notifyInfo = (msg, caption, location) => {
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
  const notifyError = (msg, caption, location) => {
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
  const notifyErrorFeedback = (res) => {
    let msg
    let caption
    switch (res.status) {
      case 401:
        msg = 'Unauthorized'
        caption = 'please login to use this service and try again'
        break
      case 403:
        msg = 'Forbidden'
        caption = 'do not have permission to use this service'
        break
      default:
        msg = 'Internal server error'
        caption =
          'A server error has occurred. Please try again in a few minutes'
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
  return { notifyInfo, notifyError, notifyErrorFeedback }
}
