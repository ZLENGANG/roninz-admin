<template>
  <n-breadcrumb class="ml-15 hidden sm:block">
    <n-breadcrumb-item
      v-for="item in route.matched.filter((item) => !!item.meta?.title)"
      :key="item.path"
      @click="handleBreadClick(item.path)"
    >
      <component :is="renderIcon(item.meta.icon || '')" />
      {{ item.meta.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { renderIcon } from '@/utils';
const route = useRoute();
const router = useRouter();

const handleBreadClick = (path: string) => {
  if (path === route.path) return;
  router.push(path);
};
</script>

<style lang="scss" scoped></style>
