<template>
  <div class="min-h-screen bg-white font-sans" :class="locale === 'ar' ? 'text-right' : 'text-left'">
    
    <header class="bg-[#1e293b] pt-32 md:pt-40 pb-16 md:pb-28 text-white px-6 text-center">
      <div class="container mx-auto space-y-4">
        <h1 class="text-3xl md:text-6xl font-bold font-serif tracking-tight">
          {{ locale === 'en' ? 'Knowledge Guide' : 'دليل المعرفة' }}
        </h1>
        <p class="text-slate-400 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          {{ locale === 'en' ? 'Download our resources and guides.' : 'قم بتحميل مواردنا وأدلتنا الإرشادية.' }}
        </p>
      </div>
    </header>

    <section class="py-12 md:py-24 bg-white px-4 md:px-6">
      <div class="max-w-4xl mx-auto space-y-4">
        
        <div v-if="loading" class="space-y-4">
          <div v-for="i in 4" :key="i" class="h-24 bg-gray-50 animate-pulse rounded-[1rem]"></div>
        </div>

        <div 
          v-else
          v-for="guide in guides" 
          :key="guide.id"
          class="group bg-[#F5F7FA] py-5 px-5 md:px-8 rounded-[1rem] flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-slate-100 border border-transparent shadow-sm"
          :class="locale === 'ar' ? 'md:flex-row-reverse' : ''"
        >
          <div class="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto text-center" :class="locale === 'ar' ? 'md:text-right md:flex-row-reverse' : 'md:text-left'">
            <div class="w-14 h-14 bg-white text-[#20CAC4] rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:bg-[#20CAC4] group-hover:text-white transition-colors">
               <font-awesome-icon icon="fa-solid fa-file" />
            </div>
            
            <div>
              <h3 class="text-lg md:text-xl font-bold text-[#1e293b] leading-tight">
                {{ guide.title_i18n?.[locale] || guide.title }}
              </h3>
              <p class="text-slate-400 text-[10px] md:text-xs font-bold mt-1 uppercase tracking-widest">
                {{ guide.format || 'PDF' }} <span class="mx-1">•</span> {{ locale === 'en' ? 'Resource File' : 'ملف مورد' }}
              </p>
            </div>
          </div>

          <div class="w-full md:w-auto">
            <button 
              @click="handleDownload(guide)"
              class="w-full md:w-auto bg-[#20CAC4] hover:bg-[#1db1ab] text-white px-8 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#20CAC4]/20 active:scale-95"
            >
              <font-awesome-icon icon="fa-solid fa-download" :class="locale === 'ar' ? 'ml-2' : ''" />
              <span>{{ locale === 'en' ? 'Download' : 'تحميل' }}</span>
            </button>
          </div>

        </div>

        <div v-if="!loading && guides.length === 0" class="text-center py-20 text-slate-400">
           {{ locale === 'en' ? 'No guides available at the moment.' : 'لا توجد أدلة متوفرة حالياً.' }}
        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiClient from '@/api/axios' 
import { useI18n } from 'vue-i18n' // 1. استيراد المكتبة

const { locale } = useI18n() // 2. استخراج اللغة الحالية
const guides = ref<any[]>([])
const loading = ref(true)

const fetchGuides = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/topics')
    guides.value = response.data.data
  } catch (error) {
    console.error("Error fetching knowledge guides:", error)
  } finally {
    loading.value = false
  }
}

const handleDownload = (guide: any) => {
  if (guide.image) {
    window.open(guide.image, '_blank')
  } else {
    const errorMsg = locale.value === 'en' ? 'File link not available.' : 'رابط الملف غير متوفر.'
    alert(errorMsg)
  }
}

onMounted(() => {
  fetchGuides()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
</style>