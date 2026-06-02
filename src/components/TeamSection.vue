<template>
  <section class="py-24 bg-[#F5F7FA]" :class="locale === 'ar' ? 'text-right' : 'text-left'">
    <div class="container mx-auto px-20">
      
      <div class="text-center mb-20 space-y-4">
        <h2 class="text-4xl md:text-5xl font-bold text-[#1e293b] font-serif tracking-tight">
          {{ locale === 'en' ? 'Organizational Structure' : 'الهيكل التنظيمي' }}
        </h2>
        <p class="text-slate-800 text-lg font-light italic">
          {{ locale === 'en' ? 'Meet the team behind our success.' : 'تعرف على الفريق وراء نجاحنا.' }}
        </p>
      </div>

      <div v-if="loading" class="text-center py-10 text-teal-600 animate-pulse font-bold">
        {{ locale === 'en' ? 'Loading Team Members...' : 'جاري تحميل فريق العمل...' }}
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
        <div 
          v-for="(member, index) in team" 
          :key="index"
          class="flex flex-col items-center text-center group"
        >
          <div class="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-6 shadow-sm transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
            <img 
              :src="member.image" 
              :alt="member.name_i18n?.[locale] || member.name" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          <h4 class="text-[17px] font-bold text-[#1e293b] font-serif leading-tight">
            {{ member.name_i18n?.[locale] || member.name }}
          </h4>
          
          <p class="text-[#26d0ce] text-[13px] font-bold mt-2 uppercase tracking-wide">
            {{ member.job_title_i18n?.[locale] || member.job_title }}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/api/axios' 

const { locale } = useI18n()
const team = ref([]) 
const loading = ref(true)

const fetchTeam = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/team-members')
    team.value = response.data.data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTeam()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
</style>