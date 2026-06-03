<template>
  <!-- شاشة تحميل تفاصيل المشروع متجاوبة -->
  <div v-if="loading" class="min-h-screen flex items-center justify-center bg-white">
    <div class="animate-pulse flex flex-col items-center gap-3">
      <div class="w-10 h-10 border-4 border-t-[#20CAC4] border-slate-200 rounded-full animate-spin"></div>
      <span class="text-slate-400 text-sm">{{ locale === 'en' ? 'Loading Project Details...' : 'جاري تحميل تفاصيل المشروع...' }}</span>
    </div>
  </div>

<div v-else-if="project" class="min-h-screen bg-white font-sans" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    
  <div class="border-b border-slate-100 py-6 mt-20 px-6 md:px-12 lg:px-20 shrink-0">
  <div class="container mx-auto flex justify-end">
    <RouterLink 
      to="/services" 
      class="text-slate-500 hover:text-[#20CAC4] text-sm font-bold flex items-center gap-2 transition-all group"
    >
      
      <span>{{ locale === 'en' ? 'Back to Services' : 'العودة للخدمات' }}</span>
      <font-awesome-icon 
        :icon="locale === 'en' ? 'fa-solid fa-arrow-right' : 'fa-solid fa-arrow-left'" 
        class="text-xs transition-transform duration-200"
        :class="locale === 'en' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'"
      />
    </RouterLink>
  </div>
