<template>
  <div class="flex flex-col ">
    
    <HeroSlider /> 

    <NewsTicker />
    <AboutSection />
    <Collections />
    <Services />
     <Projects/>
     <NewsEvents />
    <PartnersSection/>
  </div>
</template>

<script setup>
import HeroSlider from '@/components/HeroSlider.vue'
import NewsTicker from '@/components/NewsTicker.vue'
import AboutSection from '@/components/AboutSection.vue' 
import Collections from '@/components/Collections.vue'
import Services from '@/components/Services.vue'
import Projects from '@/components/Projects.vue'
import NewsEvents from '@/components/NewsEvents.vue'
import PartnersSection from '@/components/PartnersSection.vue'
</script>