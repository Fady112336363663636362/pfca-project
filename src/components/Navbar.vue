<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 py-3 px-4 md:px-8 shadow-sm" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      
      <router-link to="/"
      
      class="flex items-center space-x-4">
        <img 
          :src="getVal('logo') || '/PFCA.png'" 
          :alt="getVal('site_name') || 'PFCA Logo'" 
          class="h-10 md:h-12 w-auto" 
          :class="locale === 'ar' ? 'ml-4' : ''"
        />
      </router-link>

      <div class="hidden lg:flex items-center space-x-1" :class="locale === 'ar' ? 'space-x-reverse' : ''">
        <RouterLink 
          v-for="(link, index) in navLinks" 
          :key="index"
          :to="link.path"
          class="px-3 py-2 text-sm font-bold transition-all duration-300"
          :class="[
            $route.path === link.path 
            ? 'bg-[#2D3748] text-white rounded-xl' 
            : 'text-gray-600 hover:text-emerald-600'
          ]"
        >
          {{ $t(link.nameKey) }}
        </RouterLink>
      </div>

      <div class="flex items-center gap-2">
        
        <button 
          @click="toggleLanguage"
          class="hidden lg:flex items-center border border-gray-300 rounded-full px-4 py-1.5 hover:bg-gray-50 transition shadow-sm active:scale-95"
          :class="locale === 'ar' ? 'space-x-reverse' : 'space-x-2'"
        >
          <span class="text-sm font-bold text-gray-700">
            {{ locale === 'en' ? 'العربية' : 'English' }}
          </span>
          <font-awesome-icon icon="fa-solid fa-globe" class="text-emerald-600" :class="locale === 'ar' ? 'mr-2' : 'ml-2'" />
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
          : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600',
          locale === 'ar' ? 'text-right' : 'text-left'
        ]"
      >
        {{ $t(link.nameKey) }}
      </RouterLink>

      <div class="pt-2 border-t border-gray-50">
        <button 
          @click="toggleLanguage(); isMenuOpen = false"
          class="w-full flex items-center justify-between bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition active:scale-[0.98]"
          :class="locale === 'ar' ? 'flex-row-reverse' : ''"
        >
           <div class="flex items-center space-x-3" :class="locale === 'ar' ? 'space-x-reverse' : ''">
             <font-awesome-icon icon="fa-solid fa-globe" class="text-emerald-600 text-lg" />
             <span class="text-sm font-bold text-gray-700">
                {{ locale === 'en' ? 'العربية' : 'English' }}
             </span>
           </div>
           <span class="text-xs text-gray-400 font-medium">
             {{ locale === 'en' ? 'Switch Language' : 'تغيير اللغة' }}
           </span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue' 
import { RouterLink } from 'vue-router'
import apiClient from '@/api/axios' 
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const isMenuOpen = ref(false) 
const settings = ref([]) 

const toggleLanguage = () => {
  const newLang = locale.value === 'en' ? 'ar' : 'en'
  locale.value = newLang
  localStorage.setItem('lang', newLang) 
  updateDirection()
}

const updateDirection = () => {
  const dir = locale.value === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.dir = dir
  document.documentElement.lang = locale.value
  
  if (dir === 'rtl') {
    document.body.style.fontFamily = "'Cairo', sans-serif"
  } else {
    document.body.style.fontFamily = "'Playfair Display', serif"
  }
}

const fetchSettings = async () => {
  try {
    const response = await apiClient.get('/settings') 
    settings.value = response.data.data
  } catch (error) {
    console.error("Error loading settings:", error)
  }
}

const getVal = (key) => {
  return settings.value.find(s => s.key === key)?.value || ''
}

onMounted(() => {
  updateDirection()
  fetchSettings()
})

const navLinks = ref([
  { nameKey: 'nav.home', path: '/' },
  { nameKey: 'nav.about', path: '/about' },
  { nameKey: 'nav.services', path: '/services' },
  { nameKey: 'nav.products', path: '/products' },
  { nameKey: 'nav.projects', path: '/our-projects' },
  { nameKey: 'nav.news', path: '/news' },
  { nameKey: 'nav.partners', path: '/partners' },
  { nameKey: 'nav.contact', path: '/contact' },
])
</script>

<style scoped>
/* 1. استدعاء خط Cairo بوزن Medium 500 */
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@500;600;700&display=swap');

.nav-link {
  font-family: 'Cairo', sans-serif !important;
  font-weight: 500 !important; /* وزن Medium */
}
</style>