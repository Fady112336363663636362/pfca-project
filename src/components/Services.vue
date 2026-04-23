<template>
  <section class="py-24 bg-[#F8FAFC]">
    <div class="container mx-auto px-30">
      
      <div class="text-center mb-16 space-y-4">
        <h2 class="text-4xl md:text-5xl font-serif text-[#1e293b] tracking-tight">Our Services</h2>
        <p class="text-slate-500 text-lg font-light">
          Comprehensive services for farmers and partners.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        <div 
          v-for="(service, index) in services" 
          :key="index"
          class="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 flex flex-col"
        >
          <div class="relative h-72 w-full overflow-hidden">
            <img 
              :src="service.image" 
              :alt="service.title" 
              class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
          </div>

          <div class="p-8 md:p-10 space-y-6 flex flex-col flex-grow text-left">
            <h3 class="text-2xl font-serif text-[#1e293b] leading-tight">
              {{ service.title }}
            </h3>
            
            <p class="text-slate-500 text-[16px] leading-relaxed flex-grow">
              {{ service.description }}
            </p>
            
            <div class="pt-2">
              <button @click="isModalOpen = true" class="bg-[#17C2BD] text-white px-5 py-1.5 rounded-full text-[13px] font-extrabold transition-all shadow-lg  active:scale-95">
                Request Service
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <RouterLink to="/services"
        
        class="bg-[#1e293b] hover:bg-slate-800 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 transition-all shadow-xl group/btn">
          View All Services
    <font-awesome-icon icon="fa-solid fa-arrow-right" class="text-lx" />
          
        </RouterLink>
      </div>
   <RequestServiceModal 
        :isOpen="isModalOpen" 
        @close="isModalOpen = false" 
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import RequestServiceModal from './RequestServiceModal.vue'  
const isModalOpen = ref(false)


const services = ref([
  {
    title: "Agricultural Consulting",
    description: "Expert guidance on palm cultivation, pest management, and modern farming techniques to maximize yield and quality.",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800"
  },
  {
    title: "Quality Testing & Certification",
    description: "Comprehensive quality testing and international certification services for date products to meet global export standards.",
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800"
  },
  {
    title: "Irrigation & Water Management",
    description: "Modern drip irrigation systems and water management solutions to optimize water usage and improve crop sustainability.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800"
  }
])
</script>