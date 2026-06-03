<template>
  <footer class="bg-[#293043] text-white pt-16 pb-8" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="container mx-auto px-6 md:px-12 lg:px-20">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        <div class="space-y-6">
          <img :src="getVal('logo') || '/public/PFCA.png'" alt="PFCA Logo" class="h-16 w-auto brightness-0 invert" />
          <p class="text-slate-400 text-sm leading-relaxed max-w-xs">
            {{ locale === 'en' 
               ? 'Together for a sustainable future in palm farming and premium date production.' 
               : 'معاً من أجل مستقبل مستدام في زراعة النخيل وإنتاج التمور الفاخرة.' 
            }}
          </p>
          <div class="flex gap-4">
            <a :href="getVal('facebook') || '#'" target="_blank" class="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center hover:bg-[#26c8c840] hover:border-[#26d0cd5b] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
            <a :href="getVal('instagram') || '#'" target="_blank" class="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center hover:bg-[#26c8c840] hover:border-[#26d0cd5b] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>

        <div class="space-y-6">
          <h3 class="text-xl font-bold font-serif  tracking-wide text-white">
            {{ locale === 'en' ? 'Important Links' : 'روابط هامة' }}
          </h3>
          <ul class="space-y-4 text-slate-400">
            <li class="hover:text-[#26d0ce] transition-colors"><RouterLink to="/knowledge-guide">{{ locale === 'en' ? 'Knowledge Guide' : 'دليل المعرفة' }}</RouterLink></li>
            <li class="hover:text-[#26d0ce] transition-colors"><RouterLink to="/distributor">{{ locale === 'en' ? 'Become a Distributor' : 'كن موزعاً لنا' }}</RouterLink></li>
            <li class="hover:text-[#26d0ce] transition-colors"><RouterLink to="/media-gallery">{{ locale === 'en' ? 'Media Gallery' : 'معرض الوسائط' }}</RouterLink></li>
            <li class="hover:text-[#26d0ce] transition-colors"><RouterLink to="/date-exporters">{{ locale === 'en' ? 'Date Exporters' : 'مصدري التمور' }}</RouterLink></li>
          </ul>
        </div>

        <div class="space-y-6">
          <h3 class="text-xl font-bold font-serif tracking-wide text-white">
            {{ locale === 'en' ? 'Quick Links' : 'روابط سريعة' }}
          </h3>
          <ul class="space-y-4 text-slate-400">
            <li class="hover:text-[#26d0ce] transition-colors"><RouterLink to="/services">{{ locale === 'en' ? 'Our Services' : 'خدماتنا' }}</RouterLink></li>
            <li class="hover:text-[#26d0ce] transition-colors"><RouterLink to="/products">{{ locale === 'en' ? 'Our Products' : 'منتجاتنا' }}</RouterLink></li>
            <li class="hover:text-[#26d0ce] transition-colors"><RouterLink to="/our-projects">{{ locale === 'en' ? 'Our Projects' : 'مشاريعنا' }}</RouterLink></li>
          </ul>  
        </div>

        <div class="space-y-6">
          <h3 class="text-xl font-bold font-serif tracking-wide text-white">
            {{ locale === 'en' ? 'Association Location' : 'موقع الجمعية' }}
          </h3>
          <div class="rounded-2xl overflow-hidden h-32 w-full relative group shadow-inner border border-slate-700/50">
            <iframe 
              :src="getEmbedUrl(getVal('google_maps_link'))" 
              class="w-full h-full border-none grayscale hover:grayscale-0 transition-all duration-500"
              allowfullscreen="" 
              loading="lazy"
            ></iframe>
            <a :href="getVal('google_maps_link') || '#'" target="_blank" class="absolute top-2 bg-white text-blue-600 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-md" :class="locale === 'ar' ? 'right-2' : 'left-2'">
              {{ locale === 'en' ? 'Maps' : 'الخريطة' }} 
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
          <p class="text-slate-400 text-sm">
            {{ getValLocale('address') || (locale === 'en' ? 'Jericho, Palestine' : 'أريحا، فلسطين') }}
          </p>
        </div>

      </div>

      <div class="border-t border-slate-700/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-slate-500 text-sm text-center md:text-left">
          © {{ new Date().getFullYear() }} {{ getVal('site_name') || 'PFCA' }}. 
          {{ locale === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.' }}
        </p>
        <p class="text-slate-500 text-sm text-center md:text-right">
          {{ locale === 'en' ? 'Designed & Developed by' : 'تصميم وتطوير' }} 
          <span class="text-[#26d0ce] font-bold cursor-pointer mx-1">Be Kite</span>
        </p>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n' 

const { locale } = useI18n()
const settings = ref<any[]>([])

const fetchSettings = async () => {
  try {
    const response = await axios.get('https://pfcabackend.wd-jo.com/api/frontend/settings')
    settings.value = response.data?.data || []
  } catch (error) {
    console.error("Error loading settings:", error)
  }
}

const getEmbedUrl = (link: string) => {
  if (!link) {
    return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13543.518600108398!2d35.44855215!3d31.8611145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15152b11b5e39b97%3A0x8dd34f8263595b45!2sJericho!5e0!3m2!1sen!2s!4v1715610000000!5m2!1sen!2s'
  }
  return link
}

const getVal = (key: string) => {
  return settings.value?.find(s => s.key === key)?.value || ''
}

const getValLocale = (baseKey: string) => {
  const key = `${baseKey}_${locale.value}`
  return settings.value?.find(s => s.key === key)?.value || ''
}

onMounted(() => {
  fetchSettings()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
</style>