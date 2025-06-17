<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase'

const route = useRoute()
const post = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  const { data, error: err } = await supabase
    .from('posts')
    .select(`
      *,
      profiles (
        username
      )
    `)
    .eq('id', route.params.id)
    .single()

  if (err) {
    error.value = err.message
  } else {
    post.value = data
  }

  loading.value = false
})
</script>

<template>
  <div class="view-post">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="post">
      <h1>{{ post.title }}</h1>
      <p>By: {{ post.profiles?.username ?? 'Anonymous' }}</p>
      <div v-for="(blob, index) in post.blobs" :key="index" class="blob">
        <div v-if="blob.type === 'text'" class="text-blob">
          <p>{{ blob.content }}</p>
        </div>
        <div v-else-if="blob.type === 'code'" class="code-blob">
          <pre><code>{{ blob.content }}</code></pre>
          <div class="lang-label">Language: {{ blob.language || 'N/A' }}</div>
        </div>
      </div>
    </div>
    <div v-else>
      Post not found.
    </div>
  </div>
</template>

<style scoped>
.view-post {
  max-width: 700px;
  margin: auto;
  padding: 1rem;
}

.blob {
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
}

.text-blob p {
  font-size: 1rem;
  line-height: 1.6;
}

.code-blob pre {
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
}

.lang-label {
  font-size: 0.8rem;
  color: #888;
  margin-top: 0.3rem;
}
</style>
