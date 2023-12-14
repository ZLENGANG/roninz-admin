import { DialogProviderInst, LoadingBarProviderInst, MessageProviderInst, NotificationProviderInst } from 'naive-ui';

declare global {
  interface Window {
    $loadingBar?: LoadingBarProviderInst;
    $dialog?: DialogProviderInst;
    $message?: MessageProviderInst;
    $notification?: NotificationProviderInst;
  }

  interface RouteTag extends Pick<RouteLocationNormalizedLoaded, 'meta' | 'path' | 'name'> {}

  type NewMenuOption = MenuOption & {
    order?: number;
    path?: string;
  };

  interface RoleTree {
    id?: number | string;
    name?: string; // 菜单名或按钮名
    code: string; // 权限唯一标识
    type?: 'MENU' | 'BUTTON'; // 类型，菜单或按钮
    parentId?: number | string;
    path?: string; // 路由
    redirect?: string; // 重定向路径
    icon?: string; // 图标
    component?: string; // 组件路径
    layout?: 'default' | 'empty'; // 布局类型
    keepAlive?: boolean; // 是否缓存页面
    show?: boolean; // 是否展示
    enable?: boolean; // 是否启用
    order?: number; // 顺序
    children?: RoleTree[];
    innerLink?: string; // 内链链接
  }
}
