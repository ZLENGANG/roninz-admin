export declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    noNeedLogin?: boolean;
    icon?: string;
    innerLink?: string;
    keepAlive?: boolean;
  }

  interface RouteRecordSingleViewWithChildren {
    children?: RouteRecordRaw[];
  }
}
