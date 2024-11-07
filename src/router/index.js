import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import List from '@/views/ListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: List,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/ListView.vue'),
    },
  ],
})

export default router
