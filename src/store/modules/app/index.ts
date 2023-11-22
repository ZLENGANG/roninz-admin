import { useDark } from '@vueuse/core';

const isDark = useDark();

export const useAppStore = defineStore('app', {
  state() {
    return {
      isDark,
    };
  },
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
    },
  },
});
