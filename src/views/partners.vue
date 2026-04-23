<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const partners = ref([
  { id: 1, name: 'Carrefour', initials: 'C', location: 'Middle East & North Africa' },
  { id: 2, name: 'Lulu Group', initials: 'L', location: 'Gulf Countries', active: true }, 
  { id: 3, name: 'Al Meera', initials: 'AM', location: 'Qatar' },
  { id: 4, name: 'Spinney\'s', initials: 'S', location: 'UAE & Lebanon' },
  { id: 5, name: 'REWE Group', initials: 'R', location: 'Germany & Central Europe' },
  { id: 6, name: 'Whole Foods', initials: 'WF', location: 'United States' },
  { id: 7, name: 'Sultan Center', initials: 'SC', location: 'Kuwait' },
  { id: 8, name: 'Migros', initials: 'M', location: 'Switzerland' }
])
</script>

<template>
  <div class="min-h-screen bg-white pb-24 font-sans">
    
     <section class=" bg-[#293043] pt-20 mb-12 text-white">
      <div class="container mx-auto px-6   justify-center items-center flex flex-col lg:flex-row gap-12">
        <div class="max-w-2xl space-y-6 text-center lg:text-center">
          <h1 class="text-6xl md:text-[45px] pt-10 font-bold font-serif  leading-tight ">
Success Partners
          </h1>
          <p class="text-xl pb-15 text-slate-300 font-light ">
Trusted by leading retailers and distributors worldwide.

          </p>
        </div>
      </div>
    </section>

    <main class="container mx-auto px-30 py-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        
     <RouterLink 
  v-for="partner in partners" 
  :key="partner.id"
  :to="'/partner/' + partner.id"
  class="group p-10 rounded-[1.5rem] bg-[#F5F7FA] flex flex-col items-center justify-center text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:bg-white hover:border-slate-100"
>
  <div 
    class="w-18 h-18 rounded-2xl bg-[#1e293b] flex items-center justify-center text-2xl font-serif text-white mb-3 transition-all duration-500 group-hover:bg-[#20CAC4] group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#20CAC4]/30"
  >
    {{ partner.initials }}
  </div>

  <h3 class="text-md font-bold font-serif text-[#1e293b] mb-2 transition-colors duration-500 group-hover:text-[#20CAC4]">
    {{ partner.name }}
  </h3>

  <p class="text-slate-400 text-sm font-medium">
    {{ partner.location }}
  </p>
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
</style>