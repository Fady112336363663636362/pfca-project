<template>
  <section class="py-24 bg-white" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="container mx-auto px-6 md:px-12 lg:px-20 text-center">
      
      <h2 class="text-4xl md:text-5xl font-serif text-[#1e293b] mb-16 md:mb-20 tracking-tight">
        {{ locale === 'en' ? 'Success Partners' : 'شركاء النجاح' }}
      </h2>

      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 opacity-50 animate-pulse">
        <div v-for="i in 8" :key="i" class="bg-gray-200 h-32 rounded-2xl"></div>
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <RouterLink 
          v-for="partner in partners" 
          :key="partner.id"
          :to="'/partner/' + partner.id"
          class="group bg-[#F5F7FA] rounded-2xl py-5 px-3 flex flex-col items-center justify-center transition-all duration-300 hover:bg-[#F0FDFA] hover:border-[#26d0ce] border border-transparent min-w-0"
          :class="{'bg-[#F0FDFA] border-[#26d0ce]': partner.is_active}" 
        >
        
          <div 
            class="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold transition-colors bg-slate-200 text-slate-600 group-hover:bg-[#26d0ce]/20 group-hover:text-[#26d0ce] shrink-0"
          >
            <img 
              v-if="partner.logo" 
              :src="partner.logo" 
              alt="Partner Logo" 
              class="w-full h-full object-contain"
            /> 
          </div>

          <span class="text-xs md:text-sm font-bold text-center transition-colors group-hover:text-[#26d0ce] mt-3 break-words w-full px-1 line-clamp-2 leading-tight">
            {{ partner.name_i18n?.[locale] || partner.name }}
          </span>
           
         
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '@/api/axios' 
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const partners = ref([])
const loading = ref(true)

const getInitials = (name) => {
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
    partners.value = response.data?.data || []
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif {
  font-family: 'Playfair Display', serif;
}
</style>