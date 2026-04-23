<script setup lang="ts">
import { ref } from 'vue'
import RequestServiceModal from '@/components/RequestServiceModal.vue'

const isModalOpen = ref(false)

const allServices = ref([
  {
    title: "Agricultural Consulting",
    description: "Our agricultural consulting service provides comprehensive support to palm farmers. From soil analysis and irrigation planning to pest management and harvest optimization.",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800"
  },
  {
    title: "Quality Testing & Certification",
    description: "Comprehensive quality testing and international certification services for date products to meet global export standards and ensure premium quality.",
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800"
  },
  {
    title: "Irrigation & Water Management",
    description: "Modern drip irrigation systems and water management solutions to optimize water usage and improve crop sustainability in arid regions.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800"
  },
  {
    title: "Harvesting & Logistics",
    description: "Coordinated harvesting schedules and professional logistics to ensure dates are transported and stored under optimal conditions.",
    image: "https://images.unsplash.com/photo-1501333313041-195abc4429fa?q=80&w=800"
  },
  {
    title: "Global Export Support",
    description: "Helping local farmers reach international markets by handling documentation, shipping, and compliance with global trade regulations.",
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=800"
  },
  {
    title: "Sustainable Farming Training",
    description: "Regular workshops and training programs focused on organic farming, soil health, and sustainable palm cultivation techniques.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800"
  }
])
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] pb-24 font-sans">
    
    <header class="bg-[#293043] pt-40 pb-12 text-white px-6">
      <div class="container mx-auto text-center space-y-6">
        <h1 class="text-5xl md:text-[45px] font-bold font-serif   tracking-tight">Our Services</h1>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Discover our comprehensive range of services designed to support and empower the palm farming community in the Jordan Valley.
        </p>
      </div>
    </header>

    <main class="container mx-auto px-25 py-12 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        <div 
          v-for="(service, index) in allServices" 
          :key="index"
          class="group bg-[#F5F7FA] rounded-[2.5rem] overflow-hidden shadow-sm transition-all duration-500  hover:-translate-y-3 flex flex-col border border-slate-100"
        >
          <div class="relative h-72 w-full overflow-hidden">
            <img 
              :src="service.image" 
              :alt="service.title" 
              class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
            />
          </div>

          <div class="p-8 space-y-3 flex flex-col flex-grow text-left">
            <h3 class="text-lg font-bold text-[#1e293b] leading-tight font-serif italic">
              {{ service.title }}
            </h3>
            
            <p class="text-black text-[17px] leading-relaxed flex-grow font-light">
              {{ service.description }}
            </p>
            
            <div class="pt-3">
              <button 
                @click="isModalOpen = true"
                class="bg-[#26d0cdfb] hover:bg-[#16d6d3c8] text-white px-6 py-2 rounded-full text-[15px] font-bold transition-all shadow-lg shadow-teal-500/30 active:scale-95"
              >
                Request Service
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>

    <RequestServiceModal 
      :isOpen="isModalOpen" 
      @close="isModalOpen = false" 
    />

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}
</style>