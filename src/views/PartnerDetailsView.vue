<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import apiClient from '@/api/axios' 
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const route = useRoute()
const router = useRouter()

const partner = ref<any>(null)
const loading = ref(true)

const fetchPartnerData = async () => {
  try {
    loading.value = true
    const id = route.params.id
    const response = await apiClient.get(`/brands/${id}`)
    partner.value = response.data.data
  } catch (error) {
    console.error("Error fetching partner details:", error)
  } finally {
    loading.value = false
  }
}

const getInitials = (name: string) => {
  if (!name) return ''
  const parts = name.split(' ')
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name[0].toUpperCase()
}

onMounted(() => {
  fetchPartnerData()
})

watch(() => route.params.id, fetchPartnerData)
</script>

<template>
  <div v-if="loading" class="min-h-screen flex items-center justify-center bg-white">
     <div class="animate-pulse text-2xl font-bold text-[#26d0ce]">
       {{ locale === 'en' ? 'Loading Partner...' : 'جاري تحميل الشريك...' }}
     </div>
  </div>

  <div v-else-if="partner" class="min-h-screen bg-white font-sans" :class="locale === 'ar' ? 'text-right' : 'text-left'">
    
    <header class="bg-[#1e293b] pt-32 pb-24 text-white px-6">
      <div class="container mx-auto">
        <RouterLink 
          to="/partners" 
          class="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium mb-10 group"
          :class="locale === 'ar' ? 'flex-row-reverse' : ''"
        >
          <font-awesome-icon :icon="locale === 'en' ? 'fa-solid fa-arrow-left' : 'fa-solid fa-arrow-right'" class="transition-transform group-hover:-translate-x-1" />
          <span>{{ locale === 'en' ? 'Back to Partners' : 'العودة للشركاء' }}</span>
        </RouterLink>

        <h1 class="text-4xl md:text-7xl font-bold font-serif italic tracking-tight">
          {{ partner.name_i18n?.[locale] || partner.name }}
        </h1>
      </div>
    </header>

    <main class="container mx-auto px-6 -mt-16 flex flex-col items-center">
      
      <div class="bg-[#26d0ce] text-white w-32 h-32 rounded-[2.5rem] overflow-hidden flex items-center justify-center text-4xl font-bold shadow-2xl shadow-teal-500/20 border-8 border-white z-10 transition-transform hover:scale-105 duration-500">
        <img v-if="partner.image" :src="partner.image" class="w-full h-full object-contain p-4 bg-white" />
        <span v-else>{{ getInitials(partner.name) }}</span>
      </div>

      <div class="mt-8 text-center space-y-3">
        <h2 class="text-4xl font-bold text-[#1e293b] font-serif tracking-tight">
          {{ partner.name_i18n?.[locale] || partner.name }}
        </h2>
        
        <div class="flex items-center justify-center gap-2 text-teal-600 font-medium">
          <font-awesome-icon icon="fa-solid fa-location-dot" />
          <span class="tracking-wide uppercase text-sm font-bold">
            {{ locale === 'en' ? 'Success Partner' : 'شريك نجاح' }}
          </span>
        </div>
      </div>

      <div class="mt-16 max-w-3xl text-center">
        <p class="text-xl md:text-2xl text-slate-500 leading-relaxed font-light italic">
          {{ partner.description_i18n?.[locale] || partner.description || (locale === 'en' ? 'International partner collaborating with PFCA.' : 'شريك دولي متعاون مع الجمعية.') }}
        </p>
      </div>

    </main>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
.shadow-2xl { box-shadow: 0 25px 50px -12px rgba(38, 208, 206, 0.25); }
</style>