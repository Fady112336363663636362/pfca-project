<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-30">
      
      <div class="text-center mb-16">
        <h2 class="text-4xl font-serif   text-[#1e293b] mb-4">Premium Date Collections</h2>
        <p class="text-slate-500 max-w-2xl mx-auto">
          Explore our diverse range of premium dates, each cultivated with care and expertise.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <RouterLink
        to="products" 
          v-for="(item, index) in collections" 
          :key="index"
          class="group bg-[#F5F7FA] rounded-[2rem] overflow-hidden flex flex-col shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 cursor-pointer"
        >
          <div class="relative h-64 w-full overflow-hidden">
            <img 
              :src="item.image" 
              :alt="item.title" 
              class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <h3 class="text-2xl font-serif  text-white transition-transform duration-500 group-hover:translate-x-2">
                {{ item.title }}
              </h3>
            </div>
          </div>

          <div class="p-6 pt-5 space-y-4">
            <p class="text-slate-500 text-[15px] leading-relaxed">
              {{ item.description }}
            </p>
            
            <div class="flex flex-wrap gap-2 pt-2">
              <span 
                v-for="(tag, tIndex) in item.tags" 
                :key="tIndex"
                class="bg-white border border-slate-100 text-slate-700 text-sm px-4 py-1.5 rounded-2xl shadow-sm cursor-default hover:border-teal-400 transition-colors"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const collections = ref([
  {
    title: "Fresh Premium Dates",
    description: "Medjool, Barhi, and seasonal fresh varieties",
    image: "https://images.unsplash.com/photo-1594488687126-7d3d1fef53c4?q=80&w=800",
    tags: ["Medjool Jumbo", "Medjool Premium", "Barhi Fresh"]
  },
  {
    title: "Date Products",
    description: "Syrup, paste, stuffed dates, and more",
    image: "https://images.unsplash.com/photo-1501333313041-195abc4429fa?q=80&w=800",
    tags: ["Date Syrup", "Date Paste", "Stuffed Dates"]
  },
  {
    title: "Gift & Luxury Collections",
    description: "Elegant gift boxes for corporate and special occasions",
    image: "https://images.unsplash.com/photo-1543157145-f78c636d023d?q=80&w=800",
    tags: ["Corporate Gift Box", "Premium Assortment", "Barhi Fresh"]
  }
])
</script>