<template>
  <Dialog :open="isOpen" @update:open="$emit('close')">
    <DialogContent 
      class="w-full max-w-[480px] max-h-[90vh] overflow-y-auto rounded-[2rem] p-6 md:p-8 bg-white border-none shadow-2xl flex flex-col"
      :class="locale === 'ar' ? 'text-right' : 'text-left'"
    >
      
      <DialogHeader class="relative shrink-0">
        <DialogTitle class="text-2xl font-serif text-center mb-2">
          {{ locale === 'en' ? 'Request Service' : 'طلب خدمة' }}
        </DialogTitle>
      </DialogHeader>

      <!-- نموذج الطلب مع اتجاه تلقائي وتوزيع مسافات عمودية متناسق -->
      <form @submit.prevent="handleSubmit" class="space-y-4 flex-grow" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
        
        <div class="space-y-1.5">
          <label class="text-sm font-bold text-slate-700 mx-1">
            {{ locale === 'en' ? 'Full Name' : 'الاسم الكامل' }}
          </label>
          <input 
            v-model="formData.fullName"
            type="text" 
            required
            class="w-full bg-[#F5F7FA] border border-slate-200 rounded-2xl p-3 text-sm focus:outline-none focus:border-[#26d0ce] transition-all"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-bold text-slate-700 mx-1">
            {{ locale === 'en' ? 'Phone Number' : 'رقم الهاتف' }}
          </label>
          <input 
            v-model="formData.phone"
            type="tel" 
            required
            class="w-full bg-[#F5F7FA] border border-slate-200 rounded-2xl p-3 text-sm focus:outline-none focus:border-[#26d0ce] transition-all"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-bold text-slate-700 mx-1">
            {{ locale === 'en' ? 'Email Address' : 'البريد الإلكتروني' }}
          </label>
          <input 
            v-model="formData.email"
            type="email" 
            required
            class="w-full bg-[#F5F7FA] border border-slate-200 rounded-2xl p-3 text-sm focus:outline-none focus:border-[#26d0ce] transition-all"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-bold text-slate-700 mx-1">
            {{ locale === 'en' ? 'Country' : 'الدولة' }}
          </label>
          <select 
            v-model="formData.country"
            required
            class="w-full bg-[#F5F7FA] border border-slate-200 rounded-2xl p-3 text-sm focus:outline-none focus:border-[#26d0ce] transition-all cursor-pointer"
          >
            <option value="" disabled>{{ locale === 'en' ? 'Select Country' : 'اختر الدولة' }}</option>
            <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-bold text-slate-700 mx-1">
            {{ locale === 'en' ? 'Message' : 'الرسالة' }}
          </label>
          <textarea 
            v-model="formData.message"
            rows="3"
            required
            class="w-full bg-[#F5F7FA] border border-slate-200 rounded-2xl p-3 text-sm focus:outline-none focus:border-[#26d0ce] transition-all resize-none animate-none"
          ></textarea>
        </div>

        <div class="pt-3">
          <Button 
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-[#26d0ce] hover:bg-[#1fb5b3] text-white py-6 rounded-full text-base font-bold shadow-lg shadow-teal-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {{ isSubmitting ? (locale === 'en' ? 'Sending...' : 'جاري الإرسال...') : (locale === 'en' ? 'Confirm Request' : 'تأكيد الطلب') }}
          </Button>
        </div>

      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/api/axios'

const { locale } = useI18n()

const props = defineProps({
  isOpen: Boolean,
  serviceId: {
    type: [Number, String],
    default: 1
  }
})

const emit = defineEmits(['close'])
const isSubmitting = ref(false)

const countries = computed(() => 
  locale.value === 'en' 
    ? ['Palestine', 'Jordan', 'USA', 'UAE', 'Saudi Arabia', 'Egypt']
    : ['فلسطين', 'الأردن', 'الولايات المتحدة', 'الإمارات', 'السعودية', 'مصر']
)

const formData = ref({
  fullName: '',
  phone: '',
  email: '',
  country: '',
  message: ''
})

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    
    await apiClient.post('/service-requests', {
      service_id: props.serviceId,
      full_name: formData.value.fullName,
      phone: formData.value.phone,
      email: formData.value.email,
      country: formData.value.country,
      message: formData.value.message
    })

    alert(locale.value === 'en' ? '✅ Request submitted successfully!' : '✅ تم إرسال طلبك بنجاح!')
    
    formData.value = { fullName: '', phone: '', email: '', country: '', message: '' }
    emit('close')
  } catch (error) {
    console.error(error)
    alert(locale.value === 'en' ? '❌ Failed to send request.' : '❌ فشل إرسال الطلب.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
:deep(.fixed .right-4.top-4) {
  background: #f1f5f9;
  border-radius: 999px;
  padding: 6px;
  right: 1.5rem;
  top: 1.5rem;
  transition: all 0.2s;
}
:deep(.fixed .right-4.top-4:hover) {
  background: #e2e8f0;
}
</style>