<template>
  <div v-if="options.show" class="loading-container">
    <div class="loading-spin__container">
      <div class="loading-spin">
        <div class="left-0 top-0 loading-spin-item"></div>
        <div class="left-0 bottom-0 loading-spin-item loading-delay-500"></div>
        <div class="right-0 top-0 loading-spin-item loading-delay-1000"></div>
        <div class="right-0 bottom-0 loading-spin-item loading-delay-1500"></div>
      </div>
    </div>
    <div class="loading-title">{{ options.title }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped>
@import '../../../public/resource/loading.css';
</style>
