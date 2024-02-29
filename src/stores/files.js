import { defineStore } from 'pinia'
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { api } from 'boot/axios'

import AddFolder from 'src/components/dialog/addFolder.vue'
import UploadFile from 'src/components/dialog/uploadFile.vue'
import DeleteFiles from 'src/components/dialog/deleteFiles.vue'
import RenameFile from 'src/components/dialog/renameFile.vue'

export const useFilesStore = defineStore('files', () => {
  const $q = useQuasar()

  const files = ref([])
  const folders = ref([])
  const selectedFolder = ref('')
  const selectedFiles = ref([])
  const globalFolder = ref('')
  const userFolder = ref('')

  const makeFolder = () => {
    $q.dialog({
      component: AddFolder
    }).onOk(async (name) => {
      if (!name) return
      $q.loading.show()
      try {
        await api.post('/files/newfolder', {
          folder: selectedFolder.value,
          name: name
        })
      } catch (error) {
        $q.loading.hide()
        console.error(error)
      }
      await refreshFoldersAndFiles()
      $q.loading.hide()
    })
  }

  async function getFolders() {
    try {
      const r = await api.get('/files/dir')
      folders.value = r.data.folders
      globalFolder.value = r.data.globalFolder
      userFolder.value = r.data.userFolder
      if (!selectedFolder.value) {
        selectedFolder.value = globalFolder.value
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function getFiles(folder) {
    try {
      selectedFiles.value = []
      const r = await api.get('/files', { params: { folder: folder } })

      if (folder === globalFolder.value || folder === userFolder.value) {
        files.value = r.data.files
      } else {
        const currentPathArr = folder.split('/')
        currentPathArr.pop()
        files.value = [
          { name: '..', fullpath: currentPathArr.join('/'), type: 'folder' },
          ...r.data.files
        ]
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function fileUpload() {
    $q.dialog({
      component: UploadFile,
      componentProps: {
        folder: selectedFolder.value
      }
    }).onOk(async () => {
      $q.loading.show()
      await refreshFoldersAndFiles()
      $q.loading.hide()
    })
  }

  async function removeFile() {
    if (!selectedFiles.value.length) return
    $q.dialog({
      component: DeleteFiles,
      componentProps: {
        files: selectedFiles.value
      }
    }).onOk(async () => {
      $q.loading.show()
      await deleteFiles(selectedFiles.value)
      await refreshFoldersAndFiles()
      $q.loading.hide()
    })
  }

  const fileDownload = async () => {
    if (!selectedFiles.value.length) return
    $q.loading.show()
    try {
      const r = await api.get('/files/download', {
        params: { files: JSON.stringify(selectedFiles.value) },
        responseType: 'blob'
      })
      $q.loading.hide()
      const url = window.URL.createObjectURL(new Blob([r.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'download.zip')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      $q.loading.hide()
      console.error(error)
    }
    selectedFiles.value = []
  }

  const renameFile = async () => {
    $q.dialog({
      component: RenameFile,
      componentProps: {
        current: selectedFiles.value[0]
      }
    }).onOk(async (obj) => {
      if (!obj && !Object.keys(obj).length) return
      $q.loading.show()
      await api.put('/files/rename', { ...obj })
      await refreshFoldersAndFiles()
      $q.loading.hide()
    })
  }

  async function updateSelectedFolder(val) {
    selectedFolder.value = val
    await getFiles(val)
  }

  async function deleteFiles(fileList) {
    await api.delete('/files', { data: { files: fileList } })
  }

  async function refreshFoldersAndFiles() {
    await getFolders()
    await getFiles(selectedFolder.value)
    selectedFiles.value = []
  }
  return {
    files,
    folders,
    selectedFolder,
    selectedFiles,
    getFolders,
    getFiles,
    updateSelectedFolder,
    deleteFiles,
    makeFolder,
    fileUpload,
    removeFile,
    fileDownload,
    renameFile,
    refreshFoldersAndFiles
  }
})
