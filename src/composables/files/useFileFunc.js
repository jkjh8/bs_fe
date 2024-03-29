import { useQuasar } from 'quasar'
import DLSelFile from 'components/dialog/broadcast/files/DLSelectFile.vue'
import { selectedFile } from './useFiles'

export const useFileFunc = () => {
  const $q = useQuasar()
  const fnSelFile = () => {
    $q.dialog({
      component: DLSelFile
    }).onOk((file) => {
      console.log(file)
      selectedFile.value = file
    })
  }
  return { fnSelFile }
}
