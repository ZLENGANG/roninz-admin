<template>
  <n-config-provider class="wh-full" :theme="appStore.isDark ? darkTheme : null">
    <theme-warp></theme-warp>
    <router-view></router-view>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme } from 'naive-ui';
import { useAppStore } from '@/store';

const appStore = useAppStore();
</script>
