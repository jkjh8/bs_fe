<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
// components
import ConfirmDialog from 'src/components/dialog/confirmDialog'
// composables
import useNotify from 'src/composables/useNotify'
// stores
import { user, fnUpdateUser, fnGetUserNickName } from 'composables/user/useUser.js'

const { notifyError } = useNotify()
const $r = useRouter()
const $q = useQuasar()
// variables
// functions
const existUser = () => {
  if (user.value && user.value.email) {
    return true
  }
  return false
}

const confirmSignout = () => {
  $q.dialog({
    component: ConfirmDialog,
    componentProps: {
      icon: 'warning',
      iconColor: 'red',
      title: '로그 아웃 하시겠습니까?'
    }
  }).onOk(() => {
    signout()
  })
}

const signout = async () => {
  try {
    await api.get('/auth/signout')
    user.value = null
    $r.push('/')
  } catch (err) {
    notifyError(
      '로그아웃 오류',
      '잠시후 다시 시도해 주세요. 문제가 계속되면 관리자에게 문의해 주세요',
      'top'
    )
  }
}
</script>

<template>
  <q-btn
    v-if="existUser()"
    style="border: 1px solid #ddd"
    unelevated
    round
    size="sm"
    color="primary"
    :label="fnGetUserNickName()"
  >
    <q-menu style="border-radius: 8px; padding: 10px 20px" :offset="[10, 20]">
      <div class="q-pt-md q-gutter-y-sm">
        <div class="row justify-center q-gutter-x-sm">
          <q-avatar color="primary" textColor="white" size="64px">{{
            fnGetUserNickName()
          }}</q-avatar>
        </div>
        <div class="q-mt-lg q-px-lg">
          {{ user.email }}
        </div>
        <q-separator />
        <div class="row justify-center">
          <q-btn rounded unelevated no-caps label="Sign out" @click="confirmSignout"></q-btn>
        </div>
      </div>
    </q-menu>
  </q-btn>
  <div v-else class="btn-login cursor-pointer" @click="$r.push('/auth')">Login</div>
</template>

<style scoped>
.btn-botder {
  border: 1px solid #ddd;
}
.popup {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
}
.btn-login {
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  padding: 4px 12px 4px 12px;
  background: #3eaf7c;
  border-radius: 5px;
}
</style>
