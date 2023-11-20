import '@/views/index/index.vue';
import { RouteRecordRaw } from 'vue-router';

export const baseRoutes: RouteRecordRaw[] = [
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
      noNeedLogin: true,
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
