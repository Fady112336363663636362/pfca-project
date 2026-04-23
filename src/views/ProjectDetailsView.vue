<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { computed, onMounted, ref } from 'vue'

const route = useRoute()
const router = useRouter()

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Modern Packing Facility",
    description: [
      "The Modern Packing Facility is a state-of-the-art center designed to handle the increasing volume of Medjool dates with maximum efficiency.",
      "Spanning over 5,000 square meters, this facility uses advanced optical sorting technology to grade dates based on size, moisture, and skin quality.",
      "This project has doubled our processing capacity, allowing the cooperative to serve more international markets while maintaining the highest quality standards."
    ],
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=1000",
    details: {
      duration: "2020 – 2022",
      location: "Jericho Industrial Zone",
      beneficiaries: "200+ Farming Families"
    }
  },
  {
    id: 4,
    title: "Organic Farming Transition",
    description: [
      "Our organic transition program has successfully certified over 50 member farms for EU and USDA organic standards.",
      "The two-year program covers soil preparation, natural pest management, and rigorous documentation requirements.",
      "Organic-certified dates command premium prices in European markets, increasing farmer income by an average of 25%."
    ],
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1000",
    details: {
      duration: "2019 – Present",
      location: "Jericho & Jordan Valley",
      beneficiaries: "50+ Certified Farms"
    }
  }
]

const project = computed(() => {
  const id = Number(route.params.id)
  return PROJECTS_DATA.find(p => p.id === id)
})

const activeFilter = ref('All')
const galleryItems = ref([
  { type: 'photo', src: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800' },
  { type: 'photo', src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800' },
  { type: 'photo', src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800' },
  { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Modern Irrigation in Action' },
  { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Packing Facility Tour' },
])

const filteredGallery = computed(() => {
  if (activeFilter.value === 'All') return galleryItems.value
  return galleryItems.value.filter(item => item.type === activeFilter.value.toLowerCase().slice(0, -1))
})

onMounted(() => {
  if (!project.value) {
    router.push('/')
  }
})
</script>

<template>
  <div v-if="project" class="min-h-screen bg-white pb-20 font-sans">
    
    <div class="container mx-auto px-6 pt-32 pb-5 text-left">
      <RouterLink 
        to="/" 
        class="inline-flex items-center gap-2 text-slate-500 hover:text-[#26d0ce] transition-colors font-bold group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Projects
      </RouterLink>
    </div>

    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        
        <div class="lg:col-span-2 space-y-12 text-left text-right">
          <div class="space-y-6 text-left">
            <h1 class="text-5xl md:text-7xl font-serif text-[#1e293b] leading-tight font-serif">
              {{ project.title }}
            </h1>
            <div class="w-24 h-2 bg-[#26d0ce] rounded-full"></div>
          </div>

          <div class="space-y-8 text-left">
            <p 
              v-for="(paragraph, index) in project.description" 
              :key="index" 
              class="text-xl text-slate-600 leading-relaxed font-light"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>

        <div class="space-y-5 sticky top-32">
          <div class="rounded-[3rem] overflow-hidden  aspect-[4/3]  ">
            <img :src="project.image" class="w-full h-full object-cover" :alt="project.title" />
          </div>

          <div class="bg-[#F5F7FA] rounded-[3rem] p-10 space-y-10 shadow-sm text-left">
            <h3 class="text-2xl font-bold text-[#1e293b]">Project Details</h3>
            <div class="space-y-8">
              <div class="flex items-start gap-5">
                <div class="bg-white p-3 rounded-2xl text-[#26d0ce] shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor font-bold">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-400 uppercase tracking-widest">Duration</p>
                  <p class="text-xl font-bold text-[#1e293b]">{{ project.details.duration }}</p>
                </div>
              </div>
              <div class="flex items-start gap-5">
                <div class="bg-white p-3 rounded-2xl text-[#26d0ce] shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-400 uppercase tracking-widest">Location</p>
                  <p class="text-xl font-bold text-[#1e293b]">{{ project.details.location }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="container mx-auto px-6 py-24 border-t border-slate-100 mt-20">
      <div class="text-center space-y-8">
        <h2 class="text-4xl md:text-5xl font-bold text-[#1e293b] font-serif">Media Gallery</h2>
        
        <div class="flex justify-center gap-4">
          <button 
            @click="activeFilter = 'All'"
            :class="[activeFilter === 'All' ? 'bg-[#26d0ce] text-white' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50']"
            class="px-8 py-2 rounded-full font-bold transition-all shadow-sm"
          >
            All
          </button>
          <button 
            @click="activeFilter = 'Photos'"
            :class="[activeFilter === 'Photos' ? 'bg-[#26d0ce] text-white' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50']"
            class="px-8 py-2 rounded-full font-bold transition-all shadow-sm"
          >
            Photos
          </button>
          <button 
            @click="activeFilter = 'Videos'"
            :class="[activeFilter === 'Videos' ? 'bg-[#26d0ce] text-white' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50']"
            class="px-8 py-2 rounded-full font-bold transition-all shadow-sm"
          >
            Videos
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div 
            v-for="(item, index) in filteredGallery" 
            :key="index"
            class="group relative h-64 rounded-[2rem] overflow-hidden shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
          >
            <img 
              v-if="item.type === 'photo'" 
              :src="item.src" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />

            <div v-else class="w-full h-full bg-black relative">
              <iframe 
                class="w-full h-full" 
                :src="item.src" 
                frameborder="0" 
                allowfullscreen
              ></iframe>
              <div class="absolute top-0 left-0 w-full h-full bg-transparent pointer-events-none group-hover:bg-black/10 transition-colors"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}

.grid > div {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>