<template>
  <div class="profile-settings">
    <h2>Profile Settings</h2>

    <div v-if="loading">Loading...</div>
    <div v-else>
      <label for="username">Username:</label>
      <input id="username" v-model="username" placeholder="Enter your username" />

      <button @click="updateProfile" :disabled="updating">
        {{ updating ? 'Saving...' : 'Save' }}
      </button>

      <div v-if="message" :class="{'error': error, 'success': !error}">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase.js'

const username = ref('')
const loading = ref(true)
const updating = ref(false)
const message = ref('')
const error = ref(false)

async function fetchProfile() {
  loading.value = true
  message.value = ''
  error.value = false

  const user = supabase.auth.getUser()
  if (!user) {
    message.value = 'Not logged in'
    error.value = true
    loading.value = false
    return
  }

  const { data, error: fetchError } = await supabase
    .from('profiles')
    .select('username')
    .eq('user_id', (await user).data.user.id)
    .single()

  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      // No profile yet - user can create one on save
      username.value = ''
    } else {
      message.value = 'Error fetching profile: ' + fetchError.message
      error.value = true
    }
  } else {
    username.value = data?.username || ''
  }

  loading.value = false
}

async function updateProfile() {
  updating.value = true
  message.value = ''
  error.value = false

  const user = await supabase.auth.getUser()
  if (!user.data.user) {
    message.value = 'Not logged in'
    error.value = true
    updating.value = false
    return
  }

  const updates = {
    user_id: user.data.user.id,
    username: username.value,
    updated_at: new Date().toISOString()
  }

  // Upsert will insert if no row exists, or update existing row
  const { error: updateError } = await supabase
    .from('profiles')
    .upsert(updates, { onConflict: 'user_id' })

  if (updateError) {
    message.value = 'Error updating profile: ' + updateError.message
    error.value = true
  } else {
    message.value = 'Profile updated successfully!'
  }
  updating.value = false
}

onMounted(() => {
  fetchProfile()
})
</script>

<style scoped>
.profile-settings {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
}
button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
.error {
  color: red;
}
.success {
  color: green;
}
</style>
