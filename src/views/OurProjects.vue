<template>
  <div class="min-h-screen bg-white pb-24 font-sans" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    
    <header class="bg-[#293043] pt-32 pb-20 md:pt-40 text-white px-6">
      <div class="container mx-auto text-center space-y-6">
        <h1 class="text-5xl md:text-[45px] font-bold font-serif tracking-tight">
          {{ locale === 'en' ? 'Our Projects' : 'مشاريعنا' }}
        </h1>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          {{ locale === 'en' ? 'Impactful initiatives for sustainable development.' : 'مبادرات مؤثرة من أجل التنمية المستدامة.' }}
        </p>
      </div>
    </header>

    <main class="container mx-auto px-6 py-16">
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="i in 6" :key="i" class="h-96 bg-gray-100 animate-pulse rounded-[1rem]"></div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        <RouterLink 
          v-for="project in allProjects" 
          :key="project.id"
          :to="'/project/' + project.id"
          class="group bg-[#F5F7FA] rounded-[1rem] overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 cursor-pointer border border-transparent hover:border-slate-100"
        >
          <div class="h-64 w-full overflow-hidden">
            <img 
              :src="project.image || 'https://via.placeholder.com/600x450?text=Premium+Project'" 
              class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
              alt="Project Image"
            />
          </div>

          <div class="p-8 flex flex-col flex-grow space-y-5 hover:text-[#0ABAB5]">
            <h3 class="text-[18px] font-serif leading-tight text-[#1e293b]">
              {{ project.title_i18n?.[locale] || project.title }}
            </h3>
            
            <p class="text-[#64748b] text-[15px] leading-relaxed flex-grow font-medium line-clamp-3">
              {{ project.description_i18n?.[locale] || project.description || project.content_i18n?.[locale] || project.content }}
            </p>
            
            <div class="flex items-center gap-2 text-[#0ABAB5] font-bold text-[16px] group/link pt-2 transition-all">
              <span>{{ locale === 'en' ? ' Details' : 'تفاصيل' }}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 transition-transform duration-300" 
                :class="locale === 'en' ? 'group-hover/link:translate-x-2' : 'group-hover/link:-translate-x-2 rotate-180'"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </RouterLink>

      </div>

      <div v-if="!loading && allProjects.length === 0" class="text-center py-20 text-slate-400">
          {{ locale === 'en' ? 'No projects found.' : 'لم يتم العثور على مشاريع حالياً.' }}
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiClient from '@/api/axios' 
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const allProjects = ref<any[]>([])
const loading = ref(true)

const fetchProjects = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/projects')
    allProjects.value = response.data?.data || []
  } catch (error) {
    console.error("Error fetching projects:", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProjects()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
.container { max-width: 1300px; }
</style>