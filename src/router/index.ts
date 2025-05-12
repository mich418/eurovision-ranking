import { createRouter, createWebHistory } from 'vue-router'
import StagesView from '@/views/StagesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StagesView
    }
  ]
})

export default router
