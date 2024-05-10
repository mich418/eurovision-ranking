import { createRouter, createWebHistory } from 'vue-router'
import FinalView from '../views/FinalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: FinalView
    }
  ]
})

export default router
