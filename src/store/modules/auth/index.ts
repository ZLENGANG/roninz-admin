import { defineStore } from 'pinia';
import { router } from '@/router';
import { usePermissionStore, useTagsStore, useUserStore } from '@/store';

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      accessToken: '',
    };
  },

  actions: {
    setToken(token: string) {
      this.accessToken = token;
    },
    resetToken() {
      this.$reset();
    },
    toLogin() {
      const currentRoute = unref(router.currentRoute);
      router.replace({
        path: '/login',
        query: currentRoute.query,
      });
    },
    resetLoginState() {
      const { resetUser } = useUserStore();
      const { resetPermission } = usePermissionStore();
      const { resetTags } = useTagsStore();
      // 重置用户
      resetUser();
      // 重置权限
      resetPermission();
      // 重置Tags
      resetTags();
      // 重置路由
      // resetRouter();
      // 重置token
      this.resetToken();
    },
    logout() {
      this.resetLoginState();
      this.toLogin();
    },
  },
  persist: {
    key: 'XXX_ADIMIN_TOKEN',
  },
});
