<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

// components
import AuthLink from 'components/auth/authLink'
// composables
import useRules from 'src/composables/useRules'
import useAuth from 'src/composables/user/useAuth'
import useNotify from 'src/composables/useNotify'
// stores
// Variables
const router = useRouter()
const $q = useQuasar()
const { notifyError } = useNotify()
const { required, minLength, ckEmail } = useRules()
const { auth, rememberCheck, getEmailFromStorage, setEmailToStorage } = useAuth()
const showPass = ref(false)
// functions
const onSubmit = async () => {
  try {
    // add local storage check email
    setEmailToStorage()
    // login start
    $q.loading.show()
    const r = await api.post('/auth', {
      email: auth.userEmail,
      userPassword: auth.userPass
    })
    $q.loading.hide()
    router.push('/')
  } catch (err) {
    $q.loading.hide()
    notifyError('로그인 오류', err.response.data.info.message, 'top')
  }
}
// Lifecycle hooks
onMounted(() => {
  // get local storage check email
  getEmailFromStorage()
})
</script>

<template>
  <div>
    <!-- form start -->

    <q-form class="q-gutter-y-md" @submit="onSubmit">
      <!------------------------------- Title -------------------------------->
      <div class="text-subtitle1 text-bold q-ma-none">Sign in to your account</div>
      <!--------------------------- Input data tab --------------------------->
      <div>
        <div>
          <!-- email -->
          <div class="input-caption sans-font">Email</div>
          <q-input
            v-model="auth.userEmail"
            outlined
            dense
            :rules="[required, ckEmail]"
            lazy-rules
          ></q-input>
        </div>
        <!-- password -->
        <div>
          <div class="input-caption sans-font">Password</div>
          <q-input
            v-model="auth.userPass"
            outlined
            dense
            :type="showPass ? 'text' : 'password'"
            :rules="[required, minLength]"
            lazy-rules
          >
            <template #append>
              <q-icon
                class="curser-pointer"
                :name="showPass ? 'visibility' : 'visibility_off'"
                :color="showPass ? 'blue-grey' : 'grey'"
                size="20px"
                @click="showPass = !showPass"
              />
            </template>
          </q-input>
        </div>
        <!-- remember me -->
        <div class="row no-wrap justify-between">
          <div class="sans-font remember">
            <q-checkbox
              v-model="rememberCheck"
              class="q-pa-none q-ma-none"
              size="26px"
            ></q-checkbox>
            <span>Remember me</span>
          </div>
          <!-- forgot password  -->
          <div class="alink no-decoration sans-font text-purple cursor-pointer">
            Forgot password?
          </div>
        </div>
      </div>

      <!---------------------------- Submit BTN ------------------------------>
      <q-btn class="login-btn" no-caps unelevated color="primary" type="submit">
        <div>Sign in</div>
      </q-btn>
    </q-form>
    <!----------------------------- Register ------------------------------->
    <AuthLink
      class="q-mt-lg"
      message="Don't have an account yet"
      linkName="Sign up"
      link="/auth/signup"
    />
  </div>
</template>

<style scoped>
.remember {
  position: relative;
  left: -7px;
  font-size: 12px;
  font-weight: 300;
}
.login-btn {
  width: 100%;
  border-radius: 7px;
}
</style>
src/composables/useRules src/composables/user/useAuth
