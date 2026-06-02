<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import apiClient from '@/api/axios' // استيراد الـ apiClient
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
    settings.value = response.data.data
  } catch (error) {
    console.error("Error loading contact settings:", error)
  }
}

const getVal = (key: string) => {
  return settings.value.find(s => s.key === key)?.value || ''
}

// تحديث معلومات التواصل ديناميكياً
const contactInfo = computed(() => [
  { title: 'Address', detail: getVal('address_en') || 'Jericho, Palestine', icon: 'fa-solid fa-location-dot' },
  { title: 'Phone', detail: getVal('phone_number') || '+970 2 232 1234', icon: 'fa-solid fa-phone' },
  { title: 'Email', detail: getVal('email') || 'info@pfca.ps', icon: 'fa-solid fa-envelope' }
])

const handleSubmit = async () => {
  errors.value = { fullName: '', email: '', subject: '', message: '' }
  let isValid = true

  if (!formData.value.fullName) { errors.value.fullName = 'Full Name is required'; isValid = false }
  if (!formData.value.email) { errors.value.email = 'Email Address is required'; isValid = false }
  if (!formData.value.subject) { errors.value.subject = 'Subject is required'; isValid = false }
  if (!formData.value.message) { errors.value.message = 'Message cannot be empty'; isValid = false }

  if (isValid) {
    try {
      isSubmitting.value = true
      await apiClient.post('/contact', {
        name: formData.value.fullName,
        email: formData.value.email,
        subject: formData.value.subject,
        message: formData.value.message
      })
      
      alert('✅ Your message has been sent successfully!')
      formData.value = { fullName: '', email: '', subject: '', message: '' }
    } catch (error) {
      alert('❌ Failed to send message. Please try again later.')
    } finally {
      isSubmitting.value = false
    }
  }
}

onMounted(fetchSettings)
</script>

<template>
  <div class="min-h-screen bg-white pb-20 font-sans">
    
    <header class="bg-[#293043] py-16 md:py-24 text-white">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-6xl pt-10 font-bold font-serif leading-tight">Contact Us</h1>
        <p class="text-lg md:text-xl pb-5 text-slate-300 font-light">We would love to hear from you.</p>
      </div>
    </header>

    <main class="container mx-auto px-6 md:px-16 lg:px-24 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div class="lg:col-span-7 bg-[#F5F7FA] rounded-[1rem] p-6 md:p-10 shadow-sm border border-slate-50">
          <form @submit.prevent="handleSubmit" class="space-y-5">
            
            <div class="space-y-1.5 text-left">
              <label class="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Full Name</label>
              <input v-model="formData.fullName" type="text" placeholder="Your name"
                :class="{'border-red-500 ring-1 ring-red-100': errors.fullName}"
                class="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#26d0ce] transition-all shadow-sm" />
              <p v-if="errors.fullName" class="text-red-500 text-[11px] font-bold ml-1">{{ errors.fullName }}</p>
            </div>

            <div class="space-y-1.5 text-left">
              <label class="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Email Address</label>
              <input v-model="formData.email" type="email" placeholder="Your email"
                :class="{'border-red-500 ring-1 ring-red-100': errors.email}"
                class="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#26d0ce] transition-all shadow-sm" />
              <p v-if="errors.email" class="text-red-500 text-[11px] font-bold ml-1">{{ errors.email }}</p>
            </div>

            <div class="space-y-1.5 text-left">
              <label class="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Subject</label>
              <input v-model="formData.subject" type="text" placeholder="What is this about?"
                :class="{'border-red-500 ring-1 ring-red-100': errors.subject}"
                class="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#26d0ce] transition-all shadow-sm" />
              <p v-if="errors.subject" class="text-red-500 text-[11px] font-bold ml-1">{{ errors.subject }}</p>
            </div>

            <div class="space-y-1.5 text-left">
              <label class="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Message</label>
              <textarea v-model="formData.message" rows="5" placeholder="Write your message..."
                :class="{'border-red-500 ring-1 ring-red-100': errors.message}"
                class="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#26d0ce] transition-all shadow-sm resize-none"></textarea>
              <p v-if="errors.message" class="text-red-500 text-[11px] font-bold ml-1">{{ errors.message }}</p>
            </div>

            <div class="pt-2">
              <button type="submit" :disabled="isSubmitting"
                class="w-full bg-[#26d0ce] hover:bg-[#1fb5b3] text-white py-4 rounded-full text-base font-bold shadow-lg shadow-teal-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50">
                <font-awesome-icon v-if="!isSubmitting" icon="fa-solid fa-paper-plane" class="text-sm" />
                <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
              </button>
            </div>

          </form>
        </div>

        <div class="lg:col-span-5 space-y-5">
          <div v-for="(info, index) in contactInfo" :key="index"
            class="bg-[#F5F7FA] p-5 rounded-[1rem] flex items-center gap-5 border border-slate-50 transition-all hover:bg-white hover:shadow-md group">
            <div class="w-12 h-12 bg-white text-[#26d0ce] rounded-xl flex items-center justify-center text-lg shadow-sm group-hover:bg-[#26d0ce] group-hover:text-white transition-colors">
              <font-awesome-icon :icon="info.icon" />
            </div>
            <div class="text-left">
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ info.title }}</p>
              <p class="text-base font-bold text-[#1e293b] leading-tight">{{ info.detail }}</p>
            </div>
          </div>

          <div class="bg-white rounded-[1rem] overflow-hidden shadow-sm border border-slate-100 h-[300px] relative group">
            <iframe 
              :src="getVal('google_maps_link') || 'https://www.google.com/maps/embed?...'" 
              class="w-full h-full border-none grayscale hover:grayscale-0 transition-all duration-700"
              allowfullscreen="" loading="lazy"></iframe>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>