<script setup lang="ts">
import { ref } from 'vue'

// مصفوفة البيانات (هنا سيتم ربط الـ API لاحقاً)
const guides = ref([
  {
    id: 1,
    title: 'Medjool Date Cultivation Guide',
    format: 'PDF',
    size: '4.2 MB',
    downloadUrl: '#' // رابط التحميل
  },
  {
    id: 2,
    title: 'Organic Farming Standards Manual',
    format: 'PDF',
    size: '3.8 MB',
    downloadUrl: '#'
  },
  {
    id: 3,
    title: 'Pest Management for Palm Trees',
    format: 'PDF',
    size: '2.5 MB',
    downloadUrl: '#'
  },
  {
    id: 4,
    title: 'Water Conservation Best Practices',
    format: 'PDF',
    size: '1.9 MB',
    downloadUrl: '#'
  },
  {
    id: 5,
    title: 'Date Export Quality Standards',
    format: 'PDF',
    size: '3.1 MB',
    downloadUrl: '#'
  },
  {
    id: 6,
    title: 'Product Catalog 2026',
    format: 'PDF',
    size: '18.2 MB',
    downloadUrl: '#'
  }
])

const handleDownload = (guide: any) => {
  console.log(`Downloading: ${guide.title}`)
}
</script>

<template>
  <div class="min-h-screen bg-white font-sans">
    
    <header class="bg-[#1e293b] pt-40 pb-28 text-white px-6 text-center">
      <div class="container mx-auto space-y-4">
        <h1 class="text-5xl md:text-5xl font-bold font-serif  tracking-tight">
          Knowledge Guide
        </h1>
        <p class="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Download our resources and guides.
        </p>
      </div>
    </header>

   <section class="py-24 bg-white px-6">
      <div class="max-w-5xl mx-auto space-y-4 px-20">
        
       <div 
  v-for="guide in guides" 
  :key="guide.id"
  class="group bg-[#F5F7FA] py-3   md:px-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-slate-100 border border-transparent"
>
          <div class="flex items-center gap-6 w-full md:w-auto text-left">
            <div class="w-14 h-14 bg-slate-200 text-slate-600 rounded-2xl flex items-center justify-center text-2xl transition-colors group-hover:bg-[#20CAC4]/10 group-hover:text-[#20CAC4]">
              <font-awesome-icon icon="fa-solid fa-file" />
            </div>
            
            <div>
              <h3 class="text-lg md:text-xl font-bold text-[#1e293b] leading-tight">
                {{ guide.title }}
              </h3>
              <p class="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">
                {{ guide.format }} <span class="mx-1">•</span> {{ guide.size }}
              </p>
            </div>
          </div>

          <div class="w-full md:w-auto">
            <button 
              @click="handleDownload(guide)"
              class="w-full md:w-auto bg-[#20CAC4] hover:bg-[#1db1ab] text-white px-8 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#20CAC4]/20 active:scale-95"
            >
              <font-awesome-icon icon="fa-solid fa-download" />
              Download
            </button>
          </div>

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
</style>