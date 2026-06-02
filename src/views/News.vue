<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import apiClient from '@/api/axios'
import { useI18n } from 'vue-i18n' // 1. استيراد المكتبة
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const { locale } = useI18n() // 2. استخراج اللغة الحالية
const activeFilter = ref('All')
const allNews = ref<any[]>([])
const loading = ref(true)

// 3. تعريف التبويبات المترجمة
const tabs = computed(() => [
  { key: 'All', label: locale.value === 'en' ? 'All' : 'الكل' },
  { key: 'News', label: locale.value === 'en' ? 'News' : 'الأخبار' },
  { key: 'Events', label: locale.value === 'en' ? 'Events' : 'الفعاليات' }
])

const fetchNews = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/topics')
    allNews.value = response.data.data
  } catch (error) {
    console.error("Error fetching news:", error)
  } finally {
    loading.value = false
  }
}

// دالة لتنسيق التاريخ بناءً على اللغة المختارة
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  // سيظهر التاريخ بالعربي لو اللغة عربي وبالإنجليزي لو اللغة إنجليزي
  return new Date(dateString).toLocaleDateString(locale.value === 'ar' ? 'ar-EG' : 'en-US', options)
}

onMounted(() => {
  fetchNews()
})

const filteredNews = computed(() => {
  if (activeFilter.value === 'All') return allNews.value
  return allNews.value.filter(item => {
    const type = item.type || 'News'
    return type === activeFilter.value || type === activeFilter.value.slice(0, -1)
  })
})
</script>

<template>
  <!-- إضافة كلاس الاتجاه RTL/LTR بناءً على اللغة -->
  <div class="min-h-screen bg-[#F8FAFC] pb-24 font-sans" :class="locale === 'ar' ? 'text-right' : 'text-left'">
    
    <header class="bg-[#293043] pt-32 pb-16 md:pt-40 md:pb-24 text-white text-center px-6">
      <div class="container mx-auto space-y-6">
        <!-- ترجمة العنوان والوصف -->
        <h1 class="text-4xl md:text-6xl font-bold font-serif tracking-tight leading-tight">
          {{ locale === 'en' ? 'News & Events' : 'الأخبار والفعاليات' }}
        </h1>
        <p class="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-light">
          {{ locale === 'en' ? 'Stay updated with the latest from PFCA.' : 'ابقَ على اطلاع بأحدث أخبار وفعاليات الجمعية.' }}
        </p>
      </div>
    </header>

    <div class="flex justify-center items-center gap-3 md:gap-4 py-10 px-6">
      <button 
        v-for="tab in tabs" 
        :key="tab.key"
        @click="activeFilter = tab.key"
        :class="[
          activeFilter === tab.key 
          ? 'bg-[#2D3748] text-white shadow-xl scale-105' 
          : 'bg-white text-slate-500 border border-slate-200 hover:border-[#0ABAB5] hover:bg-[#F5F7FA]'
        ]"
        class="w-16 h-8 md:w-16 md:h-8 rounded-full font-bold transition-all duration-300 flex items-center justify-center text-sm shadow-md"
      >
        {{ tab.label }}
      </button>
    </div>

    <main class="container mx-auto px-6 md:px-12 lg:px-20">
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        <div v-for="i in 4" :key="i" class="h-80 bg-gray-200 animate-pulse rounded-[1rem]"></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        <RouterLink 
          v-for="item in filteredNews" 
          :key="item.id"
          :to="'/news/' + item.id"
          class="group bg-white rounded-[1rem] overflow-hidden shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5 flex flex-col border border-slate-100"
        >
          <div class="relative h-44 md:h-48 overflow-hidden">
            <img 
              :src="item.image" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div class="absolute top-3" :class="locale === 'ar' ? 'right-3' : 'left-3'">
              <span class="bg-[#1e293b]/80 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                {{ item.category_i18n?.[locale] || item.category || 'PFCA' }}
              </span>
            </div>
          </div>

         <div class="p-5 flex flex-col flex-grow space-y-2.5" :class="locale === 'ar' ? 'text-right' : 'text-left'">
            <div class="flex items-center gap-2 text-slate-400 text-[10px] font-medium italic">
              <font-awesome-icon icon="fa-solid fa-calendar-days" />
              {{ formatDate(item.created_at) }}
            </div>

            <h3 class="text-base font-bold text-[#1e293b] leading-tight group-hover:text-[#0ABAB5] transition-colors font-serif line-clamp-2">
              {{ item.title_i18n?.[locale] || item.title }}
            </h3>

            <p class="text-slate-500 text-[13px] leading-relaxed flex-grow font-light line-clamp-2">
              {{ item.description_i18n?.[locale] || item.description || item.content }}
            </p>
            
            <div class="flex items-center gap-2 text-[#0ABAB5] font-bold text-[13px] group/link pt-1 transition-all">
              <span>{{ locale === 'en' ? 'Read More' : 'اقرأ المزيد' }}</span>
              <font-awesome-icon 
                :icon="locale === 'en' ? 'fa-solid fa-arrow-right' : 'fa-solid fa-arrow-left'" 
                class="text-[10px] transition-transform group-hover:translate-x-1" 
              />
            </div>
          </div>
        </RouterLink>
      </div>
    </main>
  </div>
</template>