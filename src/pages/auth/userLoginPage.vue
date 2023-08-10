<script setup>
import { ref, reactive } from 'vue'
// composables
import useRules from 'src/composables/usrRules.js'

const { required, minLength, ckEmail } = useRules()
const auth = reactive({ email: '', password: '', rememberMe: false })
const showPass = ref(false)

const onSubmit = () => {
  console.log(auth)
}
</script>

<template>
  <div>
    <!-- icon -->
    <div class="row no-wrap justify-center q-pt-xl q-pb-lg">
      <q-icon
        class="self-center"
        name="home"
        size="24px"
        color="primary"
      ></q-icon>
      <div class="ubuntumono-font main-title q-ml-xs">Broadcast server</div>
    </div>
    <q-form class="login-form q-gutter-y-md" @submit="onSubmit">
      <!------------------------------- Title -------------------------------->
      <div class="sans-font title q-ma-none">Sign in to your account</div>
      <!--------------------------- Input data tab --------------------------->
      <div>
        <div>
          <!-- email -->
          <div class="input-caption sans-font">Email</div>
          <q-input
            v-model="auth.email"
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
            v-model="auth.password"
            outlined
            dense
            :rules="[required, minLength]"
            lazy-rules
          ></q-input>
        </div>
        <!-- remember me -->
        <div class="row no-wrap justify-between">
          <div class="sans-font remember">
            <q-checkbox
              v-model="auth.rememberMe"
              class="q-pa-none q-ma-none"
              size="26px"
            ></q-checkbox>
            <span>Remember me</span>
          </div>
          <!-- forgot password  -->
          <a href="#" class="alink no-decoration sans-font">Forgot password?</a>
        </div>
      </div>

      <!---------------------------- Submit BTN ------------------------------>
      <!-- login btn -->
      <q-btn class="login-btn" no-caps unelevated color="primary" type="submit">
        <div>Sign in</div>
      </q-btn>
      <!----------------------------- Register ------------------------------->
      <div>
        <span> Don't have an account yet? </span>
        <a class="alink q-ml-sm" href="#"> Sign up </a>
      </div>
    </q-form>
  </div>
</template>

<style scoped>
.login-form {
  margin: auto;
  max-width: 400px;
  background: #f2f2f2;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 2rem 1.5rem;
}
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
