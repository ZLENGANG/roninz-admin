import { createRouter, createWebHashHistory } from 'vue-router';
import { baseRoutes } from './routes';
import { setupRouterGuard } from './guard';
import { App } from 'vue';
import { getToken, isNullOrWhitespace } from '@/utils';
import { usePermission, useUserStore } from '@/store';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: baseRoutes,
});

export async function setupRouter(app: App) {
  addDynamicRoutes();
  setupRouterGuard(router);
  app.use(router);
}

const addDynamicRoutes = async () => {
  const token = getToken();
  if (isNullOrWhitespace(token)) {
    return;
  }

  try {
    const userStore = useUserStore();
    const permissionStore = usePermission();

    !userStore.userId && (await userStore.getUserInfo());
    const accessRoutes = permissionStore.generateRoutes(userStore.roles);
  } catch (error) {}
};
