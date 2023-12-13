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
import { MenuInst } from 'naive-ui';
import { useRouter, useRoute } from 'vue-router';
import { isExternal } from '@/utils';
import { usePermissionStore } from '@/store';

const router = useRouter();
const curRoute = useRoute();
const menuRef = ref<MenuInst>();
const activeKey = computed(() => curRoute.name as string);

// 展开子菜单所在的上级菜单
watch(curRoute, async () => {
  nextTick(() => {
    menuRef.value?.showOption();
  });
});

const menuOptions = usePermissionStore().menus;

const handleMenuSelect = (_path: string, item: NewMenuOption) => {
  const path = item.path;
  if (path && isExternal(path)) {
    window.open(path, '_blank');
  } else {
    router.push(item.path);
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
