import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'boot/axios'

export const useFilesStore = defineStore('files', () => {
  const files = ref([])
  const folders = ref([])
  const selectedFolder = ref('')
  const selectedFiles = ref([])
  const globalFolder = ref('')
  const userFolder = ref('')

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

  async function updateSelectedFolder(val) {
    selectedFolder.value = val
    await getFiles(val)
  }

  async function newFolder(name) {
    await api.post('/files/newfolder', {
      folder: selectedFolder.value,
      name: name
    })
  }

  return {
    files,
    folders,
    selectedFolder,
    selectedFiles,
    getFolders,
    getFiles,
    updateSelectedFolder,
    newFolder
  }
})
