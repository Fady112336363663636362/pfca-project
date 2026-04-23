<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  fullName: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = () => {
  if (!formData.value.fullName || !formData.value.email || !formData.value.subject || !formData.value.message) {
    alert('⚠️ Please fill in all fields before sending your message.')
    return
  }

  console.log('Form Submitted:', formData.value)
  alert('✅ Thank you! Your message has been sent successfully.')
  
  formData.value = { fullName: '', email: '', subject: '', message: '' }
}

const contactInfo = [
  { title: 'Address', detail: 'Jericho, Jordan Valley, Palestine', icon: 'fa-solid fa-location-dot' },
  { title: 'Phone', detail: '+970 2 232 1234', icon: 'fa-solid fa-phone' },
  { title: 'Email', detail: 'info@pfca.ps', icon: 'fa-solid fa-envelope' }
]
</script>

<template>
  <div class="min-h-screen bg-white pb-20 font-sans">
    
   <section class=" bg-[#293043] pt-20 mb-12 text-white">
      <div class="container mx-auto px-6   justify-center items-center flex flex-col lg:flex-row gap-12">
        <div class="max-w-2xl space-y-6 text-center lg:text-center">
          <h1 class="text-6xl md:text-[45px] pt-10 font-bold font-serif  leading-tight ">
Contact Us
          </h1>
          <p class="text-xl pb-15 text-slate-300 font-light ">
We would love to hear from you.

          </p>
        </div>
      </div>
    </section>


    <main class="container mx-auto px-40 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div class="lg:col-span-7 bg-[#F5F7FA] rounded-[rem] p-6 md:p-10 shadow-sm border border-slate-50">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            
            <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div class="space-y-1.5 text-left">
                <label class="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Full Name</label>
                <input v-model="formData.fullName" type="text" placeholder="Your name"
                  class="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#26d0ce] transition-all shadow-sm" />
              </div>

              <div class="space-y-1.5 text-left">
                <label class="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Email Address</label>
                <input v-model="formData.email" type="email" placeholder="Your email"
                  class="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#26d0ce] transition-all shadow-sm" />
              </div>
            </div>

            <div class="space-y-1.5 text-left">
              <label class="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Subject</label>
              <input v-model="formData.subject" type="text" placeholder="What is this about?"
                class="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#26d0ce] transition-all shadow-sm" />
            </div>

            <div class="space-y-1.5 text-left">
              <label class="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Message</label>
              <textarea v-model="formData.message" rows="5" placeholder="Write your message..."
                class="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#26d0ce] transition-all shadow-sm resize-none"></textarea>
            </div>

            <div class="pt-2">
              <button type="submit"
                class="w-full bg-[#26d0ce] hover:bg-[#1fb5b3] text-white py-4 rounded-full text-base font-bold shadow-lg shadow-teal-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <font-awesome-icon icon="fa-solid fa-paper-plane" class="text-sm" />
                Send Message
              </button>
            </div>

          </form>
        </div>

        <div class="lg:col-span-5 space-y-5">
          
          <div v-for="(info, index) in contactInfo" :key="index"
            class="bg-[#F5F7FA] p-5 rounded-2xl flex items-center gap-5 border border-slate-50 transition-all hover:bg-white hover:shadow-md group">
            <div class="w-12 h-12 bg-white text-[#26d0ce] rounded-xl flex items-center justify-center text-lg shadow-sm group-hover:bg-[#26d0ce] group-hover:text-white transition-colors">
              <font-awesome-icon :icon="info.icon" />
            </div>
            <div class="text-left">
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ info.title }}</p>
              <p class="text-base font-bold text-[#1e293b]">{{ info.detail }}</p>
            </div>
          </div>

          <div class="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 h-[280px] relative group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13531.42533221975!2d35.4452!3d31.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502d3345862d85b%3A0x67396a583925769!2sJericho!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s" 
              class="w-full h-full border-none grayscale hover:grayscale-0 transition-all duration-700"
              allowfullscreen="" loading="lazy"></iframe>
            <div class="absolute top-4 left-4">
              <a href="#" class="bg-white/90 backdrop-blur-sm text-blue-600 px-4 py-2 rounded-lg text-[10px] font-bold shadow-md flex items-center gap-2 hover:bg-white">
                Open in Maps <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }

input::placeholder, textarea::placeholder {
  color: #cbd5e1;
  font-size: 13px;
}
</style>