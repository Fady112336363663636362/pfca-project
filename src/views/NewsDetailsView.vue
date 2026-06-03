<template>
  <div v-if="loading" class="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
     <div class="animate-pulse flex flex-col items-center gap-3">
       <div class="w-10 h-10 border-4 border-t-[#26d0ce] border-slate-200 rounded-full animate-spin"></div>
       <span class="text-slate-400 text-sm">{{ locale === 'en' ? 'Loading Details...' : 'جاري التحميل...' }}</span>
     </div>
  </div>

  <div v-else-if="newsItem" class="min-h-screen bg-[#F8FAFC] font-sans" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    
    <div class="max-w-4xl mx-auto px-6 pt-32 pb-6">
      <div class="flex justify-end" dir="ltr">
        <RouterLink 
          to="/news" 
          class="text-slate-400 hover:text-[#26d0ce] transition-colors font-bold flex items-center gap-2 group text-sm"
        >
          <span>{{ locale === 'en' ? 'Back to News' : 'العودة للأخبار' }}</span>
          <font-awesome-icon 
            :icon="locale === 'en' ? 'fa-solid fa-arrow-right' : 'fa-solid fa-arrow-right'" 
            class="text-xs transition-transform duration-200"
            :class="locale === 'en' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'"
          />
        </RouterLink>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 md:px-6">
      <div class="bg-white rounded-[1rem] shadow-sm overflow-hidden border border-slate-100">
        
        <div class="relative w-full h-56 md:h-[320px]">
          <Carousel :plugins="[Autoplay({ delay: 4000 })]" class="w-full h-full">
            <CarouselContent>
              <CarouselItem v-for="(img, idx) in (newsItem.images || [newsItem.image])" :key="idx">
                <img :src="img" class="w-full h-56 md:h-[320px] object-cover" />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
          
          <!-- شارة فئة الخبر المترجمة والمتموضعة حسب اللغة -->
          <span class="absolute top-4 bg-[#26d0ce] text-white px-4 py-1.5 rounded-full text-[11px] font-bold shadow-md uppercase"
                :class="locale === 'ar' ? 'right-4' : 'left-4'">
            {{ newsItem.category_i18n?.[locale] || newsItem.category || 'PFCA' }}
          </span>
        </div>

        <div class="p-6 md:p-10 space-y-6">
          <div class="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <font-awesome-icon icon="fa-solid fa-calendar-days" />
            {{ formatDate(newsItem.created_at) }}
          </div>

          <div class="space-y-3">
            <h1 class="text-2xl md:text-3xl font-bold text-[#1e293b] leading-tight font-serif">
              {{ newsItem.title_i18n?.[locale] || newsItem.title }}
            </h1>
            
            <!-- 🟢 التعديل المطلوب: إضافة وصف الخبر القادم من السيرفر تحت العنوان مباشرة 🟢 -->
            <p v-if="newsItem.description_i18n?.[locale] || newsItem.description" class="text-slate-500 text-sm md:text-base leading-relaxed font-light ">
              {{ newsItem.description_i18n?.[locale] || newsItem.description }}
            </p>
          </div>

          <p v-if="paragraphs.length > 0" class="text-lg md:text-xl text-[#1e293b] leading-relaxed font-medium">
            {{ paragraphs[0] }}
          </p>

          <div class="w-16 h-1 bg-[#26d0ce] rounded-full"></div>

          <div class="space-y-4">
            <!-- باقي فقرات الخبر التفصيلية المنسقة تلقائياً -->
            <p v-for="(p, i) in paragraphs.slice(1)" :key="i" class="text-base text-slate-500 leading-relaxed font-light">
              {{ p }}
            </p>
          </div>
        </div>
      </div>

      <!-- قسم أخبار ذات صلة (قبل الفوتر مباشرة) متجاوب تماماً -->
      <section class="py-16 mt-10 border-t border-slate-200/60">
        <h2 class="text-2xl font-bold text-[#1e293b] font-serif italic mb-8">
          {{ locale === 'en' ? 'Related News' : 'أخبار ذات صلة' }}
        </h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <RouterLink 
            v-for="item in relatedNews" 
            :key="item.id"
            :to="'/news/' + item.id"
            class="group bg-white rounded-[1rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col border border-slate-100"
          >
            <div class="relative h-36 overflow-hidden">
              <img :src="item.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>

            <div class="p-5 space-y-2">
              <div class="flex items-center gap-2 text-slate-400 text-[10px] font-normal">
                <font-awesome-icon icon="fa-solid fa-calendar-days" />
                {{ formatDate(item.created_at) }}
              </div>
              <h3 class="text-sm font-bold text-[#1e293b] leading-tight group-hover:text-[#26d0ce] transition-colors font-serif  line-clamp-2">
                {{ item.title_i18n?.[locale] || item.title }}
              </h3>
              <div class="flex items-center gap-1.5 text-[#26d0ce] font-bold text-[11px] pt-1">
                <span>{{ locale === 'en' ? 'Read Story' : 'اقرأ المزيد' }}</span>
                <font-awesome-icon :icon="locale === 'en' ? 'fa-solid fa-arrow-right' : 'fa-solid fa-arrow-left'" class="text-[9px]" />
              </div>
            </div>
          </RouterLink>
        </div>
      </section>
    </div>
  </div> 
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import apiClient from '@/api/axios' 
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from 'vue-i18n' 

const { locale } = useI18n() 
const route = useRoute()
const router = useRouter()
const loading = ref(true)

const newsItem = ref<any>(null)
const relatedNews = ref<any[]>([])

const fetchNewsDetails = async () => {
  try {
    loading.value = true
    const id = route.params.id
    const response = await apiClient.get(`/news-events/${id}`)
    newsItem.value = response.data?.data || null

    const listRes = await apiClient.get('/news-events')
    relatedNews.value = (listRes.data?.data || [])
      .filter((n: any) => n.id !== Number(id))
      .slice(0, 3)

  } catch (error) {
    console.error("Error fetching news details:", error)
  } finally {
    loading.value = false
  }
}

// معالجة المحتوى وتقسيمه لفقرات حسب اللغة الحالية
const paragraphs = computed(() => {
  const content = newsItem.value?.content_i18n?.[locale.value] || newsItem.value?.content || ''
  if (!content) return []
  return content.split('\n').filter((p: string) => p.trim() !== '')
})

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(locale.value === 'ar' ? 'ar-EG' : 'en-US', options)
}

onMounted(() => {
  fetchNewsDetails()
})

watch(() => route.params.id, () => {
  fetchNewsDetails()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
</style>