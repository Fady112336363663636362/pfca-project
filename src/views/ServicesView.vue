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

      <!-- قائمة عرض الخدمات الديناميكية -->
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
            
            <p class="text-slate-600 text-[15px] leading-relaxed flex-grow font-light font-sans">
              {{ service.description_i18n?.[locale] || service.description }}
            </p>
            
            <div class="pt-4">
              <!-- تمرير الـ id الخاص بالخدمة المحددة ديناميكياً للـ Modal -->
              <button 
                @click="openModal(service.id)"
                class="bg-[#20CAC4] hover:bg-[#1db1ab] text-white px-8 py-3 rounded-full text-[14px] font-bold transition-all shadow-lg shadow-[#20CAC4]/20 active:scale-95"
              >
                {{ locale === 'en' ? 'Request Service' : 'طلب الخدمة' }}
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- حالة قاعدة البيانات فارغة -->
      <div v-if="!loading && allServices.length === 0" class="text-center py-20 text-slate-400">
        {{ locale === 'en' ? 'No services available at the moment.' : 'لا توجد خدمات متاحة حالياً.' }}
      </div>
    </main>

    <!-- ربط الـ Modal مع تمرير الـ Service ID المختار -->
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

// دالة لفتح المودال وحفظ معرف الخدمة المحدد
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