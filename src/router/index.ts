import { createRouter, createWebHashHistory } from 'vue-router';
import { baseRoutes } from './routes';
import { setupRouterGuard } from './guard';
import { App } from 'vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: baseRoutes,
});

export function setupRouter(app: App) {
  setupRouterGuard(router);
  app.use(router);
}
