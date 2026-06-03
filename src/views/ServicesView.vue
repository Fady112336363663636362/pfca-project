<template>
  <div class="min-h-screen bg-[#F8FAFC] pb-24 font-sans" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    
    <header class="bg-[#293043] pt-32 pb-16 md:pt-40 md:pb-24 text-white text-center px-6">
      <div class="container mx-auto space-y-6">
        <h1 class="text-3xl md:text-5xl font-bold font-serif tracking-tight">
          {{ locale === 'en' ? 'Our Services' : 'خدماتنا' }}
        </h1>
        <p class="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          {{ locale === 'en' 
            ? 'Discover our comprehensive range of services designed to support and empower the palm farming community in the Jordan Valley.' 
            : 'اكتشف مجموعتنا الشاملة من الخدمات المصممة لدعم وتمكين مجتمع مزارعي النخيل في وادي الأردن.' 
          }}
        </p>
      </div>
    </header>

    <main class="container mx-auto px-6 md:px-12 lg:px-16 py-12 relative z-10">
      
      <!-- هيكل عظمي مؤقت متناسق التجاوب -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        <div v-for="i in 6" :key="i" class="h-96 bg-gray-200 animate-pulse rounded-[1rem]"></div>
      </div>

      <!-- قائمة عرض الخدمات الديناميكية المحدثة بالكامل -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        <div 
          v-for="(service, index) in allServices" 
          :key="index"
          class="group bg-white rounded-[1rem] overflow-hidden shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col border border-slate-100"
        >
          <div class="relative h-60 md:h-72 w-full overflow-hidden">
            <img 
              :src="service.image || 'https://via.placeholder.com/800x600?text=Premium+Service'" 
              :alt="service.name_i18n?.[locale] || service.name" 
              class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
            />
          </div>

          <div class="p-6 md:p-8 space-y-4 flex flex-col flex-grow">
            <h3 class="text-xl font-bold text-[#1e293b] leading-tight font-serif ">
              {{ service.name_i18n?.[locale] || service.name }} 
            </h3>
            
            <p class="text-slate-600 text-[15px] leading-relaxed flex-grow font-light font-sans line-clamp-3">
              {{ service.description_i18n?.[locale] || service.description }}
            </p>
            
            <div class="pt-4">
              <router-link 
                :to="`/services/${service.id}`"
                class="inline-flex items-center gap-2 text-[#20CAC4] hover:text-[#1db1ab] font-bold text-[15px] transition-all group/link"
              >
                <span>{{ locale === 'en' ? 'Details' : 'التفاصيل' }}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-4 w-4 transition-transform duration-300" 
                  :class="locale === 'en' ? 'group-hover/link:translate-x-1' : 'group-hover/link:-translate-x-1 rotate-180'"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </router-link>
            </div>
          </div>

        </div>
      </div>

      <!-- حالة قاعدة البيانات فارغة -->
      <div v-if="!loading && allServices.length === 0" class="text-center py-20 text-slate-400">
        {{ locale === 'en' ? 'No services available at the moment.' : 'لا توجد خدمات متاح حالياً.' }}
      </div>
    </main>

    <!-- المودال الخاص بطلب الخدمة المحددة -->
    <RequestServiceModal 
      :isOpen="isModalOpen" 
      :serviceId="selectedServiceId"
      @close="isModalOpen = false" 
    />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiClient from '@/api/axios' 
import RequestServiceModal from '@/components/RequestServiceModal.vue'
import { useI18n } from 'vue-i18n' 

const { locale } = useI18n() 
const isModalOpen = ref(false)
const selectedServiceId = ref<number | null>(null)
const allServices = ref<any[]>([]) 
const loading = ref(true)

// دالة لحفظ الـ ID وفتح المودال لإرسال الطلب بشكل آمن ومكتمل للسيرفر
const openModal = (id: number) => {
  selectedServiceId.value = id
  isModalOpen.value = true
}

const fetchServices = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/services')
    allServices.value = response.data?.data || []
  } catch (error) {
    console.error("Error fetching services:", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchServices()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
.grid > div { height: 100%; }
</style>