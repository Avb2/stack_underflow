<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './supabase'
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import PostForm from './components/PostForm.vue';

const user = ref(null)

async function fetchUser() {
  const { data } = await supabase.auth.getUser()
  user.value = data.user
}

onMounted(() => {
  fetchUser()
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
  })
})
</script>



<template>
  <Navbar v-if="user" />
  <RouterView/>
</template>


<style scoped>

.topnav {
  
  position: fixed;
  top: 0;
  width: 100vw;
  background-color: #333;
  overflow: hidden;
  z-index: 1000;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #575757;
  color: white;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

/* Add some margin to body so content isn't hidden under nav */
body {
  margin-top: 50px;
}
</style>



