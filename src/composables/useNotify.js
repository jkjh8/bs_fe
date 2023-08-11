import { useQuasar } from 'quasar'

export default function useNotify() {
  const $q = useQuasar()
  const info = (msg, caption) => {
    $q.notify({
      type: 'positive',
      message: msg,
      caption: caption,
      position: 'center',
      actions: [
        {
          icon: 'close',
          color: 'white',
          round: true
        }
      ]
    })
  }
  return { info }
}
