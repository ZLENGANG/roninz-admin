<template>
  <n-icon size="20" class="cursor-pointer" @click="appStore.toggleCollapsed">
    <i v-if="appStore.isCollapsed" class="i-ot-expand" />
    <i v-else class="i-ot-fold" />
  </n-icon>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';
const appStore = useAppStore();
</script>

<style lang="scss" scoped></style>
