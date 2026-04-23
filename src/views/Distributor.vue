<script setup lang="ts">
import { ref } from 'vue'

// مصفوفة متطلبات الانضمام (Joining Requirements)
const requirements = ref([
  {
    title: 'Valid Trade License',
    desc: 'Active commercial registration and import license.',
    icon: 'fa-solid fa-shield'
  },
  {
    title: 'Distribution Network',
    desc: 'Established retail or wholesale distribution channels.',
    icon: 'fa-solid fa-chart-line'
  },
  {
    title: 'Cold Storage Capability',
    desc: 'Temperature-controlled storage and transport facilities.',
    icon: 'fa-solid fa-truck'
  },
  {
    title: 'Food Safety Standards',
    desc: 'Compliance with local and international food safety regulations.',
    icon: 'fa-solid fa-award'
  },
  {
    title: 'Dedicated Sales Team',
    desc: 'A team focused on premium food product marketing.',
    icon: 'fa-solid fa-users'
  },
  {
    title: 'Market Knowledge',
    desc: 'Deep understanding of local market dynamics and consumer preferences.',
    icon: 'fa-solid fa-globe'
  }
])
</script>

<template>
  <div class="min-h-screen bg-white font-sans">
    
     <section class=" bg-[#293043] pt-20 mb-12 text-white">
      <div class="container mx-auto px-6   justify-center items-center flex flex-col lg:flex-row gap-12">
        <div class="max-w-2xl space-y-6 text-center lg:text-center">
          <h1 class="text-6xl md:text-[45px] pt-10 font-bold font-serif  leading-tight ">
Become a Distributor
          </h1>
          <p class="text-xl pb-15 text-slate-300 font-light ">
Be part of the success story of the Palm Farmers Cooperative Association.

          </p>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white px-25">
      <div class="container mx-auto">
        
        <div class="text-center mb-20 space-y-4">
          <h2 class="text-4xl md:text-4xl font-bold text-[#1e293b] font-serif ">
            Joining Requirements
          </h2>
        </div>

        <div class="grid grid-cols-1 px-25 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          <div 
            v-for="(req, index) in requirements" 
            :key="index"
            class="bg-[#F5F7FA] p-10 rounded-[2.5rem] flex flex-col items-start text-left space-y-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
          >
            <div class="w-14 h-14 bg-[#20CAC4] text-white rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-[#20CAC4]/20 transition-transform group-hover:scale-110">
              <font-awesome-icon :icon="req.icon" />
            </div>

            <div class="space-y-3">
              <h3 class="text-xl font-bold text-[#1e293b] font-serif">
                {{ req.title }}
              </h3>
              <p class="text-slate-500 text-[15px] leading-relaxed font-medium">
                {{ req.desc }}
              </p>
            </div>
          </div>

        </div>

        <div class="mt-20 text-center">
          <RouterLink 
            to="/contact" 
            class="inline-flex items-center gap-3 bg-[#20CAC4] hover:bg-[#1db1ab] text-white px-12 py-5 rounded-full font-bold text-lg shadow-xl shadow-[#20CAC4]/20 transition-all active:scale-95"
          >
            Apply to be a Distributor
            <font-awesome-icon icon="fa-solid fa-arrow-right" class="text-sm" />
          </RouterLink>
        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}

.grid > div {
  height: 100%;
}
</style>