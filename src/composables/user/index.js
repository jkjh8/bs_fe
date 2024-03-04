import { ref } from 'vue'

const user = ref(null)

const fnUpdateUser = (usr) => {
  user.value = usr
}

const fnGetUserNickName = () => {
  if (user.value) {
    return user.value.name.charAt(0).toUpperCase()
  }
  return null
}

export { user, fnUpdateUser, fnGetUserNickName }
