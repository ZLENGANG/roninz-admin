export declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    noNeedLogin?: boolean;
    icon?: string;
  }

  interface RouteRecordSingleViewWithChildren {
    children?: RouteRecordRaw[];
  }
}
