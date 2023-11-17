<template>
  <n-button type="primary" @click="loginFn"> 登录</n-button>
  <n-button type="primary" @click="jump"> 去首页</n-button>
</template>

<script lang="ts" setup>
import { login } from '@/service';
import { setToken } from '@/utils';
import { NButton } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

function loginFn() {
  login({
    name: 'admin',
  }).then((res) => {
    setToken(res.data.token);
    jump();
  });
}

const jump = () => {
  router.push('/');
};
</script>

<style>
.n-button {
  margin-left: 20px;
}
</style>
