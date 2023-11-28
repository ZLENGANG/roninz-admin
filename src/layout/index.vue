<template>
  <n-layout has-sider wh-full>
    <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="220" :native-scrollbar="false">
      <app-sider />
    </n-layout-sider>

    <n-layout>
      <n-layout-header class="h-60" border-b="1px solid #eee">
        <app-header />
      </n-layout-header>

      <section class="h-50">
        <app-tags />
      </section>

      <n-layout-content>
        <app-main />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import AppSider from './components/sider/index.vue';
import AppHeader from './components/header/index.vue';
import AppMain from './components/main/index.vue';
import AppTags from './components/tags/index.vue';
</script>

<style lang="scss" scoped>
.n-layout-content {
  height: calc(100% - 60px);
}
</style>
