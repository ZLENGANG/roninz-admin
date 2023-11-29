<template>
  <div :class="['f-c-c', 'h-60', 'cursor-pointer', appStore.isCollapsed ? '' : 'pr-18']" @click="jumpToIndex">
    <n-avatar class="h-45 w-45" size="small" src="./favicon.png" />
    <span v-if="!appStore.isCollapsed" class="ml-10 text-16 color-#316C72FF font-bold">{{ VITE_APP_NAME }}</span>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store';

const appStore = useAppStore();
const router = useRouter();
const { VITE_APP_NAME } = import.meta.env;

const jumpToIndex = () => {
  router.push('/');
};
</script>

<style scoped></style>
