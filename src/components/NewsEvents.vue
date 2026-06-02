<template>  <section class="py-16 md:py-24 bg-[#F8FAFC]" :class="locale === 'ar' ? 'text-right' : 'text-left'">
    <div class="container mx-auto px-6 md:px-12 lg:px-20">
      
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl md:text-5xl font-serif text-[#1e293b]">
          {{ locale === 'en' ? 'News & Events' : 'الأخبار والفعاليات' }}
        </h2>
      </div>

      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
        <div v-for="i in 4" :key="i" class="h-80 bg-gray-200 animate-pulse rounded-[1rem]"></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
        <RouterLink 
          v-for="(item, index) in newsItems" 
          :key="index"
          :to="'/news/' + item.id"
          class="bg-white rounded-[1rem] md:rounded-[1rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-slate-50"
        >
          <div class="relative h-56 md:h-48 overflow-hidden">
            <img 
              :src="item.image" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <span 
              :class="[
                (item.type || 'News') === 'News' ? 'bg-white/90 text-slate-800' : 'bg-[#26d0ce] text-white',
                locale === 'ar' ? 'right-4' : 'left-4'
              ]"
              class="absolute top-4 px-4 py-1 rounded-full text-[10px] font-bold shadow-sm uppercase tracking-wider"
            >
              {{ (item.type || 'News') === 'News' ? (locale === 'en' ? 'News' : 'خبر') : (locale === 'en' ? 'Event' : 'فعالية') }}
            </span>
          </div>

          <div class="p-5 md:p-6 flex flex-col flex-grow space-y-3" :class="locale === 'ar' ? 'text-right' : 'text-left'">
            <div class="flex items-center gap-2 text-slate-400 text-[11px] md:text-xs font-medium italic" :class="locale === 'ar' ? 'flex-row-reverse' : ''">
              <font-awesome-icon icon="fa-solid fa-calendar-days" />
              {{ formatDate(item.created_at) }}
            </div>

            <h3 class="text-base md:text-lg font-bold text-[#1e293b] leading-tight line-clamp-2 group-hover:text-[#26d0ce] transition-colors font-serif ">
              {{ item.title_i18n?.[locale] || item.title }}
            </h3>

            <p class="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-3 font-light">
              {{ item.description_i18n?.[locale] || item.description || item.content }}
            </p>
          </div>
        </RouterLink>
      </div>

      <div class="flex justify-center">
        <RouterLink
          to="/news"
          class="bg-[#1e293b] hover:bg-slate-800 text-white px-10 py-3.5 md:py-4 rounded-full font-bold flex items-center gap-3 transition-all shadow-lg group/btn text-sm md:text-base"
          :class="locale === 'ar' ? 'flex-row-reverse' : ''"
        >
          <span>{{ locale === 'en' ? 'View More' : 'عرض المزيد' }}</span>
          <font-awesome-icon 
            :icon="locale === 'en' ? 'fa-solid fa-arrow-right' : 'fa-solid fa-arrow-left'" 
            class="text-xs transition-transform group-hover/btn:translate-x-1" 
          />
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiClient from '@/api/axios'
import { useI18n } from 'vue-i18n' 

const { locale } = useI18n()
const newsItems = ref<any[]>([])
const loading = ref(true)

const formatDate = (dateString: string) => {
  if (!dateString) return locale.value === 'en' ? 'Recent' : 'حديث'
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(locale.value === 'ar' ? 'ar-EG' : 'en-US', options)
}

const fetchNews = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/topics')
    newsItems.value = response.data.data.slice(0, 4)
  } catch (error) {
    console.error("Error fetching home news:", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchNews()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>