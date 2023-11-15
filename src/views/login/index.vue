<template>
  <n-button type="primary" @click="loginFn"> 登录</n-button>
</template>

<script lang="ts" setup>
import { login } from '@/service';
import { NButton } from 'naive-ui';

function loginFn() {
  login({
    name: 'admin',
  }).then((res) => {
    console.log(res);
  });
}
</script>

<style>
.n-button {
  margin-left: 20px;
}
</style>
