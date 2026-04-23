<template>
  <section class="py-20 bg-[#f8fafc]">
    <div class="container mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div class="space-y-8 order-2 lg:order-1">
          <div class="space-y-4">
            <h2 class="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
              {{ aboutData.title }}
            </h2>
            <p class="text-lg text-slate-600  leading-relaxed max-w-xl">
              {{ aboutData.description }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              v-for="(stat, index) in aboutData.stats" 
              :key="index"
              class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow"
            >
              <span class="text-2xl font-serif text-teal-600 mb-1">{{ stat.value }}</span>
              <span class="text-sm text-slate-500 font-medium leading-tight">{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <div class="relative order-1 lg:order-2">
          <div class="rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
            <img 
              :src="aboutData.mainImage" 
              alt="Farmers in Jordan Valley" 
              class="w-full h-full object-cover min-h-[400px]"
            />
          </div>

          <div class="absolute -bottom-6 -left-6 z-20 bg-[#26d0ce] text-white p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center min-w-[160px] animate-bounce-subtle">
            <span class="text-3xl font-serif">200+</span>
            <span class="text-sm font-semibold uppercase tracking-wider">Families</span>
          </div>

          <div class="absolute -top-10 -right-10 w-40 h-40 bg-teal-100 rounded-full blur-3xl opacity-50"></div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const aboutData = ref({
  title: "Rooted in the Jordan Valley Since 1998",
  description: "The Palm Farmers Cooperative Association (PFCA) unites over 200 farming families in Jericho and the Jordan Valley, dedicated to sustainable palm cultivation and premium date production.",
  mainImage: "https://images.unsplash.com/photo-1594488687126-7d3d1fef53c4?q=80&w=1000", 
  stats: [
    { label: "Farming Families", value: "200+" },
    { label: "Countries Served", value: "25+" },
    { label: "Tons Annually", value: "3,000+" }
  ]
})
</script>

