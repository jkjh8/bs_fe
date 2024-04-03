import { reactive, ref } from 'vue'
import { LocalStorage } from 'quasar'

const auth = reactive({ userEmail: '', userPass: '' })
const rememberCheck = ref('')
const token = ref('')

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

export { auth, rememberCheck, token, getEmailFromStorage, setEmailToStorage }
