<template>
  <n-dropdown :options="options" @select="handleSelect">
    <div class="flex items-center cursor-pointer">
      <n-avatar class="mr10 h-35 w-35 rounded-full" round size="small" src="./favicon.png" />
      <span>Roninz(admin)</span>
    </div>
  </n-dropdown>
</template>

<script setup lang="ts">
import { lStorage } from '@/utils';
const options = [
  {
    label: '退出登录',
    key: 'logout',
  },
];

const handleSelect = (key: string | number): void => {
  if (key === 'logout') {
    window.$dialog?.info({
      title: '提示',
      content: '您确定要退出登录吗？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick() {
        lStorage.remove('token');
        window.$message?.success('已退出登录');
        window.location.href = '/';
      },
    });
  }
};
</script>
