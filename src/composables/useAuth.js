import { ref } from 'vue'
import { LocalStorage } from 'quasar'
import { api } from 'boot/axios'

export default function useAuth() {
  // Variables
  const rememberEmail = ref(false)
  // Functions
  const getEmailFromStorage = () => {
    rememberEmail.value = LocalStorage.getItem('rememberEmail')
  }
  const setEmailToStorage = (value) => {
    LocalStorage.set('rememberEmail', value)
  }
  const getAuth = (user) => {
    try {
      const { userEmail, userPass, rememberEmail } = user
      setEmailToStorage(rememberEmail)
    } catch (err) {
      console.error(err)
    }
    console.log(user)
  }

  return {
    rememberEmail,
    getEmailFromStorage,
    setEmailToStorage,
    getAuth
  }
}
