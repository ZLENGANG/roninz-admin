import { getRolePermissions } from '@/service';

export const usePermissionStore = defineStore('permission', {
  state() {
    return {
      menus: [],
      asyncPermissions: [],
    };
  },
  getters: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    permissions(): any[] {
      return [].concat(this.asyncPermissions);
    },
  },
  actions: {
    async initPermissions() {
      const { data } = await getRolePermissions();
      this.asyncPermissions = data.data;
    },
  },
});
