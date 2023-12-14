import { router } from '@/router';

// 获取当前页面的按钮权限
export const getCurRoutePermissionBtns = () => {
  const currentRoute = unref(router.currentRoute);
  return currentRoute.meta?.btns?.map((item) => item.code) || [];
};

// 判断按钮是否有权限
export const hasBtnPermission = (permissionCode: string): boolean => {
  const btns = getCurRoutePermissionBtns();
  return btns.includes(permissionCode);
};
