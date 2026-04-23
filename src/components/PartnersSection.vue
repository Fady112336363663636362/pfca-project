<template>
  <section class="py-24 bg-white">
    <div class="container mx-auto px-25 text-center">
      
      <h2 class="text-4xl md:text-5xl font-serif text-[#1e293b] mb-20 tracking-tight">
        Success Partners
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <RouterLink 
          v-for="partner in partners" 
          :key="partner.id"
          :to="'/partner/' + partner.id"
          class="group bg-[#F5F7FA] rounded-2xl py-4 px-4 flex flex-col items-center justify-center  transition-all duration-300 hover:bg-[#F0FDFA] hover:border-[#26d0ce] border border-transparent"
          :class="{'bg-[#F0FDFA] border-[#26d0ce]': partner.active}"
        >
          <div 
            :class="[partner.active,  'bg-slate-200 text-slate-600']"
            class="w-13 h-16 rounded-2xl flex items-center justify-center text-xl font-bold transition-colors group-hover:bg-[#26d0ce]/20 group-hover:text-[#26d0ce]"
          >
            {{ partner.initials }}
          </div>

          <span 
            class="text-sm font-bold transition-colors group-hover:text-[#26d0ce]"
          >
            {{ partner.name }}
          </span>
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const partners = ref([
  { id: 1, name: 'Carrefour', initials: 'C' },
  { id: 2, name: 'Lulu Group', initials: 'L' },
  { id: 3, name: 'Al Meera', initials: 'AM' },
  { id: 4, name: 'Spinney\'s', initials: 'S' },
  { id: 5, name: 'REWE Group', initials: 'R', active: true }, 
  { id: 6, name: 'Whole Foods', initials: 'WF' },
  { id: 7, name: 'Sultan Center', initials: 'SC' },
  { id: 8, name: 'Migros', initials: 'M' }
])
</script>