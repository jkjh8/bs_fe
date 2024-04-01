import { ref } from 'vue'
import { api } from 'boot/axios'

const files = ref([])
const folders = ref([])
const selectedFolder = ref('')
const selectedFiles = ref([])
const selectedFile = ref([])
const globalFolder = ref('')
const userFolder = ref('')

const fnMakeFolder = async (name) => {
  try {
    await api.post('/files/newfolder', {
      folder: selectedFolder.value,
      name
    })
    await fnRefreshFoldersAndFiles()
  } catch (error) {
    console.error(error)
  }
}

const fnGetFolders = async () => {
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

const fnGetFiles = async (folder) => {
  try {
    selectedFiles.value = []
    const r = await api.get('/files', { params: { folder: folder } })

    if (folder === globalFolder.value || folder === userFolder.value) {
      files.value = r.data.files
    } else {
      console.log(folder)
      const currentPathArr = folder.split('\\')
      currentPathArr.pop()
      files.value = [
        { name: '..', fullpath: currentPathArr.join('\\'), type: 'folder' },
        ...r.data.files
      ]
    }
  } catch (error) {
    console.error(error)
  }
}

const fnFileDownload = async () => {
  try {
    const r = await api.get('/files/download', {
      params: { files: JSON.stringify(selectedFiles.value) },
      responseType: 'blob'
    })
    const url = window.URL.createObjectURL(new Blob([r.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'download.zip')
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error(error)
  }
  selectedFiles.value = []
}

const fnRenameFile = async (obj) => {
  try {
    await api.put('files/rename', { ...obj })
    await fnRefreshFoldersAndFiles()
  } catch (error) {
    console.error(error)
  }
}

async function fnUpdateSelectedFolder(val) {
  selectedFolder.value = val
  await fnGetFiles(val)
  selectedFiles.value = []
}

async function fnDeleteFiles() {
  try {
    await api.delete('/files', { data: { files: selectedFiles.value } })
    await fnRefreshFoldersAndFiles()
  } catch (error) {
    console.error(error)
  }
}

async function fnRefreshFoldersAndFiles() {
  await fnGetFolders()
  await fnGetFiles(selectedFolder.value)
  selectedFiles.value = []
}

export {
  files,
  folders,
  selectedFile,
  selectedFiles,
  selectedFolder,
  globalFolder,
  userFolder,
  fnMakeFolder,
  fnGetFolders,
  fnGetFiles,
  fnFileDownload,
  fnDeleteFiles,
  fnRenameFile,
  fnUpdateSelectedFolder,
  fnRefreshFoldersAndFiles
}
