import type { Router } from 'vue-router';

export const createPageLoadingGuard = (router: Router): void => {
  router.beforeEach(() => {
    window.$loadingBar?.start();
  });

  router.afterEach(() => {
    window.$loadingBar?.finish();
  });

  router.onError(() => {
    window.$loadingBar?.error();
  });
};
