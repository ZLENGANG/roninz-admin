import type { Router } from 'vue-router';

export const setupPageLoadingGuard = (router: Router) => {
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
