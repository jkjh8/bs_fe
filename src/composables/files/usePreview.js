import { ref } from 'vue'

import { mediaUrl } from 'boot/axios'

const modal = ref(false)
const previewFile = ref(null)
const audioPlayer = ref(null)
const duration = ref(0)
const currentTime = ref(0)
const playTime = ref(0)
const playStatus = ref(false)

const fnSetSource = () => {
  audioPlayer.value.src = `${mediaUrl}/${previewFile.value.path}`
  playStatus.value = false
}

const fnUpdateTime = () => {
  playTime.value = currentTime.value / duration.value
}

const fnInitAudioPlayer = () => {
  audioPlayer.value.ondurationchange = () => {
    duration.value = audioPlayer.value.duration
  }
  audioPlayer.value.ontimeupdate = () => {
    currentTime.value = audioPlayer.value.currentTime
    fnUpdateTime()
  }
  audioPlayer.value.onplaying = () => {
    playStatus.value = true
  }
  audioPlayer.value.onpause = () => {
    playStatus.value = false
  }
  audioPlayer.value.onended = () => {
    playStatus.value = false
  }
  audioPlayer.value.onplay = () => {
    playStatus.value = true
  }
}

const fnStartPreview = (file) => {
  console.log(file)
  previewFile.value = file
  modal.value = true
  fnSetSource()
}

export {
  modal,
  previewFile,
  audioPlayer,
  playTime,
  fnSetSource,
  fnUpdateTime,
  fnInitAudioPlayer,
  playStatus,
  fnStartPreview
}
