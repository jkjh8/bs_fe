<script setup>
import { ref } from 'vue'

const useremail = ref('')
const userpassword = ref('')
const rememberme = ref(false)

const onSubmit = () => {
  console.log(useremail.value, userpassword.value)
}
</script>

<template>
  <div>
    <!-- icon -->
    <div class="row no-wrap justify-center q-py-lg">
      <q-icon class="main-color" name="home" size="md"></q-icon>
      <span class="name">APP</span>
    </div>
    <q-form class="login-form q-gutter-y-md" @submit="onSubmit">
      <!-- Title -->
      <div class="title">Sign in to your account</div>
      <!-- email -->
      <div>
        <div class="subtitle">Email</div>
        <q-input v-model="useremail" outlined dense></q-input>
      </div>
      <!-- password -->
      <div>
        <div class="subtitle">Password</div>
        <q-input v-model="userpassword" outlined dense></q-input>
      </div>
      <!-- remember me & forgot password -->
      <div class="row no-wrap justify-between">
        <div class="remember">
          <q-checkbox
            v-model="rememberme"
            class="q-pa-none q-ma-none"
            size="26px"
          ></q-checkbox>
          <span>Remember me</span>
        </div>
        <a href="#" class="alink">Forgot password?</a>
      </div>
      <!-- login btn -->
      <q-btn class="login-btn" no-caps unelevated color="primary" type="submit">
        <div>Sign in</div>
      </q-btn>
      <!-- register link -->
      <div>
        <span> Don't have an account yet? </span>
        <a class="alink" href="#"> Sign up </a>
      </div>
    </q-form>
  </div>
</template>

<style scoped>
.name {
  font-size: 1.5rem;
  font-weight: bold;
}
.login-form {
  margin: auto;
  max-width: 400px;
  background: #f2f2f2;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 2rem 1.5rem;
}
.title {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
}
.subtitle {
  font-family: rem;
  font-size: 0.7rem;
}
.input-border {
  border-radius: 10px;
}
.remember {
  position: relative;
  left: -7px;
  font-size: 12px;
  font-family: rem;
  font-weight: 300;
}
.alink {
  font-family: rem;
  font-size: 12px;
  text-decoration: none;
}
.login-btn {
  width: 100%;
  border-radius: 7px;
}
</style>
