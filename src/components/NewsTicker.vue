<template>
  <div class="bg-[#1e293b] py-3 overflow-hidden border-y border-slate-700 flex ">
    
    <div class="flex whitespace-nowrap animate-marquee">
      <div v-for="n in 2" :key="n" class="flex items-center">
        <div v-for="(item, index) in newsItems" :key="index" class="flex items-center mx-10 ">
          <span class="text-zinc-300 text-sm  md:text-sm font-medium">
            {{ item }}
          </span>
          <div class="w-1 h-1 bg-teal-400 rounded-full mx-6"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
const newsItems = [
  "PFCA Launches Sustainable Water Management Initiative",
  "Record Medjool Harvest Season for 2025",
  "PFCA at Gulfood 2026",
  "PFCA Expands to European Organic Markets",
  "PFCA Launches Sustainable Water Management Initiative",
  "Record Medjool Harvest Season for 2025",
  "PFCA at Gulfood 2026",
  "PFCA Expands to European Organic Markets"
]
</script>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  display: inline-flex;
  animation: marquee 30s linear infinite;
}
</style>