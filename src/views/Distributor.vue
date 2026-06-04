<template>
 <div class="min-h-screen bg-[#F8FAFC] pb-24 font-sans" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    
    <!-- هيدر الصفحة متجاوب ويغطي الناف بار الثابت -->
    <section class="bg-[#293043] pt-32 pb-16 md:pt-40 md:pb-24 text-white">
      <div class="container mx-auto px-6 text-center space-y-6">
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight">
          {{ getValLocale('distributor_title') || (locale === 'en' ? 'Become a Distributor' : 'كن موزعاً لنا') }}
        </h1>
        <p class="text-lg md:text-xl text-slate-300 font-light">
          {{ getValLocale('distributor_subtitle') || (locale === 'en' ? 'Be part of our success story.' : 'كن جزءاً من قصة نجاحنا.') }}
        </p>
      </div>
    </section>

    <!-- متطلبات الانضمام -->
    <section class="py-12 md:py-24 bg-white px-6 md:px-12 lg:px-20">
      <div class="container mx-auto">
        
        <div class="text-center mb-16 space-y-4">
          <h2 class="text-3xl md:text-4xl font-bold text-[#1e293b] font-serif">
            {{ locale === 'en' ? 'Joining Requirements' : 'متطلبات الانضمام' }}
          </h2>
        </div>

        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
           <div v-for="i in 6" :key="i" class="h-64 bg-gray-50 animate-pulse rounded-[1rem]"></div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div 
            v-for="(req, index) in requirements" 
            :key="index"
            class="bg-[#F5F7FA] p-8 md:p-10 rounded-[1rem] flex flex-col items-start space-y-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
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

        <!-- زر تقديم الطلب يفتح المودال الجديد التفاعلي عند الضغط عليه -->
        <div class="mt-20 text-center">
          <button 
            @click="isModalOpen = true"
            class="inline-flex items-center gap-3 bg-[#20CAC4] hover:bg-[#1db1ab] text-white px-12 py-5 rounded-full font-bold text-lg shadow-xl shadow-[#20CAC4]/20 transition-all active:scale-[0.98]"
          >
            {{ locale === 'en' ? 'Apply to be a Distributor' : 'قدم طلب الانضمام كموزع' }}
            <font-awesome-icon :icon="locale === 'en' ? 'fa-solid fa-arrow-right' : 'fa-solid fa-arrow-left'" class="text-sm" />
          </button>
        </div>

      </div>
    </section>

    <!-- 🟢 المودال الكحلي الداكن لتقديم الطلبات (Register Now as Agent) مطابق للصورة بالبكسل 🟢 -->
    <Dialog :open="isModalOpen" @update:open="isModalOpen = false">
      <DialogContent 
        class="w-full max-w-[550px] max-h-[95vh] overflow-y-auto rounded-[2rem] p-6 md:p-10 bg-[#232936] text-white border-none shadow-2xl flex flex-col"
        :class="locale === 'ar' ? 'text-right' : 'text-left'"
      >
        <DialogHeader class="relative shrink-0 text-center mb-6">
          <DialogTitle class="text-2xl md:text-3xl font-bold text-white font-serif mb-2 block">
            {{ locale === 'en' ? 'Register Now as Agent' : 'سجل الآن كوكيل توزيع' }}
          </DialogTitle>
          <p class="text-xs md:text-sm text-slate-400">
            {{ locale === 'en' ? 'Complete the form below to begin your distributor application.' : 'يرجى إكمال النموذج أدناه لبدء تقديم طلب الانضمام.' }}
          </p>
        </DialogHeader>

        <!-- النموذج متناسق التوزيع ومرن يمنع حدوث السكرول على اللابتوب -->
        <form @submit.prevent="handleSubmit" class="space-y-4 flex-grow" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
          
          <!-- الصف الأول: الاسم الكامل + الشركة -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-300 mx-1 block">{{ locale === 'en' ? 'Full Name' : 'الاسم الكامل' }}</label>
              <input v-model="formData.fullName" type="text" required class="w-full bg-[#181d28] border border-slate-700/60 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#20CAC4] transition-all" />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-300 mx-1 block">{{ locale === 'en' ? 'Company' : 'الشركة' }}</label>
              <input v-model="formData.company" type="text" required class="w-full bg-[#181d28] border border-slate-700/60 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#20CAC4] transition-all" />
            </div>
          </div>

          <!-- الصف الثاني: الدولة + البريد الإلكتروني -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-300 mx-1 block">{{ locale === 'en' ? 'Country' : 'الدولة' }}</label>
              <select v-model="formData.country" required class="w-full bg-[#181d28] border border-slate-700/60 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#20CAC4] transition-all cursor-pointer">
                <option value="" disabled class="bg-[#232936]">{{ locale === 'en' ? 'Select country' : 'اختر الدولة' }}</option>
                <option v-for="c in countries" :key="c" :value="c" class="bg-[#232936]">{{ c }}</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-300 mx-1 block">{{ locale === 'en' ? 'Email Address' : 'البريد الإلكتروني' }}</label>
              <input v-model="formData.email" type="email" required class="w-full bg-[#181d28] border border-slate-700/60 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#20CAC4] transition-all" />
            </div>
          </div>

          <!-- الصف الثالث: رقم الهاتف -->
          <div class="space-y-1.5">
            <label class="text-xs font-bold text-slate-300 mx-1 block">{{ locale === 'en' ? 'Phone Number' : 'رقم الهاتف' }}</label>
            <input v-model="formData.phone" type="tel" required class="w-full bg-[#181d28] border border-slate-700/60 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#20CAC4] transition-all" />
          </div>

          <!-- الصف الرابع: الرسالة -->
          <div class="space-y-1.5">
            <label class="text-xs font-bold text-slate-300 mx-1 block">{{ locale === 'en' ? 'Message' : 'الرسالة' }}</label>
            <textarea v-model="formData.message" rows="2" required class="w-full bg-[#181d28] border border-slate-700/60 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#20CAC4] transition-all resize-none"></textarea>
          </div>

          <!-- زر الإرسال النيلي الفاخر المتطابق مع الصورة -->
          <div class="pt-2">
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full bg-[#17C2BD] hover:bg-[#139e9a] text-white py-4 rounded-full text-base font-bold shadow-lg shadow-teal-500/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
            >
              <font-awesome-icon v-if="!isSubmitting" icon="fa-solid fa-paper-plane" class="text-sm" />
              <span>{{ isSubmitting ? (locale === 'en' ? 'Submitting...' : 'جاري التقديم...') : (locale === 'en' ? 'Submit Application' : 'تقديم الطلب') }}</span>
            </button>
          </div>

        </form>
      </DialogContent>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import apiClient from '@/api/axios' 
import { useI18n } from 'vue-i18n'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const { locale } = useI18n() 

const settings = ref<any[]>([])
const loading = ref(true)

const isModalOpen = ref(false)
const isSubmitting = ref(false)

const countries = computed(() => 
  locale.value === 'en' 
    ? ['Palestine', 'Jordan', 'USA', 'UAE', 'Saudi Arabia', 'Egypt']
    : ['فلسطين', 'الأردن', 'الولايات المتحدة', 'الإمارات', 'السعودية', 'مصر']
)

const formData = ref({
  fullName: '',
  company: '',
  country: '',
  email: '',
  phone: '',
  message: ''
})

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
    settings.value = response.data?.data || []
  } catch (error) {
    console.error("Error fetching settings:", error)
  } finally {
    loading.value = false
  }
}

