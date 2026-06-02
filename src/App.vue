<template>
  <!-- الحاوية الرئيسية للموقع -->
  <div class="flex flex-col min-h-screen max-w-full overflow-x-hidden">
    <Navbar />

    <main class="flex-grow">  
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<style>
html, 
body, 
#app {
  width: 100% !important;
  max-width: 100% !important;
  overflow-x: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
  background-color: #F8FAFC; 
}
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap');

/* 2. توحيد خط Cairo على جميع نصوص وعناصر الموقع بلا استثناء */
html, 
body, 
#app,
* {
  font-family: 'Cairo', sans-serif !important;
}

/* 3. إلغاء الخط السيريف القديم (serif) وتحويله تلقائياً لـ Cairo في السلايدر والعناوين */
.font-serif,
h1,
h2,
h3,
h4,
span,
p {
  font-family: 'Cairo', sans-serif !important;
}
</style>