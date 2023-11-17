<template>
  <transition name="fade-slide" mode="out-in" appear>
    <div>
      <slot />
      <n-back-top :bottom="20" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { NBackTop } from 'naive-ui';
</script>

<style scoped></style>
