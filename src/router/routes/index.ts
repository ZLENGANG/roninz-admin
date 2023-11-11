import '@/views/index/index.vue';

export const baseRoutes = [
  { path: '/', component: () => import('@/views/index/index.vue') },
  { path: '/login', component: () => import('@/views/login/index.vue') },
];
