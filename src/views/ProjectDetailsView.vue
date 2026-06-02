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
    const response = await apiClient.get(`/topics/${id}`)
    project.value = response.data.data
  } catch (error) {
    console.error("Error fetching project details:", error)
  } finally {
    loading.value = false
  }
}

const projectParagraphs = computed(() => {
  const content = project.value?.content_i18n?.[locale.value] || project.value?.content || ''
  if (!content) return []
  return content.split('\n').filter((p: string) => p.trim() !== '')
})

const activeFilter = ref('All')

const tabs = computed(() => [
  { key: 'All', label: locale.value === 'en' ? 'All' : 'الكل' },
  { key: 'Photos', label: locale.value === 'en' ? 'Photos' : 'الصور' },
  { key: 'Videos', label: locale.value === 'en' ? 'Videos' : 'الفيديوهات' }
])

// إصلاح: ربط الميديا بالـ API (نأخذ الصورة الأساسية كأول عنصر في الجاليري)
const galleryItems = computed(() => {
  if (!project.value) return []
  const items = []
  
  // إضافة الصورة الرئيسية من الـ API
  if (project.value.image) {
    items.push({ type: 'photo', src: project.value.image, title: project.value.title })
  }
  
  // إذا كان هناك مصفوفة صور إضافية من السيرفر
  if (project.value.images && Array.isArray(project.value.images)) {
    project.value.images.forEach((img: string) => {
      if (img !== project.value.image) { // تجنب التكرار
        items.push({ type: 'photo', src: img, title: project.value.title })
      }
    })
  }

  // إضافة الفيديو من الـ API لو وجد
  if (project.value.video_url) {
    items.push({ type: 'video', src: project.value.video_url, title: project.value.title })
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
})

watch(() => route.params.id, fetchProjectDetails)
</script>

<template>
  <div v-if="loading" class="min-h-screen flex items-center justify-center bg-white">
    <div class="animate-pulse text-2xl font-bold text-[#26d0ce]">
      {{ locale === 'en' ? 'Loading Project Details...' : 'جاري تحميل تفاصيل المشروع...' }}
    </div>
  </div>

  <div v-else-if="project" class="min-h-screen bg-white pb-20 font-sans" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    
    <div class="container mx-auto px-6 pt-32 pb-5">
      <RouterLink 
        to="/our-projects" 
        class="inline-flex items-center gap-2 text-slate-500 hover:text-[#26d0ce] transition-colors font-bold group"
      >
        <font-awesome-icon :icon="locale === 'en' ? 'fa-solid fa-arrow-left' : 'fa-solid fa-arrow-right'" />
        <span>{{ locale === 'en' ? 'Back to Projects' : 'العودة للمشاريع' }}</span>
      </RouterLink>
    </div>

    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        <div class="lg:col-span-2 space-y-12">
          <div class="space-y-6" :class="locale === 'ar' ? 'text-right' : 'text-left'">
            <h1 class="text-4xl md:text-7xl font-serif text-[#1e293b] leading-tight">
              {{ project.title_i18n?.[locale] || project.title }}
            </h1>
            <div class="w-24 h-2 bg-[#26d0ce] rounded-full"></div>
          </div>
          <div class="space-y-8" :class="locale === 'ar' ? 'text-right' : 'text-left'">
            <p v-for="(paragraph, index) in projectParagraphs" :key="index" class="text-xl text-slate-600 leading-relaxed font-light">
              {{ paragraph }}
            </p>
          </div>
        </div>

        <div class="space-y-5 sticky top-32">
          <div class="rounded-[3rem] overflow-hidden aspect-[4/3] shadow-xl">
            <img :src="project.image" class="w-full h-full object-cover" :alt="project.title" />
          </div>
          
          <div class="bg-[#F5F7FA] rounded-[3rem] p-10 space-y-10 shadow-sm border border-slate-50">
            <h3 class="text-2xl font-bold text-[#1e293b]" :class="locale === 'ar' ? 'text-right' : 'text-left'">
               {{ locale === 'en' ? 'Project Details' : 'تفاصيل المشروع' }}
            </h3>
            
            <div class="space-y-8">
              <!-- إصلاح المربع الصغير والايقونة -->
              <div class="flex items-start gap-5">
                <div class="w-12 h-12 bg-white text-[#26d0ce] rounded-2xl flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                  <font-awesome-icon icon="fa-solid fa-circle-check" />
                </div>
                <div :class="locale === 'ar' ? 'text-right' : 'text-left'">
                  <p class="text-sm font-bold text-slate-400 uppercase tracking-wider">{{ locale === 'en' ? 'Status' : 'الحالة' }}</p>
                  <p class="text-xl font-bold text-[#1e293b]">{{ project.status || (locale === 'en' ? 'Published' : 'منشور') }}</p>
                </div>
              </div>

              <div class="flex items-start gap-5">
                <div class="w-12 h-12 bg-white text-[#26d0ce] rounded-2xl flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                  <font-awesome-icon icon="fa-solid fa-location-dot" />
                </div>
                <div :class="locale === 'ar' ? 'text-right' : 'text-left'">
                  <p class="text-sm font-bold text-slate-400 uppercase tracking-wider">{{ locale === 'en' ? 'Location' : 'الموقع' }}</p>
                  <p class="text-xl font-bold text-[#1e293b]">
                    {{ project.location_i18n?.[locale] || (locale === 'en' ? 'Jericho & Jordan Valley' : 'أريحا والأغوار') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ميديا جاليري مربوطة بالـ API -->
    <section v-if="galleryItems.length > 0" class="container mx-auto px-6 py-24 border-t border-slate-100 mt-20 text-center">
      <h2 class="text-4xl md:text-5xl font-bold text-[#1e293b] font-serif mb-12">
        {{ locale === 'en' ? 'Media Gallery' : 'معرض الوسائط' }}
      </h2>
      
      <div class="flex justify-center gap-4 mb-12">
        <button v-for="tab in tabs" :key="tab.key" @click="activeFilter = tab.key"
          :class="[activeFilter === tab.key ? 'bg-[#26d0ce] text-white' : 'bg-[#F5F7FA] text-slate-500 hover:bg-white border border-transparent hover:border-slate-200']"
          class="px-10 py-2.5 rounded-full font-bold transition-all shadow-sm text-sm">
          {{ tab.label }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(item, index) in filteredGallery" :key="index"
          @click="openLightbox(index)"
          class="group relative h-64 rounded-[2rem] overflow-hidden shadow-md cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
        >
          <img v-if="item.type === 'photo'" :src="item.src" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div v-else class="w-full h-full bg-slate-900 flex items-center justify-center">
             <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">▶</div>
          </div>
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>
    </section>

    <!-- Lightbox كما هو -->
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