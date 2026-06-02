<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n' // استيراد المكتبة
import AboutSection from '@/components/AboutSection.vue';
import TeamSection from '@/components/TeamSection.vue'

const { locale } = useI18n() // الوصول للغة الحالية (ar أو en)
const settings = ref([])
const loading = ref(true)

const fetchSettings = async () => {
  try {
    const response = await axios.get('https://pfcabackend.wd-jo.com/api/frontend/settings')
    settings.value = response.data.data
  } catch (error) {
    console.error("Error loading about page settings:", error)
  } finally {
    loading.value = false
  }
}

const getValLocale = (baseKey: string) => {
  const key = `${baseKey}_${locale.value}`
  return settings.value.find(s => s.key === key)?.value || ''
}

const getVal = (key: string) => {
  return settings.value.find(s => s.key === key)?.value || ''
}

onMounted(fetchSettings)
</script>

<template>
  <div class="min-h-screen bg-white">
    
    <section class=" bg-[#293043] pt-20 mb-12 text-white">
      <div class="container mx-auto px-6 justify-center items-center flex flex-col lg:flex-row gap-12">
        <div class="max-w-2xl space-y-6 text-center lg:text-center">
          <h1 class="text-4xl md:text-[45px] pt-10 font-bold font-serif leading-tight ">
           {{ getValLocale('about_title') || (locale === 'en' ? 'About Us' : 'من نحن') }}
          </h1>
          <p class="text-xl pb-15 text-slate-300 font-light ">
           {{ getValLocale('about_subtitle') || '...' }}
          </p>
        </div>
      </div>
         <AboutSection/>
    </section>

    <section>
      <section class="py-24 bg-white">
        <div class="container mx-auto px-6">
          
          <div class="text-center mb-20">
            <h2 class="text-4xl md:text-5xl font-bold text-[#1e293b] font-serif tracking-tight">
              {{ locale === 'en' ? "Chairman's Message" : "رسالة رئيس مجلس الإدارة" }}
            </h2>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div class="relative flex justify-center lg:justify-end pr-0 lg:pr-12">
              <div class="relative w-full max-w-md">
                <div class="rounded-[1.5rem] overflow-hidden shadow-2xl h-[500px] ">
                  <img 
                    :src="getVal('about_chairman_image') || '/Mohammed Al-Arja.jpg'" 
                    alt="Chairman" 
                    class="w-full h-full object-cover object-center"
                  />
                </div>
                
                <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-10 py-6 rounded-2xl shadow-xl border border-slate-50 min-w-[280px] text-center">
                  <h4 class="text-xl font-bold text-[#1e293b] font-serif">
                    <!-- اسم رئيس مجلس الإدارة حسب اللغة -->
                    {{ getValLocale('about_chairman_name') || 'Mohammed Al-Arja' }}
                  </h4>
                  <p class="text-[#26d0ce] text-sm font-bold mt-1">
                    {{ locale === 'en' ? 'Chairman of the Board' : 'رئيس مجلس الإدارة' }}
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-10 text-left pt-12 lg:pt-0">
              <!-- تغيير اتجاه الخط العربي في السكريبت لو محتاج، لكن هنا بنغير النص بس -->
              <div class="w-16 h-1 bg-[#26d0ce] rounded-full"></div>
              
              <div class="space-y-8" :class="locale === 'ar' ? 'text-right' : 'text-left'">
                <p class="text-xl text-slate-600 leading-relaxed font-light italic">
                  <!-- نص الرسالة حسب اللغة -->
                  {{ getValLocale('about_chairman_message') || '...' }}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </section>

    <section>
       <TeamSection />
    </section>

  </div>
</template>