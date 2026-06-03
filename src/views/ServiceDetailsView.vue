<template>
  <div class="min-h-screen bg-[#F8FAFC] pb-24 font-sans" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    
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


    <div v-if="loading" class="min-h-[500px] flex items-center justify-center">
      <div class="animate-pulse flex flex-col items-center gap-3">
        <div class="w-10 h-10 border-4 border-t-[#20CAC4] border-slate-200 rounded-full animate-spin"></div>
        <span class="text-slate-400 text-sm">{{ locale === 'en' ? 'Loading Service Details...' : 'جاري تحميل التفاصيل...' }}</span>
      </div>
    </div>

    <main v-else-if="activeService" class="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        <div class="lg:col-span-5 space-y-6 w-full">
          <div class="rounded-3xl overflow-hidden shadow-md aspect-[4/3] bg-slate-100">
            <img 
              :src="activeService.image || 'https://via.placeholder.com/800x600?text=Premium+Service'" 
              :alt="activeService.name_i18n?.[locale] || activeService.name" 
              class="w-full h-full object-cover"
            />
          </div>

          <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
            <h4 class="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">
              {{ locale === 'en' ? 'Service Details' : 'تفاصيل الخدمة' }}
            </h4>
            
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="p-2.5 bg-slate-50 text-[#20CAC4] rounded-xl shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <div>
                  <span class="text-xs text-slate-400 block">{{ locale === 'en' ? 'Service Type' : 'نوع الخدمة' }}</span>
                  <span class="text-sm font-bold text-slate-700">{{ locale === 'en' ? 'Agricultural Consultation' : 'استشارات ودعم فني' }}</span>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="p-2.5 bg-slate-50 text-[#20CAC4] rounded-xl shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <span class="text-xs text-slate-400 block">{{ locale === 'en' ? 'Coverage Area' : 'نطاق التغطية' }}</span>
                  <span class="text-sm font-bold text-slate-700">{{ locale === 'en' ? 'Palestine & Jordan Valley' : 'أريحا والأغوار، فلسطين' }}</span>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="p-2.5 bg-slate-50 text-[#20CAC4] rounded-xl shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <div>
                  <span class="text-xs text-slate-400 block">{{ locale === 'en' ? 'Beneficiaries' : 'المستفيدون' }}</span>
                  <span class="text-sm font-bold text-slate-700">{{ locale === 'en' ? 'Cooperative Members & Farmers' : 'مزارعي النخيل وأعضاء الجمعية' }}</span>
                </div>
              </div>
            </div>

            <div class="pt-2">
              <button 
                @click="isModalOpen = true"
                class="w-full bg-[#20CAC4] hover:bg-[#1db1ab] text-white py-4 rounded-full text-base font-bold transition-all shadow-lg shadow-[#20CAC4]/20 active:scale-95"
              >
                {{ locale === 'en' ? 'Request This Service' : 'طلب هذه الخدمة' }}
              </button>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7 space-y-6">
          <div class="space-y-4">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              {{ activeService.name_i18n?.[locale] || activeService.name }}
            </h2>
            <div class="w-16 h-1 bg-[#20CAC4] rounded-full"></div>
          </div>

          <div class="text-slate-600 text-[16px] md:text-lg leading-relaxed space-y-6 font-light">
            <p>{{ activeService.description_i18n?.[locale] || activeService.description }}</p>
            <p>{{ locale === 'en' ? 'We work strictly with specialized consultants to provide international-standard agricultural advisory, enhancing palm fruit quality and packing processes.' : 'نعمل بتعاون وثيق مع خبراء متخصصين لتقديم المشورة الزراعية بمعايير عالمية، مما يضمن جودة تمور النخيل وتحسين عمليات الفرز والتعبئة.' }}</p>
          </div>
        </div>

      </div>

      

    </main>

    <div v-else class="min-h-[500px] flex items-center justify-center text-slate-400 font-bold">
      {{ locale === 'en' ? 'Service not found.' : 'لم يتم العثور على هذه الخدمة.' }}
    </div>

    <RequestServiceModal 
      :isOpen="isModalOpen" 
      :serviceId="selectedServiceId"
      @close="isModalOpen = false" 
    />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import apiClient from '@/api/axios' 
import { useI18n } from 'vue-i18n'
import RequestServiceModal from '@/components/RequestServiceModal.vue'

const { locale } = useI18n()
const route = useRoute()

const services = ref<any[]>([])
const loading = ref(true)
const isModalOpen = ref(false)

const activeService = computed(() => {
  const serviceId = String(route.params.id)
  return services.value.find(s => String(s.id) === serviceId) || null
})

const otherServices = computed(() => {
  const serviceId = String(route.params.id)
  return services.value
    .filter(s => String(s.id) !== serviceId)
    .slice(0, 3)
})

const selectedServiceId = computed(() => {
  return activeService.value?.id || null
})

const fetchServices = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/services')
    services.value = response.data?.data || []
  } catch (error) {
    console.error("Error loading services:", error)
  } finally {
    loading.value = false
  }
}

watch(() => route.params.id, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

onMounted(() => {
  fetchServices()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
.grid > div { height: 100%; }
</style>