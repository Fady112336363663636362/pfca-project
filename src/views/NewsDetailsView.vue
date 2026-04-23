<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { computed, onMounted } from 'vue'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

const route = useRoute()
const router = useRouter()

// بيانات الأخبار (سيتم استبدالها لاحقاً بـ API)
const NEWS_DATA = [
  {
    id: 3,
    type: 'Events',
    date: 'February 17-21, 2026',
    title: 'PFCA at Gulfood 2026',
    lead: 'Visit us at Hall 3, Stand A15 at the world\'s largest food trade show.',
    content: [
      "PFCA participates in Gulfood 2026 at Dubai World Trade Centre.",
      "Visit Hall 3, Stand A15 for date tasting and partnership meetings."
    ],
    images: [
      'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=1200',
      'https://images.unsplash.com/photo-1501333313041-195abc4429fa?q=80&w=1200'
    ]
  },

]

const newsItem = computed(() => {
  const id = Number(route.params.id)
  return NEWS_DATA.find(n => n.id === id)
})

onMounted(() => {
  if (!newsItem.value) router.push('/')
})
</script>

<template>
  <div v-if="newsItem" class="min-h-screen bg-[#F8FAFC] pb-20">
    
    <div class="container mx-auto px-6 pt-32 pb-8 ">
      <RouterLink 
        to="/" 
        class="inline-flex items-center gap-2 text-slate-500 hover:text-[#26d0ce] transition-colors font-bold group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to News
      </RouterLink>
    </div>

    <div class="container mx-auto px-6 max-w-5xl">
      <div class="bg-white rounded-[1rem] shadow-sm overflow-hidden border border-slate-100">
        
        <div class="relative w-full h-[500px]">
          <Carousel :plugins="[Autoplay({ delay: 4000 })]" class="w-full h-full">
            <CarouselContent>
              <CarouselItem v-for="(img, idx) in newsItem.images" :key="idx">
                <img :src="img" class="w-full h-[500px] object-cover" />
              </CarouselItem>
            </CarouselContent>
          </Carousel>

          <span class="absolute top-8 left-8 bg-[#26d0ce] text-white px-4 py-2 rounded-full text-sm font-serif shadow-lg">
            {{ newsItem.type }}
          </span>

          <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            <div v-for="n in newsItem.images.length" :key="n" 
                 class="h-1.5 w-8 rounded-full bg-white/50"
                 :class="{'bg-white w-12': n === 1}"></div>
          </div>
        </div>

        <div class="p-10 md:p-16 space-y-10 text-left">
          
          <div class="flex items-center gap-2 text-slate-400 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ newsItem.date }}
          </div>

          <h1 class="text-3xl md:text-4xl font-bold text-[#1e293b] leading-tight font-serif">
            {{ newsItem.title }}
          </h1>

          <p class="text-xl md:text-2xl text-[#1e293b] leading-relaxed">
            {{ newsItem.lead }}
          </p>

          <div class="w-24 h-1 bg-[#26d0ce] rounded-full"></div>

          <div class="space-y-6">
            <p v-for="(p, i) in newsItem.content" :key="i" class="text-lg text-slate-500 leading-relaxed font-light">
              {{ p }}
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
.font-serif {
  font-family: 'Playfair Display', serif;
}
</style>