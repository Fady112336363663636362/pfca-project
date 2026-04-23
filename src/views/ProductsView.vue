<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const products = ref([
  { id: 1, title: 'Premium Jumbo Medjool', category: 'Medjool Dates', subCategory: 'Jumbo', image: 'https://images.unsplash.com/photo-1594488687126-7d3d1fef53c4?q=80&w=600', desc: 'Our finest hand-selected Jumbo Medjool dates.' },
  { id: 2, title: 'Large Select Medjool', category: 'Medjool Dates', subCategory: 'Large', image: 'https://images.unsplash.com/photo-1501333313041-195abc4429fa?q=80&w=600', desc: 'Perfect for retail and wholesale distribution.' },
  { id: 3, title: 'Fresh Golden Barhi', category: 'Barhi Dates', subCategory: 'Fresh', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=600', desc: 'Seasonal fresh Barhi dates with honey-like sweetness.' },
  { id: 1, title: 'Premium Jumbo Medjool', category: 'Medjool Dates', subCategory: 'Jumbo', image: 'https://images.unsplash.com/photo-1594488687126-7d3d1fef53c4?q=80&w=600', desc: 'Our finest hand-selected Jumbo Medjool dates.' },
  { id: 2, title: 'Large Select Medjool', category: 'Medjool Dates', subCategory: 'Large', image: 'https://images.unsplash.com/photo-1501333313041-195abc4429fa?q=80&w=600', desc: 'Perfect for retail and wholesale distribution.' },
  { id: 3, title: 'Fresh Golden Barhi', category: 'Barhi Dates', subCategory: 'Fresh', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=600', desc: 'Seasonal fresh Barhi dates with honey-like sweetness.' },
  { id: 1, title: 'Premium Jumbo Medjool', category: 'Medjool Dates', subCategory: 'Jumbo', image: 'https://images.unsplash.com/photo-1594488687126-7d3d1fef53c4?q=80&w=600', desc: 'Our finest hand-selected Jumbo Medjool dates.' },
  { id: 2, title: 'Large Select Medjool', category: 'Medjool Dates', subCategory: 'Large', image: 'https://images.unsplash.com/photo-1501333313041-195abc4429fa?q=80&w=600', desc: 'Perfect for retail and wholesale distribution.' },
  { id: 3, title: 'Fresh Golden Barhi', category: 'Barhi Dates', subCategory: 'Fresh', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=600', desc: 'Seasonal fresh Barhi dates with honey-like sweetness.' },
])

const categories = [
  { name: 'Medjool Dates', sub: ['Jumbo', 'Large', 'Medium', 'Industrial Grade'] },
  { name: 'Barhi Dates', sub: ['Fresh (Rutab)', 'Dried (Tamr)'] },
  { name: 'Gift Boxes', sub: ['Premium Collection', 'Corporate Gifts', 'Seasonal'] }
]

const selectedCategory = ref('All')
const selectedSub = ref('')

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'All') return products.value
  return products.value.filter(p => {
    const matchCat = p.category === selectedCategory.value
    const matchSub = selectedSub.value ? p.subCategory === selectedSub.value : true
    return matchCat && matchSub
  })
})

const setFilter = (cat: string, sub: string = '') => {
  selectedCategory.value = cat
  selectedSub.value = sub
}
</script>

<template>
  <div class="min-h-screen bg-[#F5F7FA]">
      <section class=" bg-[#293043] pt-20 mb-12 text-white">
      <div class="container mx-auto px-6   justify-center items-center flex flex-col lg:flex-row gap-12">
        <div class="max-w-2xl space-y-6 text-center lg:text-center">
          <h1 class="text-6xl md:text-[45px] pt-10 font-bold font-serif  leading-tight ">
Premium Date Products
          </h1>
          <p class="text-xl pb-15 text-slate-300 font-light ">
Discover our full range of premium dates.

          </p>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-25">

      <div class="flex flex-col lg:flex-row gap-10">
        

        <aside class="w-full lg:w-72 space-y-6">
          <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h3 class="text-xl font-bold text-[#1e293b] font-serif mb-6">Sort by Category</h3>
            

            <button 
              @click="setFilter('All')"
              :class="selectedCategory === 'All' ? 'bg-teal-50 text-[#26d0ce]' : 'text-slate-600'"
              class="w-full text-left px-4 py-3 rounded-xl font-bold transition-all mb-4"
            >
              All Categories
            </button>

            <Accordion type="single" collapsible class="w-full">
              <AccordionItem v-for="cat in categories" :key="cat.name" :value="cat.name" class="border-none">
                <AccordionTrigger class="hover:no-underline py-3 px-4 text-slate-700 font-bold text-sm">
                  {{ cat.name }}
                </AccordionTrigger>
                <AccordionContent class="pb-2">
                  <div class="flex flex-col space-y-1 pl-4 border-l-2 border-teal-100 ml-4">
                    <button 
                      v-for="sub in cat.sub" :key="sub"
                      @click="setFilter(cat.name, sub)"
                      class="text-left py-2 px-3 text-sm text-slate-500 hover:text-[#26d0ce] transition-colors rounded-lg"
                      :class="{'text-[#26d0ce] font-bold bg-teal-50': selectedSub === sub}"
                    >
                      {{ sub }}
                    </button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </aside>


        <main class="flex-grow">
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <RouterLink 
              v-for="product in filteredProducts" :key="product.id"
              :to="'/product/' + product.id"
              class="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-50"
            >
              <div class="relative h-64 overflow-hidden">
                <img :src="product.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span class="absolute top-4 left-4 bg-[#1e293b]/80 backdrop-blur-sm text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {{ product.category }}
                </span>
              </div>
              <div class="p-8 space-y-4 text-left">
                <h3 class="text-xl font-bold text-[#1e293b] leading-tight group-hover:text-[#26d0ce] transition-colors">
                  {{ product.title }}
                </h3>
                <p class="text-slate-500 text-sm font-light leading-relaxed">{{ product.desc }}</p>
              </div>
            </RouterLink>
          </div>
        </main>

      </div>
    </div>
  </div>
</template>