<template>
  <div class="bg-[#1e293b] py-3 overflow-hidden border-y border-slate-700 flex" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    
    <div v-if="newsItems.length > 0" class="flex whitespace-nowrap animate-marquee">
      <div v-for="n in 2" :key="n" class="flex items-center">
        <div v-for="(item, index) in newsItems" :key="index" class="flex items-center mx-5">
          <span class="text-zinc-300 text-sm md:text-sm font-medium">
            {{ item }}
          </span>
          <div class="w-1 h-1 bg-teal-400 rounded-full mx-3"></div>
        </div>
      </div>
    </div>

    <div v-else class="flex items-center px-10 text-zinc-500 text-xs italic">
      {{ locale === 'en' ? 'Latest Updates from PFCA...' : 'أحدث المستجدات من الجمعية...' }}
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import apiClient from '@/api/axios' 
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const newsItems = ref<string[]>([])

const fetchMarqueeNews = async () => {
  try {
    const response = await apiClient.get('/news-events')
    console.log("==========================================================================")
      console.log(response);
      
    if (response.data && Array.isArray(response.data.data)) {
      const titles = response.data.data.map((item: any) => {
        return item.description_i18n?.[locale.value]
      }).filter(Boolean)

      newsItems.value = titles

      if (titles.length > 0 && titles.length < 5) {
          newsItems.value = [...titles, ...titles]
      }
    }
  } catch (error) {
    console.error('حدث خطأ أثناء جلب الأخبار:', error)
  }
}

onMounted(() => {
  fetchMarqueeNews()
})

watch(locale, () => {
  fetchMarqueeNews()
})
</script>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes marqueeRTL {
  0% { transform: translateX(0); }
  100% { transform: translateX(50%); }
}

.animate-marquee {
  display: inline-flex;
  animation: marquee 30s linear infinite;
}

[dir="rtl"] .animate-marquee {
  animation: marqueeRTL 30s linear infinite;
}
</style>