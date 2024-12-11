import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MainLayout from '../layouts/MainLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/explore',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'Explore',
          component: () => import('../views/ExploreView.vue'),
        }
      ]
    }
  ],
})

export default router
