<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { watch } from 'vue'

const route = useRoute()
const activeImg = ref(0)

// مثال لبيانات منتج واحد (سيتم جلبه بالـ ID)
const product = {
  title: 'Premium Jumbo Medjool',
  category: 'Medjool Dates',
  description: 'Our finest hand-selected Jumbo Medjool dates from the Jordan Valley. Each date is carefully picked at perfect ripeness, offering a rich caramel flavor.',
  images: [
    'https://images.unsplash.com/photo-1594488687126-7d3d1fef53c4?q=80&w=800',
    'https://images.unsplash.com/photo-1501333313041-195abc4429fa?q=80&w=800',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800',
    'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=800'
  ],
  specs: [
    { label: 'Weight', value: '250g / 500g / 1kg / 5kg' },
    { label: 'Characteristics', value: 'Rich caramel, soft, naturally sweet' },
    { label: 'Packaging', value: 'Clamshell / Carton box / Bulk' },
    { label: 'Minimum Order Quantity', value: '500 kg per order' }
  ]
}

const allProducts = [
  { id: 1, title: 'Premium Jumbo Medjool', desc: 'Our finest hand-selected Jumbo dates.', image: 'https://images.unsplash.com/photo-1594488687126-7d3d1fef53c4?q=80&w=600' },
  { id: 2, title: 'Fresh Golden Barhi', desc: 'Seasonal fresh Barhi dates.', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=600' },
  { id: 3, title: 'Royal Gift Box', desc: 'Luxury date assortment in wooden box.', image: 'https://images.unsplash.com/photo-1543157145-f78c636d023d?q=80&w=600' },
  { id: 4, title: 'Almond Stuffed Dates', desc: 'Premium dates with roasted almonds.', image: 'https://images.unsplash.com/photo-1501333313041-195abc4429fa?q=80&w=600' },
]

const relatedProducts = computed(() => {
  const currentId = Number(route.params.id)
  return allProducts.filter(p => p.id !== currentId).slice(0, 3)
})


watch(() => route.params.id, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<template>
  <div class="min-h-screen bg-[#F5F7FA] pt-25 px-20 pb-20 font-sans">
    <div class="container mx-auto px-6">
      
      <nav class="flex gap-2 text-sm text-slate-400 mb-10">
        <RouterLink to="/">Home</RouterLink> / 
        <RouterLink to="/products">Our Products</RouterLink> / 
        <span class="text-[#26d0ce] font-bold">{{ product.title }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        <div class="space-y-6">
          <div class="rounded-[3rem] overflow-hidden shadow-2xl aspect-square border border-slate-100 bg-[#F5F7FA]">
            <img :src="product.images[activeImg]" class="w-full h-full object-cover animate-in fade-in duration-500" />
          </div>
          <div class="grid grid-cols-4 gap-4">
            <button 
              v-for="(img, i) in product.images" :key="i"
              @click="activeImg = i"
              class="rounded-2xl overflow-hidden aspect-square border-4 transition-all"
              :class="activeImg === i ? 'border-[#26d0ce]' : 'border-transparent opacity-60 hover:opacity-100'"
            >
              <img :src="img" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <div class="space-y-10 text-left">
          <div class="space-y-4">
            <span class="bg-[#DDF1F3] text-[#26d0ce]  py-1 p-2 rounded-full text-xs font-bold uppercase tracking-widest">
              {{ product.category }}
            </span>
            <h1 class="text-4xl font-bold text-[#1e293b] mt-5 font-serif tracking-tight">{{ product.title }}</h1>
            <p class="text-lg text-slate-500 leading-relaxed font-light">{{ product.description }}</p>
          </div>

          <div class="space-y-6">
            <h3 class="text-xl font-bold text-[#1e293b]">

                Specifications </h3>
            <div class="bg-white rounded-[2rem] overflow-hidden border border-slate-100">
              <div v-for="(spec, i) in product.specs" :key="i" 
                   class="flex justify-between p-5 border-b border-slate-200 last:border-none  transition-colors">
                <span class="font-bold text-slate-500">{{ spec.label }}</span>
                <span class="font-bold text-[#1e293b] text-right">{{ spec.value }}</span>
              </div>
            </div>
          </div>



<div class="flex flex-col sm:flex-row gap-4 mt-10">
  
  <button class="bg-[#20CAC4] hover:bg-[#1db1ab] text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-[#20CAC4]/20 transition-all flex items-center justify-center gap-3 active:scale-95">
    <font-awesome-icon icon="fa-solid fa-comment-dots" class="text-lg" />
    <span>Request Quote</span>
  </button>

  <button class="px-10 py-4 rounded-full border-2 border-slate-200 text-[#1e293b] font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-95">
    <font-awesome-icon icon="fa-solid fa-download" class="text-lx" />
    <span>Download Specs PDF</span>
  </button>

</div>
        </div>




      </div>
    </div>
     <section class="py-24 border-t border-slate-100 mt-20">
      
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-[#1e293b] font-serif tracking-tight ">Related Products</h2>
        <RouterLink 
          to="/products" 
          class="text-[#0ABAB5] font-bold flex items-center gap-2 hover:gap-3 transition-all group"
        >
          View All 
          <font-awesome-icon icon="fa-solid fa-arrow-right" class="text-sm transition-transform group-hover:translate-x-1" />
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <RouterLink 
          v-for="item in relatedProducts" 
          :key="item.id"
          :to="'/product/' + item.id"
          class="group bg-white rounded-[1rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-50 flex flex-col"
        >
          <div class="relative h-64 overflow-hidden">
            <img 
               class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          </div>

          <div class="p-8 space-y-3">
            <h3 class="text-lg font-bold text-[#1e293b] leading-tight group-hover:text-[#0ABAB5] transition-colors font-serif ">
              {{ item.title }}
            </h3>
            <p class="text-slate-500 text-sm leading-relaxed font-light">
              {{ item.desc }}
            </p>
          </div>
        </RouterLink>
      </div>

    </section>
  </div>
</template>