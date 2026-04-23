<template>
  <div class="flex flex-col min-h-screen">
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