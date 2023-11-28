import { useDark } from '@vueuse/core';

const isDark = useDark();

export const useAppStore = defineStore('app', {
  state() {
    return {
      isDark,
      isCollapsed: false,
    };
  },
  actions: {
    toggleCollapsed() {
      this.isCollapsed = !this.isCollapsed;
    },
    toggleTheme() {
      this.isDark = !this.isDark;
    },
  },
});
