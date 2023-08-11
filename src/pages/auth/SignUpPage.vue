<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
// components
import AuthLink from 'components/auth/authLink'
// Composables
import useRules from 'src/composables/usrRules'
import useAuth from 'src/composables/useAuth'
import useNotify from 'src/composables/useNotify'
// Variables
const router = useRouter()
const $q = useQuasar()
const { info } = useNotify()
const { required, minLength, ckEmail } = useRules()
const showPass = ref(false)
const showChkPass = ref(false)
const auth = reactive({
  userName: '',
  userEmail: '',
  userPass: '',
  chkUserPass: ''
})
// Functions
const onSubmit = async () => {
  try {
    $q.loading.show()
    const r = await api.post('/auth/signup', { auth: auth })
    $q.loading.hide()
    console.log(r)
    info('sign up')
    router.push('/')
    console.log(r)
  } catch (err) {
    $q.loading.hide()
  }
  console.log('auth', auth)
}
</script>

<template>
  <div>
    <!-------------------------------- form ---------------------------------->
    <q-form class="q-gutter-y-md" @submit="onSubmit">
      <!-- Title -->
      <div class="text-subtitle1 text-bold q-ma-none">Create and account</div>
      <!-- Email -->
      <div>
        <div>
          <div class="input-caption sans-font">Email</div>
          <q-input
            v-model="auth.userEmail"
            outlined
            dense
            :rules="[required, ckEmail]"
            lazy-rules
          />
        </div>
        <!-- User name -->
        <div>
          <div class="input-caption sans-font">User name</div>
          <q-input
            v-model="auth.userName"
            outlined
            dense
            :rules="[required]"
            lazy-rules
          />
        </div>
        <!-- Password -->
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
        <!-- Check password -->
        <div>
          <div class="input-caption sans-font">Confirm password</div>
          <q-input
            v-model="auth.chkUserPass"
            outlined
            dense
            :type="showChkPass ? 'text' : 'password'"
            :rules="[
              required,
              minLength,
              (v) => v === auth.userPass || '비밀번호가 일치 하지 않습니다.'
            ]"
            lazy-rules
          >
            <template #append>
              <q-icon
                class="curser-pointer"
                :name="showChkPass ? 'visibility' : 'visibility_off'"
                :color="showChkPass ? 'blue-grey' : 'grey'"
                size="20px"
                @click="showChkPass = !showChkPass"
              />
            </template>
          </q-input>
        </div>
      </div>
      <!---------------------------- Submit BTN ------------------------------>
      <q-btn class="login-btn" no-caps unelevated color="primary" type="submit">
        <div>Sign up</div>
      </q-btn>
    </q-form>
    <!---------------------------- Goto login ------------------------------>
    <AuthLink
      class="q-mt-lg"
      message="Already have an account?"
      linkName="Login here"
      link="/auth"
    />
  </div>
</template>

<style scoped>
.login-btn {
  width: 100%;
  border-radius: 7px;
}
</style>
