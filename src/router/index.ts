import { createRouter, createWebHashHistory } from 'vue-router';
import { baseRoutes } from './routes';
import { setupRouterGuard } from './guard';
import { App } from 'vue';
import { useAuthStore, useUserStore, usePermissionStore } from '@/store';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: baseRoutes,
});

export async function setupRouter(app: App) {
  try {
    await initUserAndPermissions();
  } catch (error) {
    console.error('🚀 初始化失败', error);
  }
  setupRouterGuard(router);
  app.use(router);
}

export async function initUserAndPermissions() {
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();

  if (!authStore.accessToken) {
    authStore.toLogin();
    return;
  }

  await Promise.all([userStore.getUserInfo(), permissionStore.initPermissions()]);
}
