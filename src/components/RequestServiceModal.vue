<script setup lang="ts">
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'

defineProps(['isOpen'])
const emit = defineEmits(['close'])

const countries = ['Palestine', 'Jordan', 'USA', 'UAE', 'Saudi Arabia', 'Egypt']
const formData = ref({
  fullName: '',
  phone: '',
  email: '',
  country: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Form Submitted:', formData.value)
  emit('close')
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="$emit('close') ">
    <DialogContent class="sm:max-w-[470px] rounded-[2rem] p-6 bg-white border-none shadow-2xl">
      
      <DialogHeader class="relative">
        <DialogTitle class="text-2xl font-serif  text-center mb-6">
          Request Service
        </DialogTitle>
      </DialogHeader>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        
        <div class="space-y-2 text-left">
          <label class="text-sm font-bold text-slate-700 ml-1">Full Name</label>
          <input 
            v-model="formData.fullName"
            type="text" 
            placeholder=""
            class="w-full bg-[#F5F7FA] border border-slate-200 rounded-2xl p-3 focus:outline-none focus:border-[#26d0ce] transition-all"
          />
        </div>

        <div class="space-y-2 text-left">
          <label class="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
          <input 
            v-model="formData.phone"
            type="tel" 
            class="w-full bg-[#F5F7FA] border border-slate-200 rounded-2xl p-3 focus:outline-none focus:border-[#26d0ce] transition-all"
          />
        </div>

        <div class="space-y-2 text-left">
          <label class="text-sm font-bold text-slate-700 ml-1">Email Address</label>
          <input 
            v-model="formData.email"
            type="email" 
            class="w-full bg-[#F5F7FA] border border-slate-200 rounded-2xl p-3 focus:outline-none focus:border-[#26d0ce] transition-all"
          />
        </div>

        <div class="space-y-1 text-left">
          <label class="text-sm font-bold text-slate-700 ml-1">Country</label>
          <select 
            v-model="formData.country"
            class="w-full bg-[#F5F7FA] border border-slate-200 rounded-2xl p-3 focus:outline-none focus:border-[#26d0ce] transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled selected>Select Country</option>
            <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <div class="space-y-1 text-left">
          <label class="text-sm font-bold text-slate-700 ml-1">Message</label>
          <textarea 
            v-model="formData.message"
            rows="4"
            class="w-full bg-[#F5F7FA] border border-slate-200 rounded-2xl p-1 focus:outline-none focus:border-[#26d0ce] transition-all resize-none"
          ></textarea>
        </div>

        <div class="pt-2">
          <Button 
            type="submit"
            class="w-full bg-[#26d0ce] hover:bg-[#1fb5b3] text-white py-7 rounded-full text-lg font-bold shadow-lg shadow-teal-500/30 transition-all active:scale-[0.98]"
          >
            Confirm Request
          </Button>
        </div>

      </form>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
:deep(.fixed .right-4.top-4) {
  background: #f1f5f9;
  border-radius: 999px;
  padding: 4px;
  right: 2rem;
  top: 2rem;
}
</style>