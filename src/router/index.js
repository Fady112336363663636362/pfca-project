import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/our-projects',
      name: 'projects',
      component: () => import('../views/OurProjects.vue') 
    },
     {
      path: '/project/:id', // هذا المسار الذي يفتح التفاصيل
      name: 'ProjectDetails',
      component: () => import('../views/ProjectDetailsView.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/News.vue') 
    },
    {
      path: '/partners',
      name: 'partners',
      component: () => import('../views/partners.vue') 
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactUs.vue') 
    },
  { path: '/product/:id', name: 'product-details', component: () => import('../views/ProductDetailsView.vue') },

    {
      path: '/news/:id',
      name: 'NewsDetails',
      component: () => import('../views/NewsDetailsView.vue')
    },
    {
      path: '/partner/:id',
      name: 'PartnerDetails',
      component: () => import('../views/PartnerDetailsView.vue')
    },
    {
      path: '/distributor',
      name: 'DistributorDetails',
      component: () => import('../views/Distributor.vue')
    },
    {
      path: '/knowledge-guide',
      name: 'knowledge-guide',
      component: () => import('../views/KnowledgeGuide.vue')
    },
    {
      path: '/date-exporters',
      name: 'date-exporters',
      component: () => import('../views/DateExporters.vue')
    }
  ]
})

export default router