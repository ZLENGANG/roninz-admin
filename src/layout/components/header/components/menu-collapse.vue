<template>
  <n-icon size="20" class="cursor-pointer" @click="appStore.toggleCollapsed">
    <icon-ep-expand v-if="appStore.isCollapsed" />
    <icon-ep-fold v-else />
  </n-icon>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';
const appStore = useAppStore();
</script>

<style lang="scss" scoped></style>
