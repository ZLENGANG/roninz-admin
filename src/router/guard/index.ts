import type { Router } from 'vue-router';
import { createPageLoadingGuard } from './loading';
import { createPageTitleGuard } from './title';
import { createPagePermissionGuard } from './permission';

export const setupRouterGuard = (router: Router) => {
  createPageLoadingGuard(router);
  createPageTitleGuard(router);
  createPagePermissionGuard(router);
};
