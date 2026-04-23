<template>
  <section class="py-24 bg-[#F5F7FA]">
    <div class="container mx-auto px-20">
      
      <div class="text-center mb-20 space-y-4">
        <h2 class="text-4xl md:text-5xl font-bold text-[#1e293b] font-serif tracking-tight">
          Organizational Structure
        </h2>
        <p class="text-slate-800 text-lg font-light italic">
          Meet the team behind our success.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        <div 
          v-for="(member, index) in team" 
          :key="index"
          class="flex flex-col items-center text-center group"
        >
          <div class="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-6 shadow-sm transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
            <img 
              :src="member.image" 
              :alt="member.name" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          <h4 class="text-[17px] font-bold text-[#1e293b] font-serif leading-tight">
            {{ member.name }}
          </h4>
          
          <p class="text-[#26d0ce] text-[13px] font-bold mt-2 uppercase tracking-wide">
            {{ member.role }}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const team = ref([
  {
    name: 'Ahmad Al-Khatib',
    role: 'Vice Chairman',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400'
  },
  {
    name: 'Fatima Nasser',
    role: 'Financial Manager',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400'
  },
  {
    name: 'Khaled Mansour',
    role: 'Operations Director',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400'
  },
  {
    name: 'Sara Haddad',
    role: 'Marketing Director',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400'
  },
  {
    name: 'Omar Saleh',
    role: 'Quality Assurance',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400'
  },
  {
    name: 'Layla Ibrahim',
    role: 'Agricultural Advisor',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400'
  }
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}
</style>