import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home', // 기본 경로를 '/home'으로 리다이렉트
    },

    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/ListView.vue'),
    },
    {
      path: '/broadcast',
      name: 'broadcast',
      component: () => import('../views/BroadcastView.vue'),
    },
  ],
})

export default router
