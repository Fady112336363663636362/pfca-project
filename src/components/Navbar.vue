<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 py-3 px-4 md:px-8 shadow-sm">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      
      <div class="flex items-center space-x-4">
        <img src="/PFCA.png" alt="PFCA Logo" class="h-10 md:h-12 w-auto" />
      </div>

      <div class="hidden lg:flex items-center">
        <RouterLink 
          v-for="(link, index) in navLinks" 
          :key="index"
          :to="link.path"
          class="px-4 py-2 text-sm font-medium transition-all duration-300"
          :class="[
            $route.path === link.path 
            ? 'bg-[#2D3748] text-white rounded-xl' 
            : 'text-gray-600 hover:text-emerald-600'
          ]"
        >
          {{ link.name }}
        </RouterLink>
      </div>

      <div class="flex items-center gap-2">
        <button class="flex items-center space-x-2 border border-gray-300 rounded-full px-3 py-1.5 md:px-4 hover:bg-gray-50 transition shadow-sm">
          <span class="text-xs md:text-sm font-bold">العربية</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 md:w-5 md:h-5 text-gray-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
        </button>

        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
        >
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <div 
      v-if="isMenuOpen" 
      class="lg:hidden bg-white border-t border-gray-100 absolute top-full left-0 w-full shadow-xl py-4 px-6 flex flex-col space-y-3 animate-in slide-in-from-top duration-300"
    >
      <RouterLink 
        v-for="(link, index) in navLinks" 
        :key="index"
        :to="link.path"
        @click="isMenuOpen = false" 
        class="py-3 px-4 rounded-xl text-sm font-bold transition-all"
        :class="[
          $route.path === link.path 
          ? 'bg-[#2D3748] text-white' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
        ]"
      >
        {{ link.name }}
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const isMenuOpen = ref(false) 


const navLinks = ref([
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Our Services', path: '/services' },
  { name: 'Our Products', path: '/products' },
  { name: 'Our Projects', path: '/our-projects' },
  { name: 'News & Events', path: '/news' },
  { name: 'Success Partners', path: '/partners' },
  { name: 'Contact Us', path: '/contact' },
])
</script>