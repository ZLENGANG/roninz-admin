<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="keepAliveNames">
      <component :is="Component" v-if="!reloading" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import { useTagsStore } from '@/store';

const tagsStore = useTagsStore();
const { reloading, tags } = storeToRefs(tagsStore);

const keepAliveNames = computed(() => {
  return tags.value.filter((item) => item.meta.keepAlive).map((item) => item.name);
});
</script>

<style lang="scss" scoped></style>
