import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: Layout,
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import('@/views/Home')
        }
      ]
    }
  ]
});

export default router;
