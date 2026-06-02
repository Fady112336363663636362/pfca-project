
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Our Services',
      products: 'Our Products',
      projects: 'Our Projects',
      news: 'News & Events',
      partners: 'Success Partners',
      contact: 'Contact Us',
    },
    lang: 'العربية'
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      products: 'منتجاتنا',
      projects: 'مشاريعنا',
      news: 'الأخبار والفعاليات',
      partners: 'شركاء النجاح',
      contact: 'اتصل بنا',
    },
    lang: 'English'
  }
};

const i18n = createI18n({
  legacy: false, 
  locale: localStorage.getItem('lang') || 'en', 
  fallbackLocale: 'en',
  messages,
});

export default i18n;