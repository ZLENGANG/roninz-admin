import { Router } from 'vue-router';
const { VITE_APP_NAME } = import.meta.env;

export const createPageTitleGuard = (router: Router) => {
  router.afterEach((to) => {
    const pageTitle = to.meta?.title;
    if (pageTitle) {
      document.title = `${VITE_APP_NAME} | ${pageTitle}`;
    } else {
      document.title = VITE_APP_NAME;
    }
  });
};
