<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { computed, ref, watch, onMounted } from 'vue'
import apiClient from '@/api/axios' 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from 'vue-i18n' 

const { locale } = useI18n() 
const route = useRoute()
const router = useRouter()
const loading = ref(true)

const partner = ref<any>(null)
const otherPartners = ref<any[]>([])

const fetchPartnerData = async () => {
  try {
    loading.value = true
    const partnerId = route.params.id

    const response = await apiClient.get(`/brands/${partnerId}`)
    partner.value = response.data.data

    const allRes = await apiClient.get('/brands')
    otherPartners.value = allRes.data.data
      .filter((p: any) => p.id !== Number(partnerId))
      .slice(0, 3)

  } catch (error) {
    console.error("Error fetching partner details:", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPartnerData()
})

watch(() => route.params.id, () => {
  fetchPartnerData()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

const getInitials = (name: string) => {
  if (!name) return ''
  return name[0].toUpperCase()
}
</script>

<template>
  <div class="min-h-screen bg-[#F5F7FA] pt-32 pb-20 font-sans" :class="locale === 'ar' ? 'text-right' : 'text-left'">
    
    <div v-if="loading" class="container mx-auto px-4 md:px-20 text-center py-20">
      <div class="animate-pulse text-2xl font-bold text-[#26d0ce]">
        {{ locale === 'en' ? 'Loading Partner Details...' : 'جاري تحميل تفاصيل الشريك...' }}
      </div>
    </div>

    <div v-else-if="partner" class="container mx-auto px-4 md:px-12 lg:px-20">
      
      <nav class="flex flex-wrap gap-2 text-xs md:text-sm text-slate-400 mb-8" :class="locale === 'ar' ? 'flex-row-reverse' : ''">
        <RouterLink to="/" class="hover:text-[#26d0ce]">{{ locale === 'en' ? 'Home' : 'الرئيسية' }}</RouterLink> / 
        <RouterLink to="/partners" class="hover:text-[#26d0ce]">{{ locale === 'en' ? 'Success Partners' : 'شركاء النجاح' }}</RouterLink> / 
        <span class="text-[#26d0ce] font-bold">{{ partner.name_i18n?.[locale] || partner.name }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        
        <div class="space-y-6">
          <div class="rounded-[1rem] md:rounded-[2rem] overflow-hidden shadow-2xl aspect-square border border-slate-100 bg-white flex items-center justify-center p-12">
            <img v-if="partner.image" :src="partner.image" class="max-w-full max-h-full object-contain" />
            <div v-else class="text-9xl font-serif text-slate-200">
              {{ getInitials(partner.name_i18n?.[locale] || partner.name) }}
            </div>
          </div>
        </div>

        <div class="space-y-8 md:space-y-10">
          <div class="space-y-4">
            <span class="bg-[#DDF1F3] text-[#26d0ce] py-1.5 px-4 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest inline-block">
              {{ locale === 'en' ? 'Success Partner' : 'شريك نجاح' }}
            </span>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e293b] font-serif tracking-tight leading-tight">
              {{ partner.name_i18n?.[locale] || partner.name }}
            </h1>
            <p class="text-base md:text-lg text-slate-500 leading-relaxed font-light">
              {{ partner.description_i18n?.[locale] || partner.description || (locale === 'en' ? 'A trusted global partner.' : 'شريك عالمي موثوق.') }}
            </p>
          </div>

          <div class="space-y-6">
            <h3 class="text-xl font-bold text-[#1e293b]">
              {{ locale === 'en' ? 'Partner Information' : 'معلومات الشريك' }}
            </h3>
            <div class="bg-white rounded-[1rem] overflow-hidden border border-slate-100 shadow-sm">
              <div class="flex flex-col sm:flex-row justify-between p-4 md:p-5 border-b border-slate-100 gap-1 sm:gap-4" :class="locale === 'ar' ? 'sm:flex-row-reverse' : ''">
                <span class="font-bold text-slate-400 text-xs uppercase tracking-wider">{{ locale === 'en' ? 'Partner Name' : 'اسم الشريك' }}</span>
                <span class="font-bold text-[#1e293b] text-sm md:text-base">{{ partner.name_i18n?.[locale] || partner.name }}</span>
              </div>
              <div class="flex flex-col sm:flex-row justify-between p-4 md:p-5 border-b border-slate-100 gap-1 sm:gap-4" :class="locale === 'ar' ? 'sm:flex-row-reverse' : ''">
                <span class="font-bold text-slate-400 text-xs uppercase tracking-wider">{{ locale === 'en' ? 'Status' : 'الحالة' }}</span>
                <span class="font-bold text-[#26d0ce] text-sm md:text-base">{{ locale === 'en' ? 'Active Global Partner' : 'شريك عالمي نشط' }}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 mt-10">
            <button class="flex-grow bg-[#1e293b] hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95">
              <font-awesome-icon icon="fa-solid fa-link" />
              <span>{{ locale === 'en' ? 'Visit Partner Website' : 'زيارة موقع الشريك' }}</span>
            </button>
          </div>
        </div>
      </div>

      <section class="py-20 border-t border-slate-200/60 mt-20">
        <div class="flex justify-between items-center mb-10" :class="locale === 'ar' ? 'flex-row-reverse' : ''">
          <h2 class="text-2xl md:text-3xl font-bold text-[#1e293b] font-serif italic tracking-tight">
            {{ locale === 'en' ? 'Other Partners' : 'شركاء آخرون' }}
          </h2>
          <RouterLink to="/partners" class="text-[#0ABAB5] font-bold flex items-center gap-2 hover:gap-3 transition-all group text-sm md:text-base" :class="locale === 'ar' ? 'flex-row-reverse' : ''">
            <span>{{ locale === 'en' ? 'View All' : 'عرض الكل' }}</span>
            <font-awesome-icon :icon="locale === 'en' ? 'fa-solid fa-arrow-right' : 'fa-solid fa-arrow-left'" class="text-xs transition-transform group-hover:translate-x-1" />
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <RouterLink 
            v-for="item in otherPartners" :key="item.id"
            :to="'/partner/' + item.id"
            class="group bg-white rounded-[1rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-50 flex flex-col"
          >
            <div class="relative h-56 md:h-64 overflow-hidden flex items-center justify-center bg-slate-50 p-10">
              <img :src="item.image" class="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div class="p-6 md:p-8 space-y-3 text-center">
              <h3 class="text-lg font-bold text-[#1e293b] leading-tight group-hover:text-[#0ABAB5] transition-colors font-serif italic">
                {{ item.name_i18n?.[locale] || item.name }}
              </h3>
            </div>
          </RouterLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
.container { width: 100%; max-width: 1400px; }
</style>