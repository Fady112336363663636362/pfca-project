<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { computed, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

// مصفوفة بيانات الشركاء (تأكد أن الـ IDs تطابق الموجود في الهوم)
const PARTNERS_DATA = [
  { 
    id: 4, 
    name: "Spinney's", 
    initials: "S", 
    location: "UAE & Lebanon",
    description: "Premium supermarket chain across UAE and Lebanon, showcasing our gift boxes and specialty dates." 
  },
  { 
    id: 5, 
    name: "REWE Group", 
    initials: "R", 
    location: "Germany & Europe",
    description: "One of the leading trade and tourism groups in Germany and Europe, partnering with us for organic exports." 
  },
  // يمكنك إضافة باقي الشركاء هنا...
]

const partner = computed(() => {
  const id = Number(route.params.id)
  return PARTNERS_DATA.find(p => p.id === id)
})

onMounted(() => {
  if (!partner.value) {
    router.push('/')
  }
})
</script>

<template>
  <div v-if="partner" class="min-h-screen bg-white font-sans">
    
    <header class="bg-[#1e293b] pt-32 pb-24 text-white px-6">
      <div class="container mx-auto text-left">
        <RouterLink 
          to="/" 
          class="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium mb-10 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Partners
        </RouterLink>

        <h1 class="text-6xl md:text-7xl font-bold font-serif italic tracking-tight">
          {{ partner.name }}
        </h1>
      </div>
    </header>

    <main class="container mx-auto px-6 -mt-16 flex flex-col items-center">
      
      <div class="bg-[#26d0ce] text-white w-32 h-32 rounded-[2.5rem] flex items-center justify-center text-4xl font-bold shadow-2xl shadow-teal-500/20 border-8 border-white z-10 transition-transform hover:scale-105 duration-500">
        {{ partner.initials }}
      </div>

      <div class="mt-8 text-center space-y-3">
        <h2 class="text-4xl font-bold text-[#1e293b] font-serif tracking-tight">
          {{ partner.name }}
        </h2>
        
        <div class="flex items-center justify-center gap-2 text-teal-600 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="tracking-wide uppercase text-sm font-bold">{{ partner.location }}</span>
        </div>
      </div>

      <div class="mt-16 max-w-3xl text-center">
        <p class="text-xl md:text-2xl text-slate-500 leading-relaxed font-light italic">
          {{ partner.description }}
        </p>
      </div>

    </main>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(38, 208, 206, 0.25);
}
</style>