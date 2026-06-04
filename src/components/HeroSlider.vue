<template>
  <Carousel 
    v-if="!isLoading && slides.length > 0"
    :plugins="[Autoplay({ delay: 6000, stopOnInteraction: false })]"
    class="relative w-full h-[500px] sm:h-[650px] md:h-[800px] lg:h-[900px] xl:h-[1000px] overflow-hidden"
    :dir="locale === 'ar' ? 'rtl' : 'ltr'"
  >
    <CarouselContent>
      <CarouselItem v-for="(slide, index) in slides" :key="index">
        <!-- الحاوية متجاوبة الارتفاع لجميع الشاشات -->
        <div class="relative h-[500px] sm:h-[650px] md:h-[800px] lg:h-[900px] xl:h-[1000px] w-full group">
          
          <!-- صورة السلايدر مع أنيميشن زوم طفيف -->
          <img 
            :src="getImageUrl(slide.image)" 
            class="w-full h-full object-cover transition-transform duration-[1500ms] scale-102 group-hover:scale-105" 
            alt="Hero Image" 
          />
          
          <!-- تظليل الخلفية واستقبال المحتوى بالتوجيه التلقائي -->
          <div class="absolute inset-0 bg-black/50 flex items-center justify-start"
               :class="locale === 'ar' ? 'px-6 sm:px-12 md:pr-40 md:pl-8 text-right' : 'px-6 sm:px-12 md:pl-40 md:pr-8 text-left'">
            
            <!-- نصوص السلايدر مع حركة صعود وتلاشي ناعم عند الظهور -->
            <div class="max-w-3xl text-white slide-content-animate space-y-4 md:space-y-6">
              <h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight uppercase font-bold">
                {{ slide.title_i18n?.[locale] || slide.title }}
              </h1>
              
              <p class="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-light max-w-2xl">
                {{ slide.description_i18n?.[locale] || slide.description }}
              </p>
              
              <div class="flex flex-wrap gap-3 pt-4 sm:pt-6">
                <RouterLink 
                  to="/products" 
                  class="bg-[#20CAC4] hover:bg-[#1db1ab] text-white px-6 py-3 sm:px-10 sm:py-4 rounded-full text-sm sm:text-lg font-bold flex items-center justify-center gap-2 sm:gap-3 transition-all shadow-lg shadow-[#20CAC4]/20 active:scale-95"
                >
                  <span>{{ locale === 'en' ? 'Explore Products' : 'استكشف المنتجات' }}</span>
                  <font-awesome-icon :icon="locale === 'en' ? 'fa-solid fa-arrow-right' : 'fa-solid fa-arrow-left'" class="text-xs sm:text-sm" />
                </RouterLink>

                <RouterLink 
                  to="/distributor" 
                  class="border border-white/60 hover:bg-[#61646B] text-white px-6 py-3 sm:px-10 sm:py-4 rounded-full text-sm sm:text-lg font-bold transition-all backdrop-blur-sm flex items-center justify-center active:scale-95"
                >
                  {{ locale === 'en' ? 'Become a Distributor' : 'كن موزعاً لنا' }}
                </RouterLink>
              </div>
            </div>

          </div>
        </div>
      </CarouselItem>
    </CarouselContent>

    <!-- أزرار التحكم مجهزة بحجم متجاوب (h-10 على الجوال وتكبر تلقائياً على الشاشات الأكبر) وتظهر دائماً للتقليب -->
     <CarouselPrevious 
      class="absolute top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 bg-white/10 hover:bg-[#20CAC4] text-white border-none transition-all flex items-center justify-center rounded-full z-30"
      :class="locale === 'ar' ? 'right-2 sm:right-4 md:right-8' : 'left-2 sm:left-4 md:left-8'" 
    />
    
    <CarouselNext 
      class="absolute top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 bg-white/10 hover:bg-[#20CAC4] text-white border-none transition-all flex items-center justify-center rounded-full z-30"
      :class="locale === 'ar' ? 'left-2 sm:left-4 md:left-8' : 'right-2 sm:right-4 md:right-8'" 
    />
  </Carousel>

  <!-- واجهة تحميل السلايدر متجاوبة الارتفاع -->
  <div v-else-if="isLoading" class="w-full h-[500px] sm:h-[650px] md:h-[800px] lg:h-[900px] xl:h-[1000px] bg-slate-950 flex items-center justify-center text-white">
      <div class="animate-pulse flex flex-col items-center gap-3">
        <div class="w-10 h-10 border-4 border-t-[#20CAC4] border-slate-700 rounded-full animate-spin"></div>
        <span class="text-sm text-slate-400">{{ locale === 'en' ? 'Loading Sliders...' : 'جاري التحميل...' }}</span>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiClient from '@/api/axios' 
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from 'vue-i18n' 

const { locale } = useI18n() 
const slides = ref<any[]>([])
const isLoading = ref(true)

const fetchSliders = async () => {
  try {
    const response = await apiClient.get('/sliders')
    // حماية المصفوفة بإسناد قيمة افتراضية فارغة
    slides.value = response.data?.data || []
  } catch (error) {
    console.error("Error fetching sliders:", error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchSliders()
})

const getImageUrl = (url: string) => {
  if (!url) return '';
  const lastHttpIndex = url.lastIndexOf('http');
  if (lastHttpIndex > 0) {
    return url.substring(lastHttpIndex);
  }
  return url;
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-content-animate {
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>