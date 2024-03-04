import { reactive, ref } from 'vue'
import { LocalStorage } from 'quasar'

export default function useAuth() {
  // Variables

  const auth = reactive({ userEmail: '', userPass: '' })
  const rememberCheck = ref('')

  // Functions
  const getEmailFromStorage = () => {
    const email = LocalStorage.getItem('rememberEmail')
    if (email) {
      auth.userEmail = email
      rememberCheck.value = true
    } else {
      rememberCheck.value = false
    }
  }
  const setEmailToStorage = () => {
    if (rememberCheck.value) {
      LocalStorage.set('rememberEmail', auth.userEmail)
    } else {
      LocalStorage.remove('rememberEmail')
    }
  }

  return {
    auth,
    rememberCheck,
    getEmailFromStorage,
    setEmailToStorage
  }
}
