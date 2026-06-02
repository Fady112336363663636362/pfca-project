<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import apiClient from '@/api/axios'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n() 

const settings = ref<any[]>([])
const loading = ref(true)

// 1. تحديث مصفوفة المتطلبات لتشمل اللغتين
const requirements = ref([
  {
    title: { en: 'Valid Trade License', ar: 'رخصة تجارية سارية' },
    desc: { en: 'Active commercial registration and import license.', ar: 'سجل تجاري نشط ورخصة استيراد.' },
    icon: 'fa-solid fa-shield'
  },
  {
    title: { en: 'Distribution Network', ar: 'شبكة توزيع' },
    desc: { en: 'Established retail or wholesale distribution channels.', ar: 'قنوات توزيع قائمة للتجزئة أو الجملة.' },
    icon: 'fa-solid fa-chart-line'
  },
  {
    title: { en: 'Cold Storage Capability', ar: 'إمكانيات التخزين البارد' },
    desc: { en: 'Temperature-controlled storage and transport facilities.', ar: 'مرافق تخزين ونقل مبردة ومتحكم بها.' },
    icon: 'fa-solid fa-truck'
  },
  {
    title: { en: 'Food Safety Standards', ar: 'معايير سلامة الأغذية' },
    desc: { en: 'Compliance with local and international regulations.', ar: 'الامتثال للوائح سلامة الأغذية المحلية والدولية.' },
    icon: 'fa-solid fa-award'
  },
  {
    title: { en: 'Dedicated Sales Team', ar: 'فريق مبيعات مخصص' },
    desc: { en: 'A team focused on premium food product marketing.', ar: 'فريق متخصص في تسويق المنتجات الغذائية الفاخرة.' },
    icon: 'fa-solid fa-users'
  },
  {
    title: { en: 'Market Knowledge', ar: 'المعرفة بالسوق' },
    desc: { en: 'Deep understanding of local market dynamics.', ar: 'فهم عميق لديناميكيات السوق المحلية وتفضيلات المستهلك.' },
    icon: 'fa-solid fa-globe'
  }
])

const fetchSettings = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/settings')
    settings.value = response.data.data
  } catch (error) {
    console.error("Error fetching settings:", error)
  } finally {
    loading.value = false
  }
}

// 2. دالة ذكية لجلب القيمة بناءً على اللغة
const getValLocale = (baseKey: string) => {
  const key = `${baseKey}_${locale.value}`
  return settings.value.find(s => s.key === key)?.value || ''
}

onMounted(() => {
  fetchSettings()
})
</script>

<template>
 <div class="min-h-screen bg-[#F8FAFC] pb-24 font-sans" :class="locale === 'ar' ? 'text-right' : 'text-left'">
    
     <section class=" bg-[#293043] pt-20 mb-12 text-white">
      <div class="container mx-auto px-6 justify-center items-center flex flex-col lg:flex-row gap-12">
        <div class="max-w-2xl space-y-6 text-center">
          <h1 class="text-3xl md:text-5xl lg:text-6xl md:text-[45px] pt-10 font-bold font-serif leading-tight">
            <!-- استخدام getValLocale للعنوان -->
            {{ getValLocale('distributor_title') || (locale === 'en' ? 'Become a Distributor' : 'كن موزعاً لنا') }}
          </h1>
          <p class="text-xl pb-15 text-slate-300 font-light ">
            <!-- استخدام getValLocale للوصف -->
            {{ getValLocale('distributor_subtitle') || (locale === 'en' ? 'Be part of our success story.' : 'كن جزءاً من قصة نجاحنا.') }}
          </p>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-24 bg-white px-6 md:px-12 lg:px-20 ">
      <div class="container mx-auto">
        
        <div class="text-center mb-20 space-y-4">
          <h2 class="text-4xl md:text-4xl font-bold text-[#1e293b] font-serif ">
            {{ locale === 'en' ? 'Joining Requirements' : 'متطلبات الانضمام' }}
          </h2>
        </div>

        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
           <div v-for="i in 6" :key="i" class="h-64 bg-gray-50 animate-pulse rounded-[1rem]"></div>
        </div>

        <div v-else class="grid grid-cols-1 px-4 md:px-10 lg:px-0 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div 
            v-for="(req, index) in requirements" 
            :key="index"
            class="bg-[#F5F7FA] p-10 rounded-[1rem] flex flex-col items-start space-y-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
            :class="locale === 'ar' ? 'text-right' : 'text-left'"
          >
            <div class="w-14 h-14 bg-[#20CAC4] text-white rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-[#20CAC4]/20 transition-transform group-hover:scale-110">
              <font-awesome-icon :icon="req.icon" />
            </div>

            <div class="space-y-3">
              <h3 class="text-xl font-bold text-[#1e293b] font-serif">
                {{ req.title[locale] }}
              </h3>
              <p class="text-slate-500 text-[15px] leading-relaxed font-medium">
                {{ req.desc[locale] }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-20 text-center">
          <RouterLink 
            to="/contact" 
            class="inline-flex items-center gap-3 bg-[#20CAC4] hover:bg-[#1db1ab] text-white px-12 py-5 rounded-full font-bold text-lg shadow-xl shadow-[#20CAC4]/20 transition-all active:scale-[0.98]"
          >
            {{ locale === 'en' ? 'Apply to be a Distributor' : 'قدم طلب الانضمام كموزع' }}
            <font-awesome-icon :icon="locale === 'en' ? 'fa-solid fa-arrow-right' : 'fa-solid fa-arrow-left'" class="text-sm" />
          </RouterLink>
        </div>

      </div>
    </section>

  </div>
</template>