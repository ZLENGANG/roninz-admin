import { Router } from 'vue-router';
import { useAuthStore } from '@/store';

const WHITE_LIST = ['/login', '/404'];

export const createPagePermissionGuard = (router: Router): void => {
  router.beforeEach((to) => {
    const authStore = useAuthStore();
    const token = authStore.accessToken;

    // 没有token
    if (!token) {
      if (WHITE_LIST.includes(to.path)) return true;
      return { path: '/login', query: { ...to.query, redirect: to.path } };
    }

    // 有token
    if (to.path === '/login') return { path: '/' };
    if (WHITE_LIST.includes(to.path)) return true;

    // 获取动态路由
    const routes = router.getRoutes();
    if (routes.find((route) => route.name === to.name)) return true;

    // return hasMenu
    //   ? { name: '403', query: { path: to.fullPath }, state: { from: 'permission-guard' } }
    //   : { name: '404', query: { path: to.fullPath } };
    return { name: '404', query: { path: to.fullPath } };
  });
};
