export const getComponentFiles = () => [
  {
    path: 'src/components/Navbar.vue',
    content: `<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)
</script>

<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <RouterLink to="/" class="text-white font-bold">Logo</RouterLink>
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <RouterLink to="/" class="text-gray-300 hover:text-white px-3 py-2 rounded-md">Home</RouterLink>
            <RouterLink to="/about" class="text-gray-300 hover:text-white px-3 py-2 rounded-md">About</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>`
  },
  {
    path: 'src/views/HomeView.vue',
    content: `<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-4">Welcome to Vue.js</h1>
    <button 
      @click="count++"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Count is: {{ count }}
    </button>
  </main>
</template>`
  },
  {
    path: 'src/views/AboutView.vue',
    content: `<template>
  <main class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-4">About</h1>
    <p>This is an about page</p>
  </main>
</template>`
  }
];