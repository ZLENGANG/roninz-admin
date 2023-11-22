<template>
  <n-config-provider class="wh-full" :theme="isDark ? darkTheme : null">
    <n-button @click="changeTheme">主题</n-button>
    <router-view></router-view>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core';

import { darkTheme } from 'naive-ui';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const changeTheme = () => {
  toggleDark();
};
</script>
