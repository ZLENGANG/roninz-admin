import '@/views/index/index.vue';

export const baseRoutes = [
  {
    path: '/',
    component: () => import('@/views/index/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/stock',
    component: () => import('@/views/stock/index.vue'),
    meta: {
      title: '随机股票',
    },
  },
];
