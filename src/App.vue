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
</style>