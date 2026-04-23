<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// مصفوفة الـ 6 مشاريع (جاهزة للربط مع الـ API)
const allProjects = ref([
  {
    id: 1,
    title: "Sustainable Water Management",
    description: "Implementing modern drip irrigation systems across 150 farms, reducing water usage by 40%.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800"
  },
  {
    id: 2,
    title: "Modern Packing Facility",
    description: "A 5,000 sqm state-of-the-art sorting and packing facility doubling our processing capacity.",
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800"
  },
  {
    id: 3,
    title: "Solar Energy for Farms",
    description: "Installing solar panels across member farms to reduce energy costs and promote sustainability.",
    image: "https://images.unsplash.com/photo-1509391366360-fe5bb584825a?q=80&w=800"
  },
  {
    id: 4,
    title: "Organic Farming Transition",
    description: "Transitioning 50+ farms to certified organic practices for EU and USDA standards.",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800"
  },
  {
    id: 5,
    title: "Community Education Center",
    description: "Empowering young farmers with digital skills and modern agricultural knowledge.",
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=800"
  },
  {
    id: 6,
    title: "Date Processing Innovation",
    description: "New laboratory for testing date moisture levels and skin quality for premium export.",
    image: "https://images.unsplash.com/photo-1501333313041-195abc4429fa?q=80&w=800"
  }
])
</script>

<template>
  <div class="min-h-screen bg-white pb-24 font-sans">
    
    <header class="bg-[#293043] pt-35 pb-20 text-white  px-6 ">
      <div class="container mx-auto text-center space-y-6">
        <h1 class="text-5xl md:text-[45px] font-bold font-serif tracking-tight">Our Projects</h1>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
Impactful initiatives for sustainable development.

        </p>
      </div>
    </header>

    <main class="container mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        <RouterLink 
          v-for="project in allProjects" 
          :key="project.id"
          :to="'/project/' + project.id"
          class="group bg-[#F5F7FA] rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 cursor-pointer border border-transparent hover:border-slate-100"
        >
          <div class="h-64 w-full overflow-hidden">
            <img 
              :src="project.image" 
              class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
              alt="Project Image"
            />
          </div>

          <div class="p-8 flex flex-col flex-grow text-left space-y-5 hover:text-[#0ABAB5]">
            <h3 class="text-[18px] font-serif   leading-tight">
              {{ project.title }}
            </h3>
            
            <p class="text-[#64748b] text-[15px] leading-relaxed flex-grow  font-medium">
              {{ project.description }}
            </p>
            
            <div class="flex items-center gap-2 text-[#0ABAB5] font-bold text-[16px] group/link pt-2">
              <span>Project Details</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 transition-transform duration-300 group-hover/link:translate-x-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
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

/* لجعل الحاوية متناسقة مع باقي الموقع */
.container {
  max-width: 1300px;
}
</style>