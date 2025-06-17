<template>
  <div class="topnav">
    <router-link to="/" class="nav-link" active-class="active">Feed</router-link>
    <router-link to="/createPost" class="nav-link" active-class="active">New Post</router-link>
    <router-link to="/profile-settings">Profile Settings</router-link>
    <button @click="signOut" class="signout-btn">Sign Out</button>
  </div>
</template>

<script setup>
import { supabase } from '../supabase.js'
import { useRouter } from 'vue-router'

const router = useRouter()

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    alert('Sign out error: ' + error.message)
  } else {
    router.push('/auth')
  }
}
</script>

<style scoped>
.topnav {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #333;
  padding: 0.5rem 1rem;
}

.nav-link {
  color: #f2f2f2;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
}

.nav-link.active {
  font-weight: bold;
  color: #04AA6D;
}

.signout-btn {
  color: #fff;
  background-color: #f00;
  opacity: 1;
  filter: none;
  mix-blend-mode: normal;
  cursor: pointer;
}


.signout-btn:hover {
  color: #ff5555;
}
</style>
