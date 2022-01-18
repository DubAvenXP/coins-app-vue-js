import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/coin/:id',
    name: 'coin-detail',
    component: () => import(/* webpackChunkName: "coin-detail" */ '../views/CoinDetail.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: () => import(/* webpackChunkName: "error" */ '../views/Error.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
