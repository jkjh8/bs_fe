import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  function updateUser(usr) {
    user.value = usr
  }
  return { user, updateUser }
})
