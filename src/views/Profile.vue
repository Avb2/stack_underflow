<script setup>
import CodeBox from '@/components/CodeBox.vue';
import TextBox from '@/components/TextBox.vue';
import { onMounted } from 'vue'
import { ref } from 'vue';

    const blocks = ref([{ type: TextBox }])

    function addCode() {
        blocks.value.push({type: CodeBox})
    }
    function addText() {
        blocks.value.push({type: TextBox}) 
    }

</script>



<template>
  <h2>New Post</h2>
  <br />

  <div id="editor">
    <div v-for="(block, index) in blocks" :key="index" class="block">
      <component :is="block.type" />
    </div>
  </div>

  <div class="sticky-bar">
    <button @click="addText">+ Text</button>
    <button @click="addCode">+ Code</button>
    <button>Submit</button>
  </div>
</template>



<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

#editor {
  padding: 1rem;
  padding-bottom: 80px; 
  width: 100%;
  box-sizing: border-box;
}

.block {
  margin-bottom: 1rem;
}

.sticky-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  z-index: 1000;
}

button {
  padding: 0.6rem 1.2rem;
  background-color: #04AA6D;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #038e5a;
}
</style>
