<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import apiClient from '@/api/axios' 
import { useI18n } from 'vue-i18n' // 1. استيراد المكتبة

const { locale } = useI18n() // 2. استخراج اللغة الحالية
const activeFilter = ref('All')
const mediaItems = ref<any[]>([])
const loading = ref(true)

// 3. تعريف التبويبات بناءً على اللغة
const tabs = computed(() => [
  { key: 'All', label: locale.value === 'en' ? 'All' : 'الكل' },
  { key: 'Photos', label: locale.value === 'en' ? 'Photos' : 'الصور' },
  { key: 'Videos', label: locale.value === 'en' ? 'Videos' : 'الفيديوهات' }
])

const fetchMedia = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/projects')
    
    mediaItems.value = response.data.data.map((item: any) => ({
      id: item.id,
      type: item.video_url ? 'video' : 'photo', 
      src: item.video_url || item.image,
      title: item.title
    }))
  } catch (error) {
    console.error("Error fetching media gallery:", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMedia()
})

const filteredMedia = computed(() => {
  if (activeFilter.value === 'All') return mediaItems.value
  const type = activeFilter.value === 'Photos' ? 'photo' : 'video'
  return mediaItems.value.filter(item => item.type === type)
})
</script>

<template>
  <div class="min-h-screen bg-white pb-24 font-sans" :class="locale === 'ar' ? 'text-right' : 'text-left'">
    
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

    <main class="container mx-auto px-6 md:px-12 lg:px-20">
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="aspect-[4/3] bg-gray-100 animate-pulse rounded-[1rem]"></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div 
          v-for="item in filteredMedia" 
          :key="item.id"
          class="group relative aspect-[4/3] rounded-[1rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-50 cursor-pointer"
        >
          <img 
            v-if="item.type === 'photo'" 
            :src="item.src" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />

          <div v-else class="w-full h-full bg-black">
            <iframe 
              class="w-full h-full" 
              :src="item.src" 
              frameborder="0" 
              allowfullscreen
            ></iframe>
          </div>

          <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </div>
      </div>

      <div v-if="!loading && filteredMedia.length === 0" class="text-center py-20 text-slate-400">
          {{ locale === 'en' ? 'No media items found in this category.' : 'لا توجد عناصر وسائط في هذا القسم حالياً.' }}
      </div>
    </main>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
.grid > div { animation: fadeIn 0.6s ease-out backwards; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>