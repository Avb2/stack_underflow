<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="loginEmail" type="email" placeholder="Email" required />
      <input v-model="loginPassword" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>

    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
      <input v-model="signupEmail" type="email" placeholder="Email" required />
      <input v-model="signupPassword" type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const loginEmail = ref('')
const loginPassword = ref('')
const signupEmail = ref('')
const signupPassword = ref('')
const message = ref('')

async function login() {
  const { error } = await supabase.auth.signInWithPassword({ email: loginEmail.value, password: loginPassword.value })
  message.value = error ? error.message : 'Logged in!'
}

async function signup() {
  const { error } = await supabase.auth.signUp({ email: signupEmail.value, password: signupPassword.value })
  message.value = error ? error.message : 'Check your email for confirmation.'
}
</script>
