<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'

const posts = ref([])

async function fetchRecentPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles (
        username
      )
    `)
    .order('created_at', { ascending: false })
    .limit(10)

  if (!error) posts.value = data
}

onMounted(fetchRecentPosts)
</script>

<template>
  <div class="post-feed">
    <div v-for="post in posts" :key="post.id" class="post-preview">
      <router-link :to="`/viewPost/${post.id}`" class="post-title">
        {{ post.title }}
      </router-link>
      <p>By: {{ post.profiles?.username ?? 'Anonymous' }}</p>
      <div class="post-snippet">
        {{ getTextSnippet(post.blobs) }}
      </div>
    </div>
  </div>
</template>

<script>
function getTextSnippet(blobs) {
  const textBlob = blobs?.find(b => b.type === 'text')
  return textBlob?.content.slice(0, 100) + '...' || ''
}
</script>

<style scoped>
.post-feed {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: auto;
}

.post-preview {
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 0;
}

.post-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

.post-title:hover {
  text-decoration: underline;
}

.post-snippet {
  color: #666;
  font-size: 0.95rem;
  margin-top: 0.25rem;
}
</style>
