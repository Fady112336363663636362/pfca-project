<template>
  <div class="min-h-screen bg-white font-sans" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    
    <!-- هيدر الصفحة متجاوب تماماً مع الاتجاهات -->
    <header class="bg-[#293043] py-16 md:py-24 text-white">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-6xl pt-10 font-bold font-serif leading-tight">
          {{ locale === 'en' ? 'Contact Us' : 'اتصل بنا' }}
        </h1>
        <p class="text-lg md:text-xl pb-5 text-slate-300 font-light">
          {{ locale === 'en' ? 'We would love to hear from you.' : 'يسعدنا دائماً تواصلكم معنا وتلقي رسائلكم.' }}
        </p>
      </div>
    </header>

    <!-- المحتوى الرئيسي متجاوب بالكامل -->
    <main class="container mx-auto px-6 md:px-16 lg:px-24 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- نموذج التواصل (Form) ديناميكي بالكامل -->
        <div class="lg:col-span-7 bg-[#F5F7FA] rounded-[1rem] p-6 md:p-10 shadow-sm border border-slate-50">
          <form @submit.prevent="handleSubmit" class="space-y-5">
            
            <!-- حقل الاسم الكامل -->
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-700 mx-1 uppercase tracking-wider">
                {{ locale === 'en' ? 'Full Name' : 'الاسم الكامل' }}
              </label>
              <input v-model="formData.fullName" type="text" :placeholder="locale === 'en' ? 'Your name' : 'الاسم الكامل'"
                :class="{'border-red-500 ring-1 ring-red-100': errors.fullName}"
                class="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#26d0ce] transition-all shadow-sm" />
              <p v-if="errors.fullName" class="text-red-500 text-[11px] font-bold mx-1">{{ errors.fullName }}</p>
            </div>

            <!-- حقل البريد الإلكتروني -->
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-700 mx-1 uppercase tracking-wider">
                {{ locale === 'en' ? 'Email Address' : 'البريد الإلكتروني' }}
              </label>
              <input v-model="formData.email" type="email" :placeholder="locale === 'en' ? 'Your email' : 'البريد الإلكتروني'"
                :class="{'border-red-500 ring-1 ring-red-100': errors.email}"
                class="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#26d0ce] transition-all shadow-sm" />
              <p v-if="errors.email" class="text-red-500 text-[11px] font-bold mx-1">{{ errors.email }}</p>
            </div>

            <!-- حقل موضوع الرسالة -->
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-700 mx-1 uppercase tracking-wider">
                {{ locale === 'en' ? 'Subject' : 'موضوع الرسالة' }}
              </label>
              <input v-model="formData.subject" type="text" :placeholder="locale === 'en' ? 'What is this about?' : 'موضوع الرسالة'"
                :class="{'border-red-500 ring-1 ring-red-100': errors.subject}"
                class="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#26d0ce] transition-all shadow-sm" />
              <p v-if="errors.subject" class="text-red-500 text-[11px] font-bold mx-1">{{ errors.subject }}</p>
            </div>

            <!-- حقل نص الرسالة -->
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-700 mx-1 uppercase tracking-wider">
                {{ locale === 'en' ? 'Message' : 'الرسالة' }}
              </label>
              <textarea v-model="formData.message" rows="5" :placeholder="locale === 'en' ? 'Write your message...' : 'اكتب رسالتك هنا...'"
                :class="{'border-red-500 ring-1 ring-red-100': errors.message}"
                class="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#26d0ce] transition-all shadow-sm resize-none"></textarea>
              <p v-if="errors.message" class="text-red-500 text-[11px] font-bold mx-1">{{ errors.message }}</p>
            </div>

            <!-- زر الإرسال التفاعلي مترجم -->
            <div class="pt-2">
              <button type="submit" :disabled="isSubmitting"
                class="w-full bg-[#26d0ce] hover:bg-[#1fb5b3] text-white py-4 rounded-full text-base font-bold shadow-lg shadow-teal-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50">
                <font-awesome-icon v-if="!isSubmitting" icon="fa-solid fa-paper-plane" class="text-sm" />
                <span>{{ isSubmitting ? (locale === 'en' ? 'Sending...' : 'جاري الإرسال...') : (locale === 'en' ? 'Send Message' : 'إرسال الرسالة') }}</span>
              </button>
            </div>

          </form>
        </div>

        <!-- العمود الجانبي (مربط بالكامل بالـ API ولا يعرض أي حقل فارغ في السيرفر) -->
        <div class="lg:col-span-5 space-y-5">
          <div v-for="(info, index) in contactInfo" :key="index">
            <!-- شرط v-if يضمن عدم ظهور الكارد إذا كانت القيمة فارغة بالسيرفر -->
            <div v-if="info.detail" class="bg-[#F5F7FA] p-5 rounded-[1rem] flex items-center gap-5 border border-slate-50 transition-all hover:bg-white hover:shadow-md group">
              <div class="w-12 h-12 bg-white text-[#26d0ce] rounded-xl flex items-center justify-center text-lg shadow-sm group-hover:bg-[#26d0ce] group-hover:text-white transition-colors shrink-0">
                <font-awesome-icon :icon="info.icon" />
              </div>
              <div>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ info.title }}</p>
                <p class="text-base font-bold text-[#1e293b] leading-tight mt-1">{{ info.detail }}</p>
              </div>
            </div>
          </div>

          <!-- الخريطة تظهر فقط إذا كان هناك رابط مضاف في الداشبورد -->
          <div v-if="getVal('google_maps_link')" class="bg-white rounded-[1rem] overflow-hidden shadow-sm border border-slate-100 h-[300px] relative group animate-in fade-in duration-300">
            <iframe 
              :src="getVal('google_maps_link')" 
              class="w-full h-full border-none grayscale hover:grayscale-0 transition-all duration-700"
              allowfullscreen="" loading="lazy"></iframe>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import apiClient from '@/api/axios' 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from 'vue-i18n' 

