<template>
  <section class="py-16 md:py-24 bg-[#F8FAFC]" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="container mx-auto px-6 md:px-12 lg:px-20">
      
      <div class="text-center mb-12 md:mb-16 space-y-4">
        <h2 class="text-3xl md:text-5xl font-serif text-[#1e293b] tracking-tight">
          {{ locale === 'en' ? 'Our Services' : 'خدماتنا' }}
        </h2>
        <p class="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto">
          {{ locale === 'en' ? 'Comprehensive services for farmers and partners.' : 'خدمات شاملة للمزارعين والشركاء.' }}
        </p>
      </div>

      <div v-if="loading" class="text-center py-20 text-teal-600 font-bold animate-pulse">
        {{ locale === 'en' ? 'Loading Services...' : 'جاري تحميل الخدمات...' }}
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16">
        <div 
          v-for="(service, index) in services" 
          :key="index"
          class="group bg-white rounded-[1rem] overflow-hidden shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 flex flex-col border border-slate-50"
        >
          <div class="relative h-60 md:h-72 w-full overflow-hidden">
            <img 
              :src="service.image || 'https://via.placeholder.com/800x600?text=Premium+Service'" 
              :alt="service.name_i18n?.[locale] || service.name" 
              class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
          </div>

          <div class="p-6 md:p-10 space-y-4 md:space-y-6 flex flex-col flex-grow">
            <h3 class="text-xl md:text-2xl font-serif text-[#1e293b] leading-tight">
              {{ service.name_i18n?.[locale] || service.name }} 
            </h3>
            
            <p class="text-slate-500 text-sm md:text-[16px] leading-relaxed flex-grow font-light">
              {{ service.description_i18n?.[locale] || service.description }}
            </p>
            
            <div class="pt-2">
              <button @click="openModal(service.id)" class="bg-[#17C2BD] text-white px-6 py-2.5 rounded-full text-[13px] font-extrabold transition-all shadow-lg active:scale-95">
                {{ locale === 'en' ? 'Request Service' : 'طلب الخدمة' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <RouterLink to="/services"
          class="bg-[#1e293b] hover:bg-slate-800 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 transition-all shadow-xl group/btn"
        >
          {{ locale === 'en' ? 'View All Services' : 'عرض جميع الخدمات' }}
          <font-awesome-icon :icon="locale === 'en' ? 'fa-solid fa-arrow-right' : 'fa-solid fa-arrow-left'" class="text-sm transition-transform group-hover/btn:translate-x-1" />
        </RouterLink>
      </div>

      <RequestServiceModal 
        :isOpen="isModalOpen" 
        :serviceId="selectedServiceId"
        @close="isModalOpen = false" 
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/api/axios' 
import RequestServiceModal from './RequestServiceModal.vue'  

const { locale } = useI18n()
const isModalOpen = ref(false)
const selectedServiceId = ref(null)
const services = ref([]) 
const loading = ref(true)

const openModal = (id) => {
  selectedServiceId.value = id
  isModalOpen.value = true
}

const fetchServices = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/services')
    services.value = response.data?.data || []
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