import { useQuasar } from 'quasar'
import DLSelFile from 'components/dialog/broadcast/files/selectFile.vue'
import AddFolder from 'src/components/dialog/files/addFolder.vue'
import UploadFile from 'src/components/dialog/files/uploadFile.vue'
import { selectedFile } from 'composables/broadcast/useBroadcast'
import {
  selectedFiles,
  fnMakeFolder,
  selectedFolder,
  fnFileDownload,
  fnRenameFile,
  fnDeleteFiles,
  fnRefreshFoldersAndFiles
} from './useFiles'

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

  const fnSelFileForLive = () => {
    $q.dialog({
      component: DLSelFile
    }).onOk((file) => {
      selectedFile.value = file
      selectedFiles.value = []
    })
  }

  const fnMkDir = () => {
    $q.dialog({ component: AddFolder }).onOk(async (name) => {
      $q.loading.show()
      await fnMakeFolder(name)
      $q.loading.hide()
    })
  }
  const fnFileUP = () => {
    $q.dialog({
      component: UploadFile,
      componentProps: { folder: selectedFolder.value }
    }).onOk(async () => {
      $q.loading.show()
      await fnRefreshFoldersAndFiles()
      $q.loading.hide()
    })
  }

  const fnFileDN = async () => {
    if (!selectedFiles.value.length) return
    $q.loading.show()
    await fnFileDownload()
    $q.loading.hide()
  }

  const fnFileRename = () => {
    if (!selectedFile.value.length) return
    $q.dialog({
      component: RenameFile,
      componentProps: { current: selectedFiles.value[0] }
    }).onOk(async () => {
      $q.loading.show()
      await fnRenameFile()
      $q.loading.hide()
    })
  }

  const fnFileDel = async () => {
    if (!selectedFiles.value.length) return
    $q.loading.show()
    await fnDeleteFiles(selectedFile.value)
    $q.loading.hide()
  }
  const fnRefFileNFolder = async () => {
    $q.loading.show()
    await fnRefreshFoldersAndFiles()
    $q.loading.hide()
  }

  return {
    fnSelFile,
    fnMkDir,
    fnFileUP,
    fnFileDN,
    fnFileRename,
    fnFileDel,
    fnRefFileNFolder,
    fnSelFileForLive
  }
}
