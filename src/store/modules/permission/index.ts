import { getRolePermissions } from '@/service';
import { renderIcon } from '@/utils';
import { MenuOption } from 'naive-ui';
import { isExternal } from '@/utils';
import { RouteRecordRaw } from 'vue-router';

const routeComponents = import.meta.glob('@/views/**/*.vue');

interface RoleTree {
  id: number | string;
  name: string; // 菜单名或按钮名
  code: string; // 权限唯一标识
  type: 'MENU' | 'BUTTON'; // 类型，菜单或按钮
  parentId: number | string;
  path: string; // 路由
  redirect: string; // 重定向路径
  icon: string; // 图标
  component: string; // 组件路径
  layout: 'default' | 'empty'; // 布局类型
  keepAlive: boolean; // 是否缓存页面
  // method: string;
  // description: string;
  show: boolean; // 是否展示
  enable: boolean; // 是否启用
  order: number; // 顺序
  children: RoleTree[];
}
type NewMenuOption = MenuOption & {
  order?: number;
};

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
      return this.asyncPermissions || [];
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
      if (item.enable && route.path && !isExternal(route.path)) {
        this.accessRoutes.push(route);
      }
      if (!item.show) return null;
      const menuItem: NewMenuOption = {
        label: route.meta?.title,
        key: route.name as NewMenuOption['key'],
        path: route.path,
        icon: renderIcon(route.meta?.icon || ''),
        order: item.order ?? 0,
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
        path: item.path,
        redirect: item.redirect,
        component: routeComponents[item.component] || undefined,
        meta: {
          icon: item.icon,
          title: item.name,
          layout: item.layout || 'default',
          keepAlive: !!item.keepAlive,
          parentKey,
          btns: item.children
            ?.filter((item) => item.type === 'BUTTON')
            .map((item) => ({ code: item.code, name: item.name })),
        },
      };
    },
  },
});
