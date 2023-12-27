<template>
  <n-icon size="18" class="mr-20 cursor-pointer" @click="toggle">
    <i v-if="isFullscreen" class="i-ot-fullscreen-exit-outlined" />
    <i v-else class="i-ot-fullscreen-outlined" />
  </n-icon>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';

const { isFullscreen, toggle } = useFullscreen();
</script>
