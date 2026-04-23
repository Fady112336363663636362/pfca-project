<template>
  <section class="py-24 bg-[#F8FAFC]">
    <div class="container mx-auto px-25">
      
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-serif text-[#1e293b] font-serif">News & Events</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <RouterLink 
          v-for="(item, index) in newsItems" 
          :key="index"
          :to="'/news/' + item.id"
          class="bg-white rounded-[1rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
        >
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="item.image" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <span 
              :class="[item.type === 'News' ? 'bg-white/90 text-slate-800' : 'bg-[#26d0ce] text-white']"
              class="absolute top-4 left-4 px-4 py-1 rounded-full text-xs font-bold shadow-sm"
            >
              {{ item.type }}
            </span>
          </div>

          <div class="p-6 flex flex-col flex-grow space-y-3 text-left">
            <div class="flex items-center gap-2 text-slate-400 text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ item.date }}
            </div>

            <h3 class="text-lg font-serif text-[#1e293b] leading-tight line-clamp-2 group-hover:text-[#26d0ce] transition-colors">
              {{ item.title }}
            </h3>

            <p class="text-slate-500 text-sm leading-relaxed line-clamp-3">
              {{ item.description }}
            </p>
          </div>
        </RouterLink>
      </div>

      <div class="flex justify-center">
        <RouterLink
         to="news"
         
         class="bg-[#1e293b] hover:bg-slate-800 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 transition-all shadow-lg group/btn">
          View More
    <font-awesome-icon icon="fa-solid fa-arrow-right" class="text-lx" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const newsItems = ref([
  {
    id: 1, 
    type: 'News',
    date: 'January 28, 2026',
    title: 'PFCA Launches Sustainable Water Management Initiative',
    description: 'New drip irrigation systems reduce water usage by 40% across member farms.',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800'
  },
  {
    id: 2, 
    type: 'News',
    date: 'January 15, 2026',
    title: 'Record Medjool Harvest Season for 2025',
    description: 'PFCA members achieve a record 3,500 tons of premium Medjool dates this season.',
    image: 'https://images.unsplash.com/photo-1501333313041-195abc4429fa?q=80&w=800'
  },
  {
    id: 3, 
    type: 'Event',
    date: 'February 17-21, 2026',
    title: 'PFCA at Gulfood 2026',
    description: "Visit us at Hall 3, Stand A15 at the world's largest food trade show.",
    image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=800'
  },
  {
    id: 4, // مهم جداً
    type: 'Event',
    date: 'March 15-20, 2026',
    title: 'Annual Farmer Training Program 2026',
    description: 'Comprehensive training covering modern palm cultivation and organic practices.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800'
  }
])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>