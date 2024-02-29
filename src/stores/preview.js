import { defineStore } from 'pinia'
import { ref } from 'vue'
import { mediaUrl } from 'src/boot/axios'
export const usePreviewStore = defineStore('preview', () => {
  const modal = ref(false)
  const previewFile = ref(null)
  const audioplayer = ref(null)
  const duration = ref(0)
  const currentTime = ref(0)
  const time = ref(0)
  const playStatus = ref(false)

  function setSource() {
    audioplayer.value.src = mediaUrl + '/' + previewFile.value.path
    playStatus.value = false
  }

  function updateTime() {
    time.value = currentTime.value / duration.value
  }

  function initAudioPlayer() {
    audioplayer.value.ondurationchange = () => {
      duration.value = audioplayer.value.duration
    }
    audioplayer.value.ontimeupdate = () => {
      currentTime.value = audioplayer.value.currentTime
      updateTime()
    }
    audioplayer.value.onplaying = () => {
      playStatus.value = true
    }
    audioplayer.value.onpause = () => {
      playStatus.value = false
    }
    audioplayer.value.onended = () => {
      playStatus.value = false
    }
    audioplayer.value.onplay = () => {
      playStatus.value = true
    }
  }

  return { previewFile, modal, audioplayer, setSource, time, initAudioPlayer, playStatus }
})
