<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const projects = ref([
  {
    id: 1,
    title: "Modern Packing Facility",
    description: "A 5,000 sqm state-of-the-art sorting and packing facility doubling our processing capacity and improving efficiency.",
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800"
  },
  {
    id: 2,
    title: "Sustainable Water Management",
    description: "Implementing modern drip irrigation systems across 150 farms, reducing water consumption by 40% annually.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800"
  },
  {
    id: 3,
    title: "Solar Energy for Farms",
    description: "Installing solar panels across member farms to reduce energy costs and promote clean farming practices.",
    image: "https://images.unsplash.com/photo-1509391366360-fe5bb584825a?q=80&w=800"
  },
  {
    id: 4,
    title: "Organic Farming Transition",
    description: "Transitioning 50+ farms to certified organic practices for EU and USDA standards for premium export.",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800"
  },
  {
    id: 5,
    title: "Community Education Center",
    description: "Empowering young farmers with digital skills and modern agricultural knowledge for a better future.",
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=800"
  }
])

const goToDetails = (id: number) => {
  router.push(`/project/${id}`)
}
</script>

<template>
  <section class="py-24 bg-white overflow-hidden">
    <div class="container mx-auto px-6 relative">
      
      <div class="text-center mb-20 space-y-4">
        <h2 class="text-4xl md:text-5xl font-bold text-[#1e293b] tracking-tight">Our Projects</h2>
        <p class="text-slate-500 text-lg font-light tracking-wide">Impactful initiatives for sustainable development.</p>
      </div>

      <Carousel 
        class="relative w-full"
        :opts="{ align: 'start', loop: true }"
      >
        
        <div class="absolute -top-14 right-4 flex items-center gap-3 z-30">
          <CarouselPrevious class="static translate-y-0 h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors shadow-sm" />
          <CarouselNext class="static translate-y-0 h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors shadow-sm" />
        </div>

        <CarouselContent class="-ml-6">
          <CarouselItem 
            v-for="project in projects" 
            :key="project.id" 
            class="pl-6 md:basis-1/2 lg:basis-1/4"
          >
            <div 
              @click="goToDetails(project.id)"
              class="group bg-[#F5F7FA] rounded-[2rem] overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3"
            >
              
              <div class="h-60 w-full overflow-hidden">
                <img 
                  :src="project.image" 
                  class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
                  alt="Project Image"
                />
              </div>

              <div class="p-4 flex flex-col flex-grow text-left space-y-3">
                <h3 class=" font-serif text-[#000000] leading-tight transition-colors group-hover:text-[#1fb5b3]">
                  {{ project.title }}
                </h3>
                
                <p class="text-[#64748b] text-[15px] leading-relaxed flex-grow font-medium">
                  {{ project.description }}
                </p>
                
                <div class="flex items-center gap-2 text-[#26d0ce] font-bold text-[14px] group/link pt-1">
                  <span>Project Details</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-5 w-5 transition-transform duration-300 group-hover/link:translate-x-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <div class="flex justify-center mt-20">
        <button class="bg-[#1e293b] hover:bg-slate-800 text-white px-12 py-4 rounded-full font-bold flex items-center gap-3 transition-all shadow-xl active:scale-95 group/btn">
          View All Projects
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-5 w-5 transition-transform group-hover/btn:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1400px;
}
</style>