<template>
  <div class="min-h-screen bg-[#F5F7FA] pt-32 pb-20 font-sans" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    
    <div v-if="loading" class="container mx-auto px-4 md:px-20 text-center py-20">
      <div class="animate-pulse text-2xl font-bold text-[#20CAC4]">
        {{ locale === 'en' ? 'Loading Product Details...' : 'جاري تحميل تفاصيل المنتج...' }}
      </div>
    </div>

    <div v-else-if="product" class="container mx-auto px-4 md:px-12 lg:px-20">
      
       <div class="container mx-auto px-6  pb-5">
      <RouterLink 
        to="/products" 
        class="inline-flex items-center gap-2 text-slate-500 hover:text-[#26d0ce] transition-colors font-bold group"
      >
        <font-awesome-icon :icon="locale === 'en' ? 'fa-solid fa-arrow-left' : 'fa-solid fa-arrow-right'" />
        <span>{{ locale === 'en' ? 'Back to Products' : 'العودة للمنتجات' }}</span>
      </RouterLink>
    </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        
        <div class="space-y-6">
          <div class="p-6 sm:p-12 aspect-square flex items-center justify-center relative">
            <img 
              v-if="activeImage || product.image" 
              :src="activeImage || product.image" 
              class="max-w-full max-h-full object-contain transition-all duration-500 rounded-[1rem]" 
              alt="Main Product Image"
            />
            <div v-else class="text-9xl font-serif text-slate-200">
              {{ getInitials(product.name_i18n?.[locale] || product.name) }}
            </div>
          </div>

          <div v-if="productImages.length > 1" class="flex flex-wrap gap-3 justify-center">
            <button 
              v-for="(img, idx) in productImages" 
              :key="idx"
              @click="activeImage = img"
              class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex items-center justify-center p-2 transition-all active:scale-95"
              :class="activeImage === img ? 'border-[#20CAC4] scale-105 shadow-md' : 'border-slate-100 hover:border-slate-300'"
            >
              <img :src="img" class="max-w-full max-h-full object-contain" alt="Thumbnail" />
            </button>
          </div>
        </div>

        <div class="space-y-8 md:space-y-10">
          <div class="space-y-4">
            <span class="bg-[#DDF1F3] text-[#20CAC4] py-1.5 px-4 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest inline-block">
              {{ locale === 'en' ? 'Premium Product' : 'منتج فاخر' }}
            </span>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e293b] font-serif tracking-tight leading-tight">
              {{ product.name_i18n?.[locale] || product.name }}
            </h1>
            <p class="text-base md:text-lg text-slate-500 leading-relaxed font-light">
              {{ product.description_i18n?.[locale] || product.description || (locale === 'en' ? 'A high-quality cooperative date product.' : 'منتج تمور فاخر عالي الجودة من مزارع الجمعية.') }}
            </p>
          </div>

          <div class="space-y-6">
            <h3 class="text-xl font-bold text-[#1e293b]">
              {{ locale === 'en' ? 'Product Information' : 'معلومات المنتج' }}
            </h3>
            <div class="bg-white rounded-[1rem] overflow-hidden border border-slate-100 shadow-sm">
              <div class="flex flex-col sm:flex-row justify-between p-4 md:p-5 border-b border-slate-100 gap-1 sm:gap-4" :class="locale === 'ar' ? 'sm:flex-row-reverse' : ''">
                <span class="font-bold text-slate-400 text-xs uppercase tracking-wider">{{ locale === 'en' ? 'Product Name' : 'اسم المنتج' }}</span>
                <span class="font-bold text-[#1e293b] text-sm md:text-base">{{ product.name_i18n?.[locale] || product.name }}</span>
              </div>
              <div class="flex flex-col sm:flex-row justify-between p-4 md:p-5 border-b border-slate-100 gap-1 sm:gap-4" :class="locale === 'ar' ? 'sm:flex-row-reverse' : ''">
                <span class="font-bold text-slate-400 text-xs uppercase tracking-wider">{{ locale === 'en' ? 'Category' : 'الفئة' }}</span>
                <span class="font-bold text-[#20CAC4] text-sm md:text-base">
                  {{ translatedCategory }}
                </span>              
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 mt-10">
            <button class="flex-grow bg-[#1e293b] hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95">
              <span>{{ locale === 'en' ? 'Download the specifications file' :' تحميل ملف المواصفات' }}</span>
              <font-awesome-icon icon="fa-solid fa-download" />
            </button>
          </div>
        </div>
      </div>

      
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { computed, ref, watch, onMounted } from 'vue'
import apiClient from '@/api/axios' 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from 'vue-i18n' 

const { locale } = useI18n() 
const route = useRoute()
const router = useRouter()
const loading = ref(true)

const categories = ref<any[]>([])
const product = ref<any>(null)
const otherProducts = ref<any[]>([])
const activeImage = ref<string>('') 

const productImages = computed(() => {
  if (!product.value) return []
  const gallery = product.value.gallery || product.value.images || []
  return gallery.length > 0 ? gallery : [product.value.image]
})

const fetchProductData = async () => {
  try {
    loading.value = true
    const productId = route.params.id

    const [prodRes, catRes, allRes] = await Promise.all([
      apiClient.get(`/products/${productId}`),
      apiClient.get('/categories'),
      apiClient.get('/products')
    ])
    
    product.value = prodRes.data?.data || null
    categories.value = catRes.data?.data || []
    
    if (product.value) {
      activeImage.value = product.value.image || ''
    }

    otherProducts.value = (allRes.data?.data || [])
      .filter((p: any) => p.id !== Number(productId))
      .slice(0, 3)

  } catch (error) {
    console.error("Error fetching product details:", error)
  } finally {
    loading.value = false
  }
}

const translatedCategory = computed(() => {
  if (!product.value) return ''
  const catName = product.value.category
  
  if (typeof catName === 'string') {
    const matched = categories.value.find(c => c.name === catName || c.name_i18n?.en === catName)
    if (matched) {
      return matched.name_i18n?.[locale.value] || matched.name
    }
  }
  return product.value.category_i18n?.[locale.value] || catName || (locale.value === 'en' ? 'Premium Dates' : 'تمور فاخرة')
})

onMounted(() => {
  fetchProductData()
})

watch(() => route.params.id, () => {
  fetchProductData()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

const getInitials = (name: string) => {
  if (!name) return ''
  return name[0].toUpperCase()
}
</script>

