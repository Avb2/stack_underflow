<template>
  <div class="post-form">
    <h2>Create Post</h2>

    <form @submit.prevent="submitPost">
      <label>
        Title:
        <input v-model="title" required />
      </label>

      <div v-for="(blob, index) in blobs" :key="index" class="blob">
        <label>
          Type:
          <select v-model="blob.type">
            <option value="text">Text</option>
            <option value="code">Code</option>
          </select>
        </label>

        <label v-if="blob.type === 'code'">
          Language:
          <input v-model="blob.language" />
        </label>

        <label>
          Content:
          <textarea v-model="blob.content" required />
        </label>

        <button type="button" @click="removeBlob(index)">Remove</button>
      </div>

      <button type="button" @click="addBlob">+ Add Blob</button>
      <br />
      <button type="submit">Submit</button>
    </form>

    <div v-if="message">{{ message }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase.js'

const title = ref('')
const blobs = ref([
  { type: 'text', content: '' }
])
const message = ref('')

function addBlob() {
  blobs.value.push({ type: 'text', content: '' })
}

function removeBlob(index) {
  blobs.value.splice(index, 1)
}

async function submitPost() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    alert('You must be logged in to create a post.')
    return
  }

  const payload = {
    title: title.value,
    blobs: blobs.value,
    user_id: user.id,
  }

  const { data, error } = await supabase
    .from('posts')
    .insert([payload])

  if (error) {
    message.value = 'Error: ' + error.message
  } else {
    message.value = 'Post saved!'
    title.value = ''
    blobs.value = [{ type: 'text', content: '' }]
  }
}
</script>

<style scoped>
.post-form {
  max-width: 500px;
  margin: 0 auto;
}
.blob {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
}
</style>