</div>


    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        <div class="lg:col-span-7 space-y-12">
          <div class="space-y-6" :class="locale === 'ar' ? 'text-right' : 'text-left'">
            <h1 class="text-3xl md:text-5xl lg:text-6xl font-serif text-[#1e293b] leading-tight font-bold">
              {{ projectTitle }}
            </h1>
            <div class="w-16 h-1 bg-[#20CAC4] rounded-full"></div>
          </div>
          <div class="space-y-8" :class="locale === 'ar' ? 'text-right' : 'text-left'">
            <p v-for="(paragraph, index) in projectParagraphs" :key="index" class="text-base md:text-lg text-slate-600 leading-relaxed font-light">
              {{ paragraph }}
            </p>
          </div>
        </div>

        <div class="lg:col-span-5 space-y-5 lg:sticky lg:top-32 w-full">
          <div class="rounded-3xl overflow-hidden aspect-[4/3] shadow-md bg-slate-50">
            <img :src="project.image || 'https://via.placeholder.com/800x600?text=Premium+Project'" class="w-full h-full object-cover" :alt="projectTitle" />
          </div>
          
          <div class="bg-[#F5F7FA] rounded-3xl p-8 md:p-10 space-y-8 shadow-sm border border-slate-50">
            <h3 class="text-xl font-bold text-[#1e293b]">
               {{ locale === 'en' ? 'Project Details' : 'تفاصيل المشروع' }}
            </h3>
            
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-white text-[#20CAC4] rounded-xl flex items-center justify-center text-lg shadow-sm flex-shrink-0">
                  <font-awesome-icon icon="fa-solid fa-calendar" />
                </div>
                <div>
                  <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{{ locale === 'en' ? 'Duration' : 'المدة' }}</p>
                  <p class="text-base font-bold text-[#1e293b]">{{ project.duration || '2022 – 2024' }}</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-white text-[#20CAC4] rounded-xl flex items-center justify-center text-lg shadow-sm flex-shrink-0">
                  <font-awesome-icon icon="fa-solid fa-location-dot" />
                </div>
                <div>
                  <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{{ locale === 'en' ? 'Location' : 'الموقع' }}</p>
                  <p class="text-base font-bold text-[#1e293b]">
                    {{ project.location_i18n?.[locale] || project.location || (locale === 'en' ? 'Jericho, Palestine' : 'أريحا، فلسطين') }}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-white text-[#20CAC4] rounded-xl flex items-center justify-center text-lg shadow-sm flex-shrink-0">
                  <font-awesome-icon icon="fa-solid fa-users" />
                </div>
                <div>
                  <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{{ locale === 'en' ? 'Beneficiaries' : 'المستفيدون' }}</p>
                  <p class="text-base font-bold text-[#1e293b]">
                    {{ project.beneficiaries_i18n?.[locale] || project.beneficiaries || (locale === 'en' ? 'All cooperative members' : 'جميع أعضاء الجمعية') }}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- ميديا جاليري مربوطة بالـ API بالكامل بخلفية F5F7FA فخمة -->
    <section v-if="galleryItems.length > 0" class="bg-[#F5F7FA] py-24 border-t border-slate-100 mt-20 text-center">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl md:text-5xl font-bold text-[#1e293b] font-serif mb-12">
          {{ locale === 'en' ? 'Media Gallery' : 'معرض الوسائط' }}
        </h2>
        
        <!-- تبويبات التصفية بين الصور والفيديوهات -->
        <div class="flex justify-center gap-4 mb-12">
          <button v-for="tab in tabs" :key="tab.key" @click="activeFilter = tab.key"
            :class="[activeFilter === tab.key ? 'bg-[#20CAC4] text-white shadow-md' : 'bg-white text-slate-500 hover:bg-[#F5F7FA] border border-slate-200/60']"
            class="px-10 py-2.5 rounded-full font-bold transition-all shadow-sm text-sm">
            {{ tab.label }}
          </button>
        </div>

        <!-- عرض العناصر في حال وجود وسائط بداخل الفلتر المختار -->
        <div v-if="filteredGallery.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(item, index) in filteredGallery" :key="index"
            @click="openLightbox(index)"
            class="group relative h-64 rounded-[2rem] overflow-hidden shadow-md cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 bg-white border border-slate-100/50"
          >
            <img v-if="item.type === 'photo'" :src="item.src" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div v-else class="w-full h-full bg-slate-900 flex items-center justify-center">
               <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">▶</div>
            </div>
            <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>

        <!-- حاوية الحالات الفارغة (Empty States) مصممة ومترجمة كالفجما تماماً -->
        <div v-else class="py-16 px-6 bg-white rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-4 shadow-sm animate-in fade-in duration-300">
          <div class="text-[#20CAC4] text-5xl mb-1">
            <font-awesome-icon v-if="activeFilter === 'Photos'" icon="fa-solid fa-image" />
            <font-awesome-icon v-else-if="activeFilter === 'Videos'" icon="fa-solid fa-video" />
            <font-awesome-icon v-else icon="fa-solid fa-folder-open" />
          </div>
          <div class="space-y-1">
            <h3 class="text-xl font-bold text-slate-700">
              {{ getEmptyTitle() }}
            </h3>
            <p class="text-slate-400 text-sm leading-relaxed max-w-md">
              {{ getEmptySubtitle() }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox مدمج لمعاينة الصور والفيديوهات بكامل الشاشة -->
    <div v-if="isLightboxOpen" class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-in fade-in duration-300">
      <button @click="closeLightbox" class="absolute top-8 right-8 text-white/70 hover:text-white text-4xl p-4 transition-colors z-[110]">✕</button>
      <button @click="prevItem" class="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-[110]">‹</button>
      <button @click="nextItem" class="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-[110]">›</button>
      <div class="max-w-5xl max-h-[85vh] w-full px-6 flex flex-col items-center">
        <div class="w-full h-full rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
          <img v-if="filteredGallery[currentIndex].type === 'photo'" :src="filteredGallery[currentIndex].src" class="max-w-full max-h-[75vh] object-contain animate-in zoom-in-95" />
          <iframe v-else class="aspect-video w-full" :src="filteredGallery[currentIndex].src" frameborder="0" allowfullscreen></iframe>
        </div>
        <p class="text-white/50 mt-8 font-bold tracking-widest text-sm uppercase">
          {{ currentIndex + 1 }} / {{ filteredGallery.length }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import apiClient from '@/api/axios' 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const route = useRoute()
const router = useRouter()
const loading = ref(true)
const project = ref<any>(null)

const fetchProjectDetails = async () => {
  try {
    loading.value = true
    const id = route.params.id
    const response = await apiClient.get(`/projects/${id}`)
    project.value = response.data?.data || null
  } catch (error) {
    console.error("Error fetching project details:", error)
  } finally {
    loading.value = false
  }
}

// دالة مدمجة تقرأ اسم/عنوان المشروع بأمان من جميع المفاتيح المحتملة بالسيرفر
const projectTitle = computed(() => {
  if (!project.value) return ''
  return project.value.title_i18n?.[locale.value] || 
         project.value.title || 
         project.value.name_i18n?.[locale.value] || 
         project.value.name || '';
})

// دالتا استخراج العناوين والترجمات المخصصة للحالات الفارغة بناءً على التبويب المفتوح
const getEmptyTitle = () => {
  if (activeFilter.value === 'Photos') {
    return locale.value === 'en' ? 'No photos available' : 'لا توجد صور حالياً'
  }
  if (activeFilter.value === 'Videos') {
    return locale.value === 'en' ? 'No videos available' : 'لا توجد فيديوهات حالياً'
  }
  return locale.value === 'en' ? 'No media available' : 'لا توجد وسائط حالياً'
}

const getEmptySubtitle = () => {
  if (activeFilter.value === 'Photos') {
    return locale.value === 'en' 
      ? 'Photos will appear here when available.' 
      : 'سيتم عرض الصور هنا عند توفرها.'
  }
  if (activeFilter.value === 'Videos') {
    return locale.value === 'en' 
      ? 'Videos will appear here when available.' 
      : 'سيتم عرض الفيديوهات هنا عند توفرها.'
  }
  return locale.value === 'en' 
    ? 'Photos and videos will appear here when available.' 
    : 'سيتم عرض الصور والفيديوهات هنا عند توفرها.'
}

// دالة تفاعلية ذكية تقرأ الوصف والفقرات من كافة المفاتيح المحتملة بالسيرفر وتفصل الأسطر بدقة
const projectParagraphs = computed(() => {
  const content = project.value?.description_i18n?.[locale.value] || 
                  project.value?.description || 
                  project.value?.content_i18n?.[locale.value] || 
                  project.value?.content || '';
  if (!content) return []
  return content.split('\n').filter((p: string) => p.trim() !== '')
})

const activeFilter = ref('All')

const tabs = computed(() => [
  { key: 'All', label: locale.value === 'en' ? 'All' : 'الكل' },
  { key: 'Photos', label: locale.value === 'en' ? 'Photos' : 'الصور' },
  { key: 'Videos', label: locale.value === 'en' ? 'Videos' : 'الفيديوهات' }
])

// مصفوفة الميديا المربوطة بالـ API
const galleryItems = computed(() => {
  if (!project.value) return []
  const items: any[] = []
  
  if (project.value.image) {
    items.push({ type: 'photo', src: project.value.image, title: projectTitle.value })
  }
  
  if (project.value.images && Array.isArray(project.value.images)) {
    project.value.images.forEach((img: string) => {
      if (img !== project.value.image) {
        items.push({ type: 'photo', src: img, title: projectTitle.value })
      }
    })
  }

  if (project.value.video_url) {
    items.push({ type: 'video', src: project.value.video_url, title: projectTitle.value })
  }

  return items
})

const filteredGallery = computed(() => {
  if (activeFilter.value === 'All') return galleryItems.value
  const type = activeFilter.value === 'Photos' ? 'photo' : 'video'
  return galleryItems.value.filter(item => item.type === type)
})

const isLightboxOpen = ref(false)
const currentIndex = ref(0)

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
  currentIndex.value = (currentIndex.value + 1) % filteredGallery.value.length
}

const prevItem = () => {
  currentIndex.value = (currentIndex.value - 1 + filteredGallery.value.length) % filteredGallery.value.length
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!isLightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextItem()
  if (e.key === 'ArrowLeft') prevItem()
}

onMounted(() => {
  fetchProjectDetails()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto'
})

watch(() => route.params.id, fetchProjectDetails)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
</style>