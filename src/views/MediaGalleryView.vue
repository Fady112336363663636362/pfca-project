<template>
  <div class="min-h-screen bg-white pb-24 font-sans" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    
    <!-- هيدر الصفحة متجاوب ومحاذى -->
    <header class="bg-[#293043] pt-30 pb-15 text-white px-6 text-center">
      <div class="container mx-auto space-y-4">
        <h1 class="text-5xl md:text-5xl font-bold font-serif tracking-tight">
          {{ locale === 'en' ? 'Media Gallery' : 'معرض الوسائط' }}
        </h1>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          {{ locale === 'en' ? 'Photos and videos from our farms and operations.' : 'صور وفيديوهات من مزارعنا وعملياتنا الميدانية.' }}
        </p>
      </div>
    </header>

    <!-- أزرار تصفية التبويبات الفخمة -->
    <div class="container mx-auto px-6 py-12 flex justify-center gap-4">
      <button 
        v-for="tab in tabs" 
        :key="tab.key"
        @click="activeFilter = tab.key"
        :class="[
          activeFilter === tab.key 
          ? 'bg-[#0ABAB5] text-white ' 
          : 'bg-[#F5F7FA] text-slate-500 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100'
        ]"
        class="px-10 py-2.5 rounded-full font-bold transition-all duration-300 min-w-[100px] text-sm"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- شبكة عرض الوسائط متجاوبة وتدعم الضغط للمعاينة الكبيرة -->
    <main class="container mx-auto px-6 md:px-12 lg:px-20">
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="aspect-[4/3] bg-gray-100 animate-pulse rounded-[1rem]"></div>
      </div>

      <div v-else-if="filteredMedia.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div 
          v-for="(item, index) in filteredMedia" 
          :key="item.id"
          @click="openLightbox(index)"
          class="group relative aspect-[4/3] rounded-[1rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-50 cursor-pointer"
        >
          <!-- الصورة المصغرة للشبكة -->
          <img 
            v-if="item.type === 'photo'" 
            :src="item.src" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />

          <!-- الفيديو المصغر للشبكة -->
          <div v-else class="w-full h-full bg-slate-900 flex items-center justify-center">
             <div class="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform">▶</div>
          </div>

          <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </div>
      </div>

      <!-- حالة خلو الفلتر من البيانات -->
      <div v-else class="text-center py-20 text-slate-400 font-bold">
          {{ locale === 'en' ? 'No media items found in this category.' : 'لا توجد عناصر وسائط في هذا القسم حالياً.' }}
      </div>
    </main>

    <!-- نظام المعاينة الفاخر والمسطح تماماً (بدون إطار أبيض أو حدود حول الصورة) -->
    <div v-if="isLightboxOpen" class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-in fade-in duration-300">
      
      <!-- زر الإغلاق الدائري بالزاوية العلوية اليمنى للمتصفح -->
<button @click="closeLightbox" class="absolute top-8 left-8 text-white/70 hover:text-white text-4xl p-4 transition-all z-[110] active:scale-95 cursor-pointer">✕</button>
      
      <!-- أسهم الانتقال الجانبية بالمنتصف (طافية في اليمين واليسار) لسهولة التبديل -->
      <button @click="prevItem" class="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-[110] border-none text-2xl active:scale-90 cursor-pointer">‹</button>
      <button @click="nextItem" class="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-[110] border-none text-2xl active:scale-90 cursor-pointer">›</button>
      
      <!-- الحاوية الداخلية: تم إزالة الإطار الأبيض والحدود والظل لتظهر الصورة طافية شفافة وحرة تماماً -->
      <div class="max-w-5xl max-h-[85vh] w-full px-6 flex flex-col items-center justify-center relative">
        <div class="max-h-[75vh] flex items-center justify-center overflow-hidden">
          <img 
            v-if="filteredMedia[currentIndex].type === 'photo'" 
            :src="filteredGalleryItemSrc" 
            class="max-w-full max-h-[75vh] object-contain animate-in zoom-in-95 duration-300" 
            :alt="filteredMedia[currentIndex].title"
          />
          <iframe 
            v-else 
            class="aspect-video w-[300px] sm:w-[500px] md:w-[750px] rounded-xl border-none shadow-md" 
            :src="filteredGalleryItemSrc" 
            frameborder="0" 
            allowfullscreen
          ></iframe>
        </div>
        
        <!-- العداد الترقيمي الأنيق بأسفل الصورة -->
        <p class="text-white/50 mt-6 font-bold tracking-widest text-sm uppercase">
          {{ currentIndex + 1 }} / {{ filteredMedia.length }}
        </p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import apiClient from '@/api/axios' 
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const activeFilter = ref('All')
const mediaItems = ref<any[]>([])
const loading = ref(true)

const isLightboxOpen = ref(false)
const currentIndex = ref(0)

const tabs = computed(() => [
  { key: 'All', label: locale.value === 'en' ? 'All' : 'الكل' },
  { key: 'Photos', label: locale.value === 'en' ? 'Photos' : 'الصور' },
  { key: 'Videos', label: locale.value === 'en' ? 'Videos' : 'الفيديوهات' }
])

// جلب تفاصيل الجاليري من الاندبوينت الجديد /galleries وتصفيتها برمجياً
const fetchMedia = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/galleries')
    const parsedItems: any[] = []

    const rawGalleries = response.data?.data || []
    rawGalleries.forEach((item: any) => {
      if (item.image) {
        parsedItems.push({ id: `${item.id}-img`, type: 'photo', src: item.image, title: item.title })
      }
      if (item.images && Array.isArray(item.images)) {
        item.images.forEach((subImg: string, subIdx: number) => {
          if (subImg !== item.image) {
            parsedItems.push({ id: `${item.id}-sub-${subIdx}`, type: 'photo', src: subImg, title: item.title })
          }
        })
      }
      if (item.video_url) {
        parsedItems.push({ id: `${item.id}-vid`, type: 'video', src: item.video_url, title: item.title })
      }
    })

    mediaItems.value = parsedItems
  } catch (error) {
    console.error("Error fetching galleries:", error)
  } finally {
    loading.value = false
  }
}

const filteredMedia = computed(() => {
  if (activeFilter.value === 'All') return mediaItems.value
  const type = activeFilter.value === 'Photos' ? 'photo' : 'video'
  return mediaItems.value.filter(item => item.type === type)
})

const filteredGalleryItemSrc = computed(() => {
  if (!filteredMedia.value.length || !filteredMedia.value[currentIndex.value]) return ''
  return filteredMedia.value[currentIndex.value].src
})

const openLightbox = (index: number) => {
  currentIndex.value = index
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden' 
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  document.body.style.overflow = 'auto' 
}

const nextItem = () => {
  if (!filteredMedia.value.length) return
  currentIndex.value = (currentIndex.value + 1) % filteredMedia.value.length
}

const prevItem = () => {
  if (!filteredMedia.value.length) return
  currentIndex.value = (currentIndex.value - 1 + filteredMedia.value.length) % filteredMedia.value.length
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!isLightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextItem()
  if (e.key === 'ArrowLeft') prevItem()
}

onMounted(() => {
  fetchMedia()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto' 
})

watch(activeFilter, () => {
  currentIndex.value = 0
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
.grid > div { animation: fadeIn 0.6s ease-out backwards; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>