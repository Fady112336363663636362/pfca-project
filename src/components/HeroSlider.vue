<script setup lang="ts">
import { ref } from 'vue'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600',
    title: 'Together for a Sustainable Future in Palm Farming',
    desc: 'Empowering palm farmers in Jericho & the Jordan Valley to produce world-class dates.',
    btn1: 'Explore Products',
    btn2: 'Become a Distributor'
  },
  {
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1600',
    title: 'Excellence in Agricultural Innovation',
    desc: 'Using modern technology to ensure the highest quality of palm production.',
    btn1: 'Explore Products',
    btn2: 'Become a Distributor'
  },
  {
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1600',
    title: 'Excellence in Agricultural Innovation',
    desc: 'Using modern technology to ensure the highest quality of palm production.',
    btn1: 'Explore Products',
    btn2: 'Become a Distributor'
  }
]
</script>

<template>
  <Carousel 
    :plugins="[Autoplay({ delay: 5000 })]"
    class="relative w-full h-[900px] md:h-[1000px] overflow-hidden"
  >
    <CarouselContent>
      <CarouselItem v-for="(slide, index) in slides" :key="index">
        <div class="relative h-[1000px] w-full">
          <img :src="slide.image" class="w-full h-full object-cover" alt="Hero Image" />
          
          <div class="absolute inset-0 bg-black/50 flex items-center justify-start px-8 md:px-40">
            <div class="max-w-3xl text-white text-left">
              <h1 class="text-5xl md:text-7xl font-serif mb-6 leading-tight uppercase">
                {{ slide.title }}
              </h1>
              <p class="text-xl md:text-2xl mb-10 text-gray-200 font-light">
                {{ slide.desc }}
              </p>
             <div class="flex flex-wrap gap-4 pt-6">
  
  <RouterLink 
    to="/products" 
    class="bg-[#20CAC4] hover:bg-[#1db1ab] text-white px-10 py-4 rounded-full text-lg font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#20CAC4]/20 active:scale-95"
  >
    <span>{{ slide.btn1 }}</span>
    <font-awesome-icon icon="fa-solid fa-arrow-right" class="text-sm" />
  </RouterLink>

  <RouterLink 
    to="/distributor" 
    class="border border-white/60 hover:bg-[#61646B] text-white px-10 py-4 rounded-full text-lg font-bold transition-all backdrop-blur-sm flex items-center justify-center active:scale-95"
  >
    {{ slide.btn2 }}
  </RouterLink>

</div>
            </div>
          </div>
        </div>
      </CarouselItem>
    </CarouselContent>

     <CarouselPrevious class="absolute left-8 top-auto bottom-120 translate-y-0 h-12 w-12 bg-white/10 text-white border-none hover:bg-white/20" />
    
    <CarouselNext class="absolute right-8 top-auto bottom-120 translate-y-0 h-12 w-12 bg-white/10 text-white border-none hover:bg-white/20" />
  </Carousel>
</template>