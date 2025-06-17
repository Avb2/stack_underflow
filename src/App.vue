<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import { supabase } from './supabase'
import Navbar from './components/Navbar.vue'

const router = useRouter()
const user = ref(null)

async function fetchUser() {
  const { data } = await supabase.auth.getUser()
  user.value = data.user
}

function handleRedirect() {
  const currentRoute = router.currentRoute.value.name

  if (user.value && currentRoute === 'auth') {
    router.push({ name: 'home' })
  } else if (!user.value && currentRoute !== 'auth') {
    router.push({ name: 'auth' })
  }
}

onMounted(async () => {
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
    handleRedirect()
  })

  await fetchUser()
  handleRedirect()
})
</script>

<template>
  <Navbar v-if="user" />

  <RouterView />
</template>

<style scoped>
.topnav {
  position: fixed;
  top: 0;
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

body {
  margin-top: 50px;
}
</style>