const getValLocale = (baseKey: string) => {
  const key = `${baseKey}_${locale.value}`
  return settings.value?.find(s => s.key === key)?.value || ''
}

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    
    await apiClient.post('/contact', {
      name: formData.value.fullName,
      email: formData.value.email,
      subject: locale.value === 'en' ? 'Distributor Application' : 'طلب انضمام كموزع',
      message: `Company: ${formData.value.company}\nCountry: ${formData.value.country}\nPhone: ${formData.value.phone}\nMessage: ${formData.value.message}`
    })

    alert(locale.value === 'en' ? '✅ Your distributor request has been sent successfully!' : '✅ تم إرسال طلب انضمامك بنجاح!')
    
    formData.value = { fullName: '', company: '', country: '', email: '', phone: '', message: '' }
    isModalOpen.value = false
  } catch (error) {
    console.error(error)
    alert(locale.value === 'en' ? '❌ Failed to send request.' : '❌ فشل إرسال الطلب، يرجى المحاولة لاحقاً.')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchSettings()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }

:deep(.fixed .right-4.top-4) {
  background: #323c52;
  color: #fff;
  border-radius: 999px;
  padding: 6px;
  right: 1.5rem;
  top: 1.5rem;
  transition: all 0.2s;
}
:deep(.fixed .right-4.top-4:hover) {
  background: #414f6b;
}
</style>