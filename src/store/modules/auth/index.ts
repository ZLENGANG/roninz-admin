import { defineStore } from 'pinia';
import { router } from '@/router';

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
    toLogin() {
      const currentRoute = unref(router.currentRoute);
      router.replace({
        path: '/login',
        query: currentRoute.query,
      });
    },
  },
  persist: {
    key: 'XXX_ADIMIN_TOKEN',
  },
});
