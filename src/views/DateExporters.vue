<script setup lang="ts">
import { ref } from 'vue'

// مصفوفة بيانات الشركات (جاهزة للربط مع API)
const exporters = ref([
  {
    id: 1,
    name: 'Al Reef Dates Company',
    description: 'Leading exporter of premium Medjool dates from the Jordan Valley. Established in 2005, we specialize in organic and conventional dates with exports to over 20 countries worldwide.',
    image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800',
    website: 'https://alreef.ps',
    email: 'info@alreef.ps'
  },
  {
    id: 2,
    name: 'Jordan Valley Dates',
    description: 'Family-owned business with three generations of date farming expertise. We export premium quality Barhi and Medjool dates to European and Asian markets.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800',
    website: 'https://jvdates.ps',
    email: 'contact@jvdates.ps'
  },
  {
    id: 3,
    name: 'Palestine Premium Dates',
    description: 'Modern packing facility with international certifications including ISO, HACCP, and organic standards. Supplying dates to major retail chains across the Middle East.',
    image: 'https://images.unsplash.com/photo-1594488687126-7d3d1fef53c4?q=80&w=800',
    website: 'https://palestinedates.ps',
    email: 'sales@palestinedates.ps'
  },
  {
    id: 4,
    name: 'Nakheel Trading',
    description: 'A dedicated team focused on premium food product marketing and logistics, ensuring the freshest dates reach global destinations on time.',
    image: 'https://images.unsplash.com/photo-1501333313041-195abc4429fa?q=80&w=800',
    website: 'https://nakheel.ps',
    email: 'admin@nakheel.ps'
  }
])
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] pb-24 font-sans">
    
    <header class="bg-[#1e293b] pt-40 pb-24 text-white px-6 text-center">
      <div class="container mx-auto space-y-4">
        <h1 class="text-5xl md:text-5xl font-bold font-serif italic tracking-tight">
          Date Exporting Companies
        </h1>
        <p class="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Leading Palestinian companies in the date export industry.
        </p>
      </div>
    </header>

    <main class="container mx-auto px-30 py-20">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        <div 
          v-for="company in exporters" 
          :key="company.id"
          class="group bg-white rounded-[1.5rem] p-4 shadow-sm border border-slate-100 flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
        >
          <div class="h-60 w-full overflow-hidden rounded-[1rem] mb-6">
            <img 
              :src="company.image" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="Company Image"
            />
          </div>

          <div class="px-4 pb-6 space-y-4 flex flex-col flex-grow text-left">
            <h3 class="text-xl font-serif text-[#1e293b] font-serif tracking-tight">
              {{ company.name }}
            </h3>
            <p class="text-slate-500 text-[15px] leading-relaxed line-clamp-4 flex-grow font-light">
              {{ company.description }}
            </p>
            
            <div class="space-y-3 pt-4">
              <a 
                :href="company.website" 
                target="_blank"
                class="w-full bg-[#20CAC4] hover:bg-[#1db1ab] text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#20CAC4]/20"
              >
                <font-awesome-icon icon="fa-solid fa-globe" />
                Visit Website
              </a>

              <a 
                :href="'mailto:' + company.email"
                class="w-full border-2 border-[#20CAC4] text-[#20CAC4]  py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <font-awesome-icon icon="fa-solid fa-envelope" />
                Contact Company
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>