import type { Router } from 'vue-router';
import { setupPageLoadingGuard } from './loading';

export const setupRouterGuard = (router: Router) => {
  setupPageLoadingGuard(router);
};
