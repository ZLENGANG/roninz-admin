<template>
  <div>
    <n-input v-model:value="value"></n-input>
  </div>
</template>

<script setup lang="ts">
const value = ref('');
defineOptions({
  name: 'UserList',
});
</script>

<style scoped></style>
