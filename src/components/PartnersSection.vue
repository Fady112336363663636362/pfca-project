<template>
  <section class="py-16 md:py-24 bg-white" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="container mx-auto text-center overflow-hidden">
      
      <h2 class="text-3xl md:text-4xl font-serif text-[#1e293b] mb-12 tracking-tight">
        {{ locale === 'en' ? 'Success Partners' : 'شركاء النجاح' }}
      </h2>

      <!-- مؤشر التحميل متناسق مع الحجم المصغر الجديد -->
      <div v-if="loading" class="flex gap-4 justify-center overflow-hidden py-4">
        <div v-for="i in 8" :key="i" class="w-28 sm:w-32 h-28 sm:h-32 bg-gray-200 animate-pulse rounded-2xl shrink-0"></div>
      </div>

      <!-- شريط الشركاء المتحرك لانهائياً مع ميزة التوقف عند الهوفر والاتجاه الذكي -->
      <div v-else class="relative w-full overflow-hidden py-4">
        <div class="animate-marquee-partners">
          <!-- تكرار العناصر مرتين لضمان انسيابية واستمرار الحركة دون انقطاع -->
          <div v-for="n in 2" :key="n" class="flex gap-4 shrink-0">
            <RouterLink 
              v-for="partner in partners" 
              :key="partner.id"
              :to="'/partner/' + partner.id"
              class="group bg-[#F5F7FA] rounded-2xl py-3 px-3 flex flex-col items-center justify-center border border-transparent transition-all duration-300 hover:bg-[#F0FDFA] hover:border-[#26d0ce] w-28 sm:w-32 h-28 sm:h-32 shrink-0 shadow-sm"
              :class="{'bg-[#F0FDFA] border-[#26d0ce]': partner.is_active}" 
            >
            
              <!-- الشعار الدائري المصغر -->
              <div 
                class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-colors bg-slate-200 text-slate-600 group-hover:bg-[#26d0ce]/20 group-hover:text-[#26d0ce] shrink-0 overflow-hidden"
              >
                <img 
                  v-if="partner.logo" 
                  :src="partner.logo" 
                  alt="Partner Logo" 
                  class="w-full h-full object-contain p-1"
                /> 
                <span v-else class="text-xs">{{ getInitials(partner.name_i18n?.[locale] || partner.name) }}</span>
              </div>

              <!-- اسم الشريك المصغر والمحمي من الخروج عن الإطار -->
              <span class="text-[11px] sm:text-xs font-bold text-center transition-colors group-hover:text-[#26d0ce] mt-2.5 break-words w-full px-1 line-clamp-1 leading-tight">
                {{ partner.name_i18n?.[locale] || partner.name }}
              </span>
               
            </RouterLink>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '@/api/axios' 
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const partners = ref([])
const loading = ref(true)

const getInitials = (name) => {
  if (!name) return ''
  const parts = name.split(' ')
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name[0].toUpperCase()
}

const fetchPartners = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/brands')
    partners.value = response.data?.data || []
  } catch (error) {
    console.error("Error fetching partners:", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPartners()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif {
  font-family: 'Playfair Display', serif;
}

/* حركة الماركي اللانهائي للشركاء (يسار في الإنجليزية) */
@keyframes marqueeScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* حركة الماركي اللانهائي للشركاء (يمين في العربية) */
@keyframes marqueeScrollRTL {
  0% { transform: translateX(0); }
  100% { transform: translateX(50%); }
}

.animate-marquee-partners {
  display: flex;
  gap: 16px;
  animation: marqueeScroll 30s linear infinite;
  width: max-content;
}

/* قلب اتجاه الحركة تلقائياً مع اتجاه العربية */
[dir="rtl"] .animate-marquee-partners {
  animation: marqueeScrollRTL 30s linear infinite;
}

/* إيقاف الحركة فوراً عند تمرير الماوس (Hover) */
.animate-marquee-partners:hover {
  animation-play-state: paused !important;
}
</style>