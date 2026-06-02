<template>
  <section class="py-20 bg-[#f8fafc]" :class="locale === 'ar' ? 'text-right' : 'text-left'">
    <div class="container mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div class="space-y-8" :class="locale === 'ar' ? 'order-2 lg:order-1' : 'order-2 lg:order-1'">
          <div class="space-y-4">
            <h2 class="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
              {{ getValLocale('about_main_title') || (locale === 'en' ? 'Rooted in the Jordan Valley Since 1998' : 'متجذرون في وادي الأردن منذ عام 1998') }}
            </h2>
            <p class="text-lg text-slate-600 leading-relaxed max-w-xl">
              {{ getValLocale('about_subtitle') || '...' }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              v-for="(stat, index) in stats" 
              :key="index"
              class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow"
            >
              <span class="text-2xl font-serif text-teal-600 mb-1">{{ stat.value }}</span>
              <span class="text-sm text-slate-500 font-medium leading-tight">{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <div class="relative" :class="locale === 'ar' ? 'order-1 lg:order-2' : 'order-1 lg:order-2'">
          <div class="rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
            <img 
              :src="getVal('about_main_image') || 'https://images.unsplash.com/photo-1594488687126-7d3d1fef53c4?q=80&w=1000'" 
              alt="Farmers in Jordan Valley" 
              class="w-full h-[600px] object-cover min-h-[300px]"
            />
          </div>

          <div 
            class="absolute -bottom-6 z-20 bg-[#26d0ce] text-white p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center min-w-[160px] animate-bounce-subtle"
            :class="locale === 'ar' ? '-right-6' : '-left-6'"
          >
            <span class="text-3xl font-serif">{{ getVal('about_stat_1_number') || '200+' }}</span>
            <span class="text-sm font-semibold uppercase tracking-wider">
              {{ getValLocale('about_stat_1_label') || (locale === 'en' ? 'Families' : 'عائلة') }}
            </span>
          </div>

          <div class="absolute -top-10 w-40 h-40 bg-teal-100 rounded-full blur-3xl opacity-50" :class="locale === 'ar' ? '-left-10' : '-right-10'"></div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import apiClient from '@/api/axios' 
import { useI18n } from 'vue-i18n' 

const { locale } = useI18n() 
const settings = ref([])

const fetchSettings = async () => {
  try {
    const response = await apiClient.get('/settings')
    settings.value = response.data?.data || []
  } catch (error) {
    console.error("Error fetching about settings:", error)
  }
}

const getValLocale = (baseKey) => {
  const key = `${baseKey}_${locale.value}`
  return settings.value?.find(s => s.key === key)?.value || ''
}

const getVal = (key) => {
  return settings.value?.find(s => s.key === key)?.value || ''
}

const stats = computed(() => [
  { 
    label: getValLocale('about_stat_1_label') || (locale === 'en' ? "Farming Families" : "عائلات زراعية"), 
    value: getVal('about_stat_1_number') || "200+" 
  },
  { 
    label: getValLocale('about_stat_2_label') || (locale === 'en' ? "Countries Served" : "دولة نخدمها"), 
    value: getVal('about_stat_2_number') || "25+" 
  },
  { 
    label: getValLocale('about_stat_3_label') || (locale === 'en' ? "Tons Annually" : "طن سنوياً"), 
    value: getVal('about_stat_3_number') || "3,000+" 
  }
])

onMounted(() => {
  fetchSettings()
})
</script>