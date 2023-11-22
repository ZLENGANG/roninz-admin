<template>
  <div class="theme-warp card-shadow" @click="appStore.toggleTheme">
    <icon-ep-sunny v-if="!appStore.isDark" text-20 />
    <icon-ep-moon v-else text-20 />
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';

const appStore = useAppStore();
</script>

<style lang="scss" scoped>
.theme-warp {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  z-index: 1;
  bottom: 50px;
  right: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  cursor: pointer;
}
</style>
