<template>
  <h1 class="center">{{ recommend }}</h1>
</template>

<script lang="ts" setup>
import { allStock } from './data';
const r = Math.floor(Math.random() * allStock.length);
const recommend = `今日推荐股票：${allStock[r].name}，股票代码为${allStock[r].code}`;
</script>

<style>
.center {
  text-align: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
