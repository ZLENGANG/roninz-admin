<template>
  <n-layout has-sider wh-full>
    <n-layout-sider content-style="padding: 24px;"> 海淀桥 </n-layout-sider>
    <n-layout>
      <n-layout-header>颐和园路</n-layout-header>
      <n-layout-content content-style="padding: 24px;"> 平山道 </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup></script>

<style>
.n-layout-header,
.n-layout-footer {
  background: rgba(128, 128, 128, 0.2);
  padding: 24px;
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  height: calc(100% - 70px);
  background: rgba(128, 128, 128, 0.4);
}
</style>
