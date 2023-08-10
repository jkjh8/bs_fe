<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
// Composables
import useRules from 'src/composables/usrRules'
import useAuth from 'src/composables/useAuth'
// Variables
const router = useRouter()
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
const onSubmit = () => {
  console.log('auth', auth)
}
</script>

<template>
  <div>
    <!-------------------------------- Header -------------------------------->
    <div class="row no-wrap justify-center q-pt-xl q-pb-lg">
      <q-icon
        class="self-center"
        name="home"
        size="24px"
        color="primary"
      ></q-icon>
      <div class="ubuntumono-font main-title text-bold q-ml-xs">
        Broadcast server
      </div>
    </div>
    <!-------------------------------- form ---------------------------------->
    <q-form class="form q-gutter-y-md" @submit="onSubmit">
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
            v-model="auth.userChkPass"
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
      <div class="row no-wrap">
        <span class="text-grey-9"> Already have an account? </span>
        <div
          class="alink no-decoration text-purple text-bold cursor-pointer q-ml-sm"
          @click="router.push('/auth')"
        >
          Login here
        </div>
      </div>
    </q-form>
  </div>
</template>

<style scoped>
.form {
  margin: auto;
  max-width: 400px;
  background: #f8f8f8;
  border: none;
  border-radius: 8px;
  padding: 2rem 1.5rem;
}
.login-btn {
  width: 100%;
  border-radius: 7px;
}
</style>
