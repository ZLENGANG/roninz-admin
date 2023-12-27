<template>
  <div class="theme-warp card-shadow" @click="appStore.toggleTheme">
    <i v-if="!appStore.isDark" class="i-ot-moon" text-20></i>
    <i v-else class="i-ot-sunny" text-20></i>
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
