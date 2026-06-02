<template>
  <section class="py-12 md:py-20 bg-white" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="container mx-auto px-6 md:px-12 lg:px-20">
      
      <div class="text-center mb-10 md:mb-16">
        <h2 class="text-3xl md:text-4xl font-serif text-[#1e293b] mb-4">
          {{ locale === 'en' ? 'Premium Date Collections' : 'مجموعات التمور الفاخرة' }}
        </h2>
        <p class="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
          {{ locale === 'en' 
            ? 'Explore our diverse range of premium dates, each cultivated with care and expertise.' 
            : 'استكشف مجموعتنا المتنوعة من التمور الفاخرة، التي تمت زراعتها بعناية وخبرة فائقة.' 
          }}
        </p>
      </div>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div v-for="i in 3" :key="i" class="h-80 bg-gray-100 animate-pulse rounded-[1rem]"></div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <RouterLink
          to="/products" 
          v-for="(item, index) in collections" 
          :key="index"
          class="group bg-[#F5F7FA] rounded-[1rem] overflow-hidden flex flex-col shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 cursor-pointer"
        >
          <div class="relative h-56 md:h-64 w-full overflow-hidden">
            <img 
              :src="item.image || 'https://via.placeholder.com/800x600?text=Premium+Dates'" 
              :alt="item.name_i18n?.[locale] || item.name" 
              class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
              <h3 class="text-xl md:text-2xl font-serif text-white transition-transform duration-500 group-hover:translate-x-2">
                {{ item.name_i18n?.[locale] || item.name }}
              </h3>
            </div>
          </div>

          <div class="p-6 space-y-4">
            <p class="text-slate-500 text-sm leading-relaxed line-clamp-2">
              {{ item.description_i18n?.[locale] || item.description || (locale === 'en' ? 'Discover our premium selection.' : 'اكتشف مجموعتنا المختارة.') }}
            </p>
            
            <div class="flex flex-wrap gap-2 pt-2">
              <span 
                v-for="(sub, sIndex) in item.children" 
                :key="sIndex"
                class="bg-white border border-slate-100 text-slate-700 text-[12px] md:text-sm px-4 py-1.5 rounded-2xl shadow-sm"
              >
                {{ sub.name_i18n?.[locale] || sub.name }}
              </span>
              <span v-if="!item.children || item.children.length === 0" class="text-xs text-slate-300 italic">
                {{ locale === 'en' ? 'Premium Collection' : 'مجموعة فاخرة' }}
              </span>
            </div>
          </div>
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiClient from '@/api/axios' 
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n' 

const { locale } = useI18n() 
const collections = ref<any[]>([])
const loading = ref(true)

const fetchCollections = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/categories')
    collections.value = response.data?.data || []
  } catch (error) {
    console.error("Error fetching collections:", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCollections()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
</style>