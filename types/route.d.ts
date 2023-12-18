export declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    noNeedLogin?: boolean;
    icon?: string;
    innerLink?: string;
    keepAlive?: boolean;
    layout?: 'default' | 'empty';
    parentKey?: MenuOption['key'];
    btns?: { code: string; name: string }[];
  }

  interface RouteRecordSingleViewWithChildren {
    children?: RouteRecordRaw[];
  }
}
