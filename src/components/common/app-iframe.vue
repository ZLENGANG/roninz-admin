<template>
  <iframe :src="link" frameborder="0" class="wh-full"></iframe>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();

const link = route.meta.innerLink;
</script>

<style scoped></style>
