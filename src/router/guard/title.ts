import { Router } from 'vue-router';
import { APP_TITLE } from '~/settings';

export const createPageTitleGuard = (router: Router) => {
  router.afterEach((to) => {
    const pageTitle = to.meta?.title;
    if (pageTitle) {
      document.title = `${APP_TITLE} | ${pageTitle}`;
    } else {
      document.title = APP_TITLE;
    }
  });
};