const { locale } = useI18n() 

const formData = ref({
  fullName: '',
  email: '',
  subject: '',
  message: ''
})

const errors = ref({
  fullName: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const settings = ref<any[]>([])

const fetchSettings = async () => {
  try {
    const response = await apiClient.get('/settings')
    settings.value = response.data?.data || []
  } catch (error) {
    console.error("Error loading contact settings:", error)
  }
}

const getVal = (key: string) => {
  return settings.value?.find(s => s.key === key)?.value || ''
}

// قراءة بيانات الاتصال من السيرفر مباشرة دون أي قيم افتراضية صلبة
const contactInfo = computed(() => [
  { 
    title: locale.value === 'en' ? 'Address' : 'العنوان', 
    detail: getVal(locale.value === 'ar' ? 'address_ar' : 'address_en'), 
    icon: 'fa-solid fa-location-dot' 
  },
  { 
    title: locale.value === 'en' ? 'Phone' : 'الهاتف', 
    detail: getVal('phone_number'), 
    icon: 'fa-solid fa-phone' 
  },
  { 
    title: locale.value === 'en' ? 'Email' : 'البريد الإلكتروني', 
    detail: getVal('email'), 
    icon: 'fa-solid fa-envelope' 
  }
])

const handleSubmit = async () => {
  errors.value = { fullName: '', email: '', subject: '', message: '' }
  let isValid = true

  if (!formData.value.fullName) { 
    errors.value.fullName = locale.value === 'en' ? 'Full Name is required' : 'الاسم الكامل مطلوب'
    isValid = false 
  }
  if (!formData.value.email) { 
    errors.value.email = locale.value === 'en' ? 'Email Address is required' : 'البريد الإلكتروني مطلوب'
    isValid = false 
  }
  if (!formData.value.subject) { 
    errors.value.subject = locale.value === 'en' ? 'Subject is required' : 'موضوع الرسالة مطلوب'
    isValid = false 
  }
  if (!formData.value.message) { 
    errors.value.message = locale.value === 'en' ? 'Message cannot be empty' : 'نص الرسالة مطلوب'
    isValid = false 
  }

  if (isValid) {
    try {
      isSubmitting.value = true
      await apiClient.post('/contact', {
        name: formData.value.fullName,
        email: formData.value.email,
        subject: formData.value.subject,
        message: formData.value.message
      })
      
      alert(locale.value === 'en' ? '✅ Your message has been sent successfully!' : '✅ تم إرسال رسالتك بنجاح!')
      formData.value = { fullName: '', email: '', subject: '', message: '' }
    } catch (error) {
      alert(locale.value === 'en' ? '❌ Failed to send message. Please try again later.' : '❌ فشل إرسال الرسالة. يرجى المحاولة لاحقاً.')
    } finally {
      isSubmitting.value = false
    }
  }
}

onMounted(fetchSettings)
</script>

