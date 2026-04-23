<script setup lang="ts">
import AboutSection from '@/components/AboutSection.vue';
import TeamSection from '@/components/TeamSection.vue'

import { ref } from 'vue'


</script>

<template>
  <div class="min-h-screen bg-white">
    
    <section class=" bg-[#293043] pt-20 mb-12 text-white">
      <div class="container mx-auto px-6   justify-center items-center flex flex-col lg:flex-row gap-12">
        <div class="max-w-2xl space-y-6 text-center lg:text-center">
          <h1 class="text-6xl md:text-[45px] pt-10 font-bold font-serif  leading-tight ">
           About Us
          </h1>
          <p class="text-xl pb-15 text-slate-300 font-light ">
           The Palm Farmers Cooperative Association (PFCA) unites over 200 farming families in Jericho and the Jordan Valley, dedicated to sustainable palm cultivation and premium date production..
          </p>
        </div>
      </div>
    </section>

    <section class=" container mx-auto px-6">
      <AboutSection/>
    </section>

    <section >
      <section class="py-24 bg-white">
    <div class="container mx-auto px-6">
      
      <div class="text-center mb-20">
        <h2 class="text-4xl md:text-5xl font-bold text-[#1e293b] font-serif tracking-tight">
          Chairman's Message
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div class="relative flex justify-center lg:justify-end pr-0 lg:pr-12">
          <div class="relative w-full max-w-md">
            <div class="rounded-[1.5rem] overflow-hidden shadow-2xl h-[500px] ">
              <img 
                src="/public/Mohammed Al-Arja.jpg" 
                alt="Chairman" 
                class="w-full h-full object-cover object-center"
              />
            </div>
            
            <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-10 py-6 rounded-2xl shadow-xl border border-slate-50 min-w-[280px] text-center">
              <h4 class="text-xl font-bold text-[#1e293b] font-serif">Mohammed Al-Arja</h4>
              <p class="text-[#26d0ce] text-sm font-bold mt-1">Chairman of the Board</p>
            </div>
          </div>
        </div>

        <div class="space-y-10 text-left pt-12 lg:pt-0">
          <div class="w-16 h-1 bg-[#26d0ce] rounded-full"></div>
          
          <div class="space-y-8">
            <p class="text-xl text-slate-600 leading-relaxed font-light italic">
              "Since our founding, we have believed that cooperation is the key to prosperity. By uniting the efforts of palm farmers in the Jordan Valley, we have built a cooperative that not only preserves our agricultural heritage but also brings Palestinian dates to the world stage."
            </p>
            <p class="text-xl text-slate-600 leading-relaxed font-light italic">
              "Our commitment to quality, sustainability, and community development continues to drive every decision we make. Together, we are building a future where every farming family thrives."
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
    </section>

   

    <section   >
       <TeamSection />
    </section>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif {
  font-family: 'Playfair Display', serif;
}
</style>