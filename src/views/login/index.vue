<template>
  <div>login</div>
</template>

<script lang="ts" setup>
import { login } from '@/service';

login({
  name: 'admin',
}).then((res) => {
  console.log(res);
});
</script>
