<template>
  <n-layout has-sider wh-full>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="220"
      :native-scrollbar="false"
      :collapsed="appStore.isCollapsed"
    >
      <app-sider />
    </n-layout-sider>

    <n-layout>
      <n-layout-header class="h-60 flex items-center px-15" border-b="1px solid #eee">
        <app-header />
      </n-layout-header>

      <section class="h-50">
        <app-tags />
      </section>

      <n-layout-content class="p-15 bg-hex-f5f6fb dark:bg-hex-101014">
        <slot />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import AppSider from './components/sider/index.vue';
import AppHeader from './components/header/index.vue';
import AppTags from './components/tags/index.vue';
import { useAppStore } from '@/store';
const appStore = useAppStore();
</script>

<style lang="scss" scoped>
.n-layout-content {
  height: calc(100% - 60px - 50px);
  :deep(.n-layout-scroll-container) {
    overflow-x: unset !important;
  }
}
</style>
