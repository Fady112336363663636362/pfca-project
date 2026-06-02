<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import apiClient from '@/api/axios' 
import { useI18n } from 'vue-i18n' // 1. استيراد المكتبة

const { locale } = useI18n() // 2. استخراج اللغة الحالية
const partners = ref<any[]>([])
const loading = ref(true)

const getInitials = (name: string) => {
  if (!name) return ''
  const parts = name.split(' ')
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name[0].toUpperCase()
}

const fetchPartners = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/brands')
    partners.value = response.data.data
  } catch (error) {
    console.error("Error fetching partners:", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPartners()
})
</script>

<template>
  <div class="min-h-screen bg-white pb-24 font-sans" :class="locale === 'ar' ? 'text-right' : 'text-left'">
    
    <header class="bg-[#293043] pt-32 pb-16 md:pt-40 md:pb-24 text-white text-center px-6">
      <div class="container mx-auto space-y-6">
        <h1 class="text-3xl md:text-6xl font-bold font-serif tracking-tight leading-tight">
          {{ locale === 'en' ? 'Success Partners' : 'شركاء النجاح' }}
        </h1>
        <p class="text-slate-300 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          {{ locale === 'en' ? 'Trusted by leading retailers and distributors worldwide.' : 'محل ثقة كبار تجار التجزئة والموزعين الرائدين حول العالم.' }}
        </p>
      </div>
    </header>

    <main class="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-20">
      
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        <div v-for="i in 8" :key="i" class="h-64 bg-gray-100 animate-pulse rounded-[1rem]"></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        <RouterLink 
          v-for="partner in partners" 
          :key="partner.id"
          :to="'/partner/' + partner.id"
          class="group p-8 md:p-10 rounded-[1rem] bg-[#F5F7FA] flex flex-col items-center justify-center text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:bg-white hover:border-slate-100 shadow-sm"
        >
          <div 
            class="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#1e293b] flex items-center justify-center text-xl md:text-2xl font-serif text-white mb-4 transition-all duration-500 group-hover:bg-[#20CAC4] group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#20CAC4]/30"
          >
            {{ getInitials(partner.name_i18n?.[locale] || partner.name) }}
          </div>

          <h3 class="text-lg font-bold font-serif text-[#1e293b] mb-1 transition-colors duration-500 group-hover:text-[#20CAC4]">
            {{ partner.name_i18n?.[locale] || partner.name }}
          </h3>

          <p class="text-slate-400 text-xs md:text-sm font-medium">
            {{ partner.description_i18n?.[locale] || partner.description || (locale === 'en' ? 'International Partner' : 'شريك دولي') }}
          </p>
        </RouterLink>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
.grid > a { height: 100%; }
.container { max-width: 1400px; width: 100%; }
</style>