import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  function updateUser(usr) {
    user.value = usr
  }

  function getUserNickname() {
    if (user.value) {
      const nickname = user.value.name.charAt(0)
      return nickname.toUpperCase()
    }
    return null
  }
  return { user, updateUser, getUserNickname }
})
