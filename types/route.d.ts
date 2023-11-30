export declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    noNeedLogin?: boolean;
    icon?: string;
    innerLink?: string;
  }

  interface RouteRecordSingleViewWithChildren {
    children?: RouteRecordRaw[];
  }
}
