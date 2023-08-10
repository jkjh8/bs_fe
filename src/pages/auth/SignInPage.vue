<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
// composables
import useRules from 'src/composables/usrRules'
import useAuth from 'src/composables/useAuth'
// Variables
const router = useRouter()
const { getAuth } = useAuth()
const { required, minLength, ckEmail } = useRules()
const auth = reactive({ userEmail: '', userPass: '', rememberMe: false })
const showPass = ref(false)
// functions
const onSubmit = () => {
  getAuth(auth)
}
</script>

<template>
  <div>
    <!-------------------------------- Header -------------------------------->
    <div class="row no-wrap justify-center q-pt-xl q-pb-lg">
      <q-icon class="self-center" name="home" size="24px" color="primary" />
      <div class="ubuntumono-font main-title text-bold q-ml-xs">
        Broadcast server
      </div>
    </div>

    <!-- form start -->
    <q-form class="form q-gutter-y-md" @submit="onSubmit">
      <!------------------------------- Title -------------------------------->
      <div class="text-subtitle1 text-bold q-ma-none">
        Sign in to your account
      </div>
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
              v-model="auth.rememberMe"
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
      <!-- login btn -->
      <q-btn class="login-btn" no-caps unelevated color="primary" type="submit">
        <div>Sign in</div>
      </q-btn>
      <!----------------------------- Register ------------------------------->
      <div class="row no-wrap">
        <span class="text-grey-9"> Don't have an account yet? </span>
        <div
          class="alink no-decoration text-purple text-bold cursor-pointer q-ml-sm"
          @click="router.push('/auth/signup')"
        >
          Sign up
        </div>
      </div>
    </q-form>
  </div>
</template>

<style scoped>
.form {
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
