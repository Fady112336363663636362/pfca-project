<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

// 1. نظام الفلترة
const activeFilter = ref('All')

// 2. مصفوفة البيانات الشاملة
const allNews = ref([
  {
    id: 1,
    category: 'Sustainability',
    type: 'News',
    date: 'January 28, 2026',
    title: 'PFCA Launches Sustainable Water Management Initiative',
    description: 'New drip irrigation systems reduce water usage by 40% across member farms.',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800'
  },
  {
    id: 2,
    category: 'Harvest',
    type: 'News',
    date: 'January 15, 2026',
    title: 'Record Medjool Harvest Season for 2025',
    description: 'PFCA members achieve a record 3,500 tons of premium Medjool dates this season.',
    image: 'https://images.unsplash.com/photo-1501333313041-195abc4429fa?q=80&w=800'
  },
  {
    id: 3,
    category: 'Events',
    type: 'Event',
    date: 'February 17-21, 2026',
    title: 'PFCA at Gulfood 2026',
    description: "Visit us at Hall 3, Stand A15 at the world's largest food trade show.",
    image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=800'
  },
  {
    id: 4,
    category: 'Partnership',
    type: 'News',
    date: 'December 20, 2025',
    title: 'PFCA Expands to European Organic Markets',
    description: 'Strategic partnerships formed with leading organic distributors in EU.',
    image: 'https://images.unsplash.com/photo-1543157145-f78c636d023d?q=80&w=800'
  },
  {
    id: 5,
    category: 'Training',
    type: 'Event',
    date: 'March 15-20, 2026',
    title: 'Annual Farmer Training Program 2026',
    description: 'Comprehensive training covering modern palm cultivation and organic practices.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800'
  },
  {
    id: 6,
    category: 'Infrastructure',
    type: 'News',
    date: 'November 10, 2025',
    title: 'New Cold Storage Facility Completed',
    description: 'Enhancing our capacity to maintain date quality for longer export periods.',
    image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800'
  }
])

const filteredNews = computed(() => {
  if (activeFilter.value === 'All') return allNews.value
  return allNews.value.filter(item => item.type === activeFilter.value.slice(0, -1) || item.type === activeFilter.value)
})
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] pb-24 font-sans">
    
 <section class=" bg-[#293043] pt-20 mb-12 text-white">
      <div class="container mx-auto px-6   justify-center items-center flex flex-col lg:flex-row gap-12">
        <div class="max-w-2xl space-y-6 text-center lg:text-center">
          <h1 class="text-6xl md:text-[45px] pt-10 font-bold font-serif  leading-tight ">
News & Events
          </h1>
          <p class="text-xl pb-15 text-slate-300 font-light ">
Stay updated with the latest from PFCA.

          </p>
        </div>
      </div>
    </section>

 <div class="flex justify-center items-center gap-4">
          <button 
    v-for="tab in ['All', 'News', 'Events']" 
    :key="tab"
    @click="activeFilter = tab"
    :class="[
      activeFilter === tab 
      ? 'bg-[#2D3748] text-white shadow-xl scale-110' 
      : 'bg-white text-slate-500 border border-slate-200 hover:border-[#319897ee] hover:bg-[#EBECF0]'
    ]"
    class="w-15 h-10 rounded-full font-bold transition-all duration-300 flex items-center justify-center text-sm shadow-md"
  >
    {{ tab }}
  </button>

        </div>
    <main class="container mx-auto px-25 py-16">
       


      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        <RouterLink 
          v-for="item in filteredNews" 
          :key="item.id"
          :to="'/news/' + item.id"
          class="group bg-white rounded-[1.5rem] overflow-hidden shadow-sm  transition-all duration-500 hover:-translate-y-2 flex flex-col border border-slate-50"
        >
          <div class="relative h-64 overflow-hidden">
            <img 
              :src="item.image" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div class="absolute top-5 left-5 flex gap-2">
              <span class="bg-[#1e293b]/80 backdrop-blur-sm text-white px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                {{ item.category }}
              </span>
              <span 
                :class="[item.type === 'News' ? 'bg-white text-slate-800' : 'bg-[#26d0ce] text-white']"
                class="px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm"
              >
                {{ item.type }}
              </span>
            </div>
          </div>

          <div class="p-6 flex flex-col flex-grow space-y-2 text-left">
            <div class="flex items-center gap-2 text-slate-400 text-xs font-medium italic">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ item.date }}
            </div>

            <h3 class="text-[17px] font-bold text-[#1e293b] leading-tight group-hover:text-[#0ABAB5] transition-colors">
              {{ item.title }}
            </h3>

            <p class="text-slate-500 text-[15px] leading-relaxed flex-grow font-light line-clamp-3">
              {{ item.description }}
            </p>
            
            <div class="flex items-center gap-2 text-[#0ABAB5] font-bold text-[15px] group/link pt-2 transition-all">
              <span>Read More</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover/link:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </RouterLink>

      </div>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}

.grid > a {
  animation: slideIn 0.5s ease-out backwards;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>