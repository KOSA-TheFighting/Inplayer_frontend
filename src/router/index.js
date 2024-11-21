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
      component: HomeView,
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/views/ListView.vue'),
    },
    {
      path: '/broadcast/:stream_id',
      name: 'broadcast',
      component: () => import('@/views/BroadcastView.vue'),
    },
    {
      path: '/mychannel/:member_id',
      name: 'mychannel',
      component: () => import('@/views/MychannelView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { hideLayout: true },
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('@/views/CategoryView.vue'),
      children: [
        {
          path: ':name',
          name: 'category-stream-list',
          component: () => import('@/components/stream/StreamList.vue'),
        },
      ],
    },
    {
      path: '/searchResults/',
      name: 'searchResults',
      component: () => import('@/views/SearchResultsView.vue'),
    },
    {
      path: '/oauth/kakao',
      name: 'oauth_kakao',
      component: () => import('@/views/KakaoView.vue'),
    },
    {
      path: '/announcement',
      name: 'announcementlist',
      component: () => import('@/views/AnnouncementList.vue'),
    },
    {
      path: '/announcement/:id',
      name: 'announcementdetail',
      component: () => import('@/views/AnnouncementDetail.vue'),
      props: true, // URL 파라미터를 컴포넌트의 props로 전달
    },


  ],
})

export default router
