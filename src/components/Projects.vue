<template>
  <section class="py-16 md:py-24 bg-white overflow-hidden" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="container mx-auto px-4 md:px-12 lg:px-20 relative">
      
      <!-- عنوان وجزء الوصف للقسم -->
      <div class="text-center mb-16 space-y-4">
        <h2 class="text-3xl md:text-5xl font-bold text-[#1e293b] tracking-tight">
          {{ locale === 'en' ? 'Our Projects' : 'مشاريعنا' }}
        </h2>
        <p class="text-slate-500 text-sm md:text-lg font-light max-w-2xl mx-auto">
          {{ locale === 'en' ? 'Impactful initiatives for sustainable development.' : 'مبادرات مؤثرة من أجل التنمية المستدامة.' }}
        </p>
      </div>

      <div v-if="loading" class="flex justify-center py-20">
         <div class="animate-pulse text-teal-600 font-bold">
           {{ locale === 'en' ? 'Loading Projects...' : 'جاري تحميل المشاريع...' }}
         </div>
      </div>

   <Carousel 
  v-else
  class="relative w-full"
  :opts="{ 
    align: 'start', 
    loop: true, 
    direction: locale === 'ar' ? 'rtl' : 'ltr' 
  }"
  :dir="locale === 'ar' ? 'rtl' : 'ltr'"
>
        <CarouselContent class="-ml-4 md:-ml-6">
          <CarouselItem 
            v-for="project in projects" 
            :key="project.id" 
            class="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/4"
          >
            <div 
              @click="goToDetails(project.id)"
              class="group bg-[#F5F7FA] rounded-[1rem] overflow-hidden aspect-square flex flex-col cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-slate-100 relative"
            >
              
              <div class="h-1/2 w-full overflow-hidden">
                <img 
                  :src="project.image || 'https://via.placeholder.com/600x450?text=Premium+Project'" 
                  class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                  alt="Project Image"
                />
              </div>

              <!-- تفاصيل محتوى الكارد بالتوجيه الطبيعي -->
              <div class="p-5 md:p-6 flex flex-col flex-grow space-y-2 justify-between">
                <div class="space-y-1">
                  <!-- عنوان المشروع: كحد أقصى سطرين -->
                  <h3 class="text-base md:text-lg font-bold text-[#1e293b] leading-tight transition-colors group-hover:text-[#26d0ce] line-clamp-2">
                    {{ project.title_i18n?.[locale] || project.title }}
                  </h3>
                  
                  <!-- الوصف: كحد أقصى سطرين -->
                  <p class="text-[#64748b] text-[13px] md:text-[14px] leading-relaxed line-clamp-2 font-medium">
                    {{ project.description_i18n?.[locale] || project.description || project.content }}
                  </p>
                </div>
                
                <!-- تفاصيل الرابط والسهم المنعكس تلقائياً -->
                <div class="flex items-center gap-2 text-[#26d0ce] font-bold text-[13px] group/link pt-1">
                  <span>{{ locale === 'en' ? 'Details' : 'التفاصيل' }}</span>
                  <font-awesome-icon :icon="locale === 'en' ? 'fa-solid fa-arrow-right' : 'fa-solid fa-arrow-left'" class="text-[10px] transition-transform duration-300 group-hover/link:translate-x-1" />
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>

        <!-- 🟢 أزرار التنقل بالمنتصف تم إبعادها للخارج قليلاً (lg:-left-12) مع شرط الظهور الديناميكي الذكي 🟢 -->
        <CarouselPrevious 
          v-if="showArrows"
          class="absolute top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-[#26d0ce] hover:text-white transition-all shadow-sm z-30 left-2 lg:-left-12"
          :class="[
            projects.length <= 4 ? 'lg:hidden' : 'lg:flex',
            projects.length <= 2 ? 'md:hidden' : 'md:flex',
            projects.length <= 1 ? 'hidden' : 'flex'
          ]"
        />
        <CarouselNext 
          v-if="showArrows"
          class="absolute top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-[#26d0ce] hover:text-white transition-all shadow-sm z-30 right-2 lg:-right-12"
          :class="[
            projects.length <= 4 ? 'lg:hidden' : 'lg:flex',
            projects.length <= 2 ? 'md:hidden' : 'md:flex',
            projects.length <= 1 ? 'hidden' : 'flex'
          ]"
        />
      </Carousel>

      <div class="flex justify-center mt-12 md:mt-16">
        <RouterLink to="/our-projects" class="bg-[#1e293b] hover:bg-slate-800 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 transition-all shadow-xl active:scale-95 group/btn">
          <span>{{ locale === 'en' ? 'View All Projects' : 'عرض جميع المشاريع' }}</span>
          <font-awesome-icon :icon="locale === 'en' ? 'fa-solid fa-arrow-right' : 'fa-solid fa-arrow-left'" class="text-sm transition-transform group-hover/btn:translate-x-1" />
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import apiClient from '@/api/axios' 
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const router = useRouter()
const projects = ref<any[]>([])
const loading = ref(true)

// دالة فحص لتحديد الحاجة المبدئية للأسهم
const showArrows = computed(() => projects.value.length > 1)

const fetchProjects = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/projects')
    projects.value = response.data?.data || []
  } catch (error) {
    console.error("Error fetching projects:", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProjects()
})

const goToDetails = (id: number) => {
  router.push(`/project/${id}`)
}
</script>

<style scoped>
.container {
  max-width: 1400px;
}
</style>