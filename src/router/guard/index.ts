import type { Router } from 'vue-router';
import { createPageLoadingGuard } from './loading';
import { createPageTitleGuard } from './title';

export const setupRouterGuard = (router: Router) => {
  createPageLoadingGuard(router);
  createPageTitleGuard(router);
};
