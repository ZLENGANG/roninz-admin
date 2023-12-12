import { Router } from 'vue-router';
import { getToken, isNullOrWhitespace, refreshToken } from '@/utils';

export const createPagePermissionGuard = (router: Router): void => {
  router.beforeEach((to) => {
    const token = getToken();

    if (isNullOrWhitespace(token)) {
      if (to.meta.noNeedLogin) return true;
      return { path: '/login', query: { ...to.query, redirect: to.path } };
    }

    /** 有token的情况 */
    if (to.path === '/login') return { path: '/' };
    refreshToken();
    return true;
  });
};
