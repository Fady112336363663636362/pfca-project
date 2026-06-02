<template>
  <div class="min-h-screen bg-[#F5F7FA] pb-24 font-sans" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    
    <!-- هيدر الصفحة متجاوب وتلقائي الاتجاه -->
    <header class="bg-[#293043] pt-32 pb-16 md:pt-40 md:pb-24 text-white">
      <div class="container mx-auto px-6 text-center">
        <div class="max-w-3xl mx-auto space-y-6">
          <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold font-serif tracking-tight leading-tight">
            {{ locale === 'en' ? 'Premium Date Products' : 'منتجات التمور الفاخرة' }}
          </h1>
          <p class="text-slate-300 text-base md:text-xl font-light">
            {{ locale === 'en' ? 'Discover our full range of premium dates.' : 'اكتشف مجموعتنا الكاملة من التمور الفاخرة.' }}
          </p>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 md:px-10 lg:px-16 py-12 relative">
      
      <!-- حاوية المحتوى الرئيسي متجاوبة بالكامل -->
      <div class="flex flex-col lg:flex-row gap-8 md:gap-10">
        
        <!-- المربع الجانبي (تم تحسين حجمه وعرضه وتثبيته لمنع الضغط) -->
        <aside class="w-full lg:w-75 xl:w-72 shrink-0">
          <div class="bg-white rounded-[1rem] p-6 shadow-sm border border-slate-100">
            <h3 class="text-xl font-bold text-[#1e293b] font-serif mb-6 border-b pb-4">
              {{ locale === 'en' ? 'Sort by Category' : 'تصفية حسب الفئة' }}
            </h3>
            
            <button 
              @click="setFilter('All')"
              class="w-full px-4 py-3 rounded-xl font-bold transition-all mb-4 text-sm"
              :class="[
                selectedCategory === 'All' ? 'bg-teal-50 text-[#26d0ce]' : 'text-slate-600 hover:bg-slate-50',
                locale === 'ar' ? 'text-right' : 'text-left'
              ]"
            >
              {{ locale === 'en' ? 'All Categories' : 'جميع الفئات' }}
            </button>

            <!-- الأكورديون الخاص بالفئات متوافق ومتجاوب -->
            <Accordion type="single" collapsible class="w-full">
              <AccordionItem v-for="cat in categories" :key="cat.id" :value="cat.name" class="border-none">
                <AccordionTrigger class="hover:no-underline py-3 px-4 text-slate-700 hover:text-[#26d0ce] font-bold text-sm transition-colors">
                  {{ cat.name_i18n?.[locale] || cat.name }}
                </AccordionTrigger>
                <AccordionContent class="pb-2 pt-1">
                  <!-- الحافة الجانبية تظهر في مكانها الصحيح بناءً على لغة الموقع -->
                  <div class="flex flex-col space-y-1" :class="locale === 'ar' ? 'border-r-2 border-slate-100 pr-4 mr-2' : 'border-l-2 border-slate-100 pl-4 ml-2'">
                    <button 
                      v-for="sub in cat.children" :key="sub.id"
                      @click="setFilter(cat.name, sub.name)"
                      class="py-2 px-4 text-sm text-slate-500 hover:text-[#26d0ce] transition-colors rounded-lg"
                      :class="[
                        selectedSub === sub.name ? 'text-[#26d0ce] font-bold bg-teal-50' : 'hover:bg-slate-50',
                        locale === 'ar' ? 'text-right' : 'text-left'
                      ]"
                    >
                      {{ sub.name_i18n?.[locale] || sub.name }}
                    </button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </aside>

        <main class="flex-grow">
          <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            <div v-for="i in 6" :key="i" class="h-80 bg-gray-200 animate-pulse rounded-[1rem]"></div>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            <RouterLink 
              v-for="product in filteredProducts" :key="product.id"
              :to="'/product/' + product.id"
              class="group bg-white rounded-[1rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col border border-slate-100"
            >
              <div class="relative h-53 md:h-60 overflow-hidden rounded-t-[1rem]">
                <img :src="product.image || 'https://via.placeholder.com/600x450?text=Premium+Dates'" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span class="absolute top-4 bg-[#1e293b]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider"
                      :class="locale === 'ar' ? 'right-4' : 'left-4'">
                  {{ product.category_i18n?.[locale] || product.category }}
                </span>
              </div>

              <div class="p-6 md:p-8 flex flex-col flex-grow space-y-4">
                <h3 class="text-lg md:text-xl font-bold text-[#1e293b] leading-tight group-hover:text-[#0ABAB5] transition-colors font-serif">
                  {{ product.name_i18n?.[locale] || product.name }}
                </h3>
                <p class="text-slate-500 text-sm leading-relaxed flex-grow font-light line-clamp-2">
                  {{ product.description_i18n?.[locale] || product.description }}
                </p>
                <div class="flex items-center justify-between pt-2">
                  <div class="text-[#0ABAB5] font-bold text-lg">{{ product.price }} JOD</div>
                  <div class="flex items-center gap-2 text-slate-400 font-bold text-sm transition-all group-hover:gap-3 group-hover:text-[#0ABAB5]">
                    <span>{{ locale === 'en' ? 'Details' : 'التفاصيل' }}</span>
                    <font-awesome-icon :icon="locale === 'en' ? 'fa-solid fa-arrow-right' : 'fa-solid fa-arrow-left'" class="text-xs" />
                  </div>
                </div>
              </div>
            </RouterLink>
          </div>
          
          <div v-if="!loading && filteredProducts.length === 0" class="text-center py-20 text-slate-400">
            {{ locale === 'en' ? 'No products found.' : 'لا توجد منتجات في هذا القسم.' }}
          </div>
        </main>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import apiClient from '@/api/axios' 
import { useI18n } from 'vue-i18n' 
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const { locale } = useI18n() 
const products = ref<any[]>([])
const categories = ref<any[]>([])
const loading = ref(true)
const selectedCategory = ref('All')
const selectedSub = ref('')

const fetchData = async () => {
  try {
    loading.value = true
    const [prodRes, catRes] = await Promise.all([
      apiClient.get('/products'),
      apiClient.get('/categories')
    ])
    products.value = prodRes.data?.data || []
    categories.value = catRes.data?.data || []
  } catch (error) {
    console.error("Error fetching data:", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'All') return products.value
  return products.value.filter(p => {
    const matchCat = p.category === selectedCategory.value
    const matchSub = selectedSub.value ? p.subcategory === selectedSub.value : true
    return matchCat && matchSub
  })
})

const setFilter = (cat: string, sub: string = '') => {
  selectedCategory.value = cat
  selectedSub.value = sub
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
.container { max-width: 1400px; width: 100%; }
</style>