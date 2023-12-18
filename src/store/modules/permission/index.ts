import { getRolePermissions } from '@/service';
import { renderIcon } from '@/utils';
import { isExternal } from '@/utils';
import { RouteMeta, RouteRecordRaw } from 'vue-router';
import { basePermissions } from './base';

const routeComponents = import.meta.glob('@/views/**/*.vue');

interface PermissionState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menus: NewMenuOption[] | any[];
  asyncPermissions: RoleTree[];
  accessRoutes: RouteRecordRaw[];
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => {
    return {
      menus: [],
      asyncPermissions: [],
      accessRoutes: [],
    };
  },
  getters: {
    permissions(): RoleTree[] {
      return basePermissions.concat(this.asyncPermissions) || [];
    },
  },
  actions: {
    async initPermissions() {
      const { data } = await getRolePermissions();
      this.asyncPermissions = data.data;
      this.menus = this.permissions
        .filter((item) => item.type === 'MENU')
        .map((item) => this.getMenuItem(item))
        .filter((item) => !!item)
        .sort((a, b) => (a?.order as number) - (b?.order as number));
    },

    getMenuItem(item: RoleTree, parent?: NewMenuOption): NewMenuOption | null {
      const route = this.generateRoute(item, item.show ? undefined : parent?.key);
      if (item.enable && route.path && (item.innerLink || !isExternal(route.path))) {
        this.accessRoutes.push(route);
      }
      if (!item.show || item.layout === 'empty') return null;
      const menuItem: NewMenuOption = {
        label: route.meta?.title,
        key: route.name as NewMenuOption['key'],
        path: route.path,
        icon: renderIcon(route.meta?.icon || ''),
        order: item.order ?? 0,
        disabled: !item.enable,
      };
      const children = item.children?.filter((item) => item.type === 'MENU') || [];
      if (children.length) {
        menuItem.children = children
          .map((child) => this.getMenuItem(child, menuItem))
          .filter((item) => !!item)
          .sort((a, b) => (a?.order as number) - (b?.order as number)) as NewMenuOption[];
        if (!menuItem.children?.length) delete menuItem.children;
      }
      return menuItem;
    },

    generateRoute(item: RoleTree, parentKey?: NewMenuOption['key']): RouteRecordRaw {
      return {
        name: item.code,
        path: item.path || '',
        redirect: item.redirect,
        component: this.getComponent(item),
        meta: {
          icon: item.icon,
          title: item.name || '',
          layout: item.layout || 'default',
          keepAlive: !!item.keepAlive,
          parentKey,
          innerLink: item.innerLink,
          btns: item.children
            ?.filter((item) => item.type === 'BUTTON')
            .map((item) => ({ code: item.code, name: item.name })) as RouteMeta['btns'],
        },
      };
    },

    getComponent(item: RoleTree): Component | undefined {
      if (item.innerLink) {
        return markRaw(() => import(`@/components/common/app-iframe.vue`));
      }
      if (item.component) {
        return routeComponents[item.component];
      }

      return undefined;
    },

    resetPermission() {
      this.$reset();
    },
  },
});
