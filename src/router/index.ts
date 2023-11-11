import { createRouter, createWebHashHistory } from 'vue-router';
import { baseRoutes } from './routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes: baseRoutes,
});

export default router;
