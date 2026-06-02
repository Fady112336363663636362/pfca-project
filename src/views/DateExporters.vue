<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiClient from '@/api/axios' 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from 'vue-i18n' 

const { locale } = useI18n() 
const exporters = ref<any[]>([])
const loading = ref(true)

const fetchExporters = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/brands')
    exporters.value = response.data.data
  } catch (error) {
    console.error("Error fetching exporters:", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchExporters()
})
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] pb-24 font-sans" :class="locale === 'ar' ? 'text-right' : 'text-left'">
    
    <header class="bg-[#1e293b] pt-32 md:pt-40 pb-16 md:pb-24 text-white px-6 text-center">
      <div class="container mx-auto space-y-4">
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold font-serif tracking-tight leading-tight">
          {{ locale === 'en' ? 'Date Exporting Companies' : 'شركات تصدير التمور' }}
        </h1>
        <p class="text-slate-400 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          {{ locale === 'en' ? 'Leading Palestinian companies in the industry.' : 'الشركات الفلسطينية الرائدة في صناعة التمور.' }}
        </p>
      </div>
    </header>

    <main class="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-20">
      
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        <div v-for="i in 3" :key="i" class="h-[500px] bg-white rounded-[1rem] animate-pulse"></div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        <div 
          v-for="company in exporters" 
          :key="company.id"
          class="group bg-white rounded-[1rem] p-4 shadow-sm border border-slate-100 flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
        >
          <div class="h-56 md:h-64 w-full overflow-hidden rounded-[1rem] mb-6">
            <img :src="company.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>

          <div class="px-2 md:px-4 pb-4 space-y-4 flex flex-col flex-grow">
            <h3 class="text-xl md:text-2xl font-serif text-[#1e293b] font-bold tracking-tight">
              {{ company.name_i18n?.[locale] || company.name }}
            </h3>
            <p class="text-slate-500 text-sm md:text-[15px] leading-relaxed line-clamp-4 flex-grow font-light">
              {{ company.description_i18n?.[locale] || company.description }}
            </p>
            
            <div class="space-y-3 pt-4">
              <a :href="company.website || '#'" target="_blank"
                class="w-full bg-[#20CAC4] hover:bg-[#1db1ab] text-white py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#20CAC4]/20 active:scale-95">
                <font-awesome-icon icon="fa-solid fa-globe" :class="locale === 'ar' ? 'ml-2' : 'mr-2'" />
                {{ locale === 'en' ? 'Visit Website' : 'زيارة الموقع' }}
              </a>

              <a :href="'mailto:' + company.email"
                class="w-full border-2 border-[#20CAC4] text-[#20CAC4] hover:bg-[#20CAC4] hover:text-white py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95">
                <font-awesome-icon icon="fa-solid fa-envelope" :class="locale === 'ar' ? 'ml-2' : 'mr-2'" />
                {{ locale === 'en' ? 'Contact Company' : 'تواصل مع الشركة' }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!loading && exporters.length === 0" class="text-center py-20 text-slate-400">
          {{ locale === 'en' ? 'No exporting companies listed yet.' : 'لا يوجد شركات مصدّرة حالياً.' }}
      </div>
    </main>
  </div>
</template>