<template>
  <n-input v-model="value"></n-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: 'KeepAlive' });

const value = ref('');
</script>

<style></style>
