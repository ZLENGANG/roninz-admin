<template>
  <n-menu
    ref="menuRef"
    accordion
    :options="menuOptions"
    :indent="18"
    :collapsed-icon-size="22"
    :collapsed-width="64"
    :value="activeKey"
    class="side-menu"
    @update:value="handleMenuSelect"
  />
</template>

<script lang="ts" setup>
import { renderIcon } from '@/utils/common/icon';
import { MenuInst, MenuOption } from 'naive-ui';
import { useRouter, useRoute, RouteRecordRaw } from 'vue-router';
import { isExternal } from '@/utils';

type MenuOptionRoute = MenuOption & {
  route?: RouteRecordRaw;
};

const router = useRouter();
const routes = router.options.routes[0].children || [];
const curRoute = useRoute();
const menuRef = ref<MenuInst>();
const activeKey = computed(() => curRoute.name as string);

// 展开子菜单所在的上级菜单
watch(curRoute, async () => {
  nextTick(() => {
    menuRef.value?.showOption();
  });
});

// 获取菜单
const getMenu = (routes: RouteRecordRaw[]): MenuOption[] => {
  const result: MenuOption[] = [];

  routes.forEach((route) => {
    const obj: MenuOption = {
      route,
      label: route.meta?.title,
      key: route.name as string,
      icon: renderIcon(route.meta?.icon || ''),
    };

    if (route.children) {
      obj.children = getMenu(route.children);
    }

    result.push(obj);
  });

  return result;
};

const menuOptions = getMenu(routes);

const handleMenuSelect = (_path: string, item: MenuOptionRoute) => {
  const path = item.route?.path;
  if (path && isExternal(path)) {
    window.open(path, '_blank');
  } else {
    router.push({ name: item.route?.name });
  }
};
</script>

<style lang="scss" scoped>
.side-menu:not(.n-menu--collapsed) {
  :v-deep(.n-menu-item-content) {
    &::before {
      left: 5px;
      right: 5px;
    }
    &.n-menu-item-content--selected,
    &:hover {
      &::before {
        border-left: 4px solid burlywood;
      }
    }
  }
}
</style>
