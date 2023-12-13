<template>
  <n-config-provider class="wh-full" :theme="appStore.isDark ? darkTheme : null">
    <theme-warp></theme-warp>
    <router-view v-if="Layout" v-slot="{ Component, route: curRoute }">
      <component :is="Layout">
        <KeepAlive :include="keepAliveNames">
          <component :is="Component" v-if="!reloading" :key="curRoute.fullPath" />
        </KeepAlive>
      </component>
    </router-view>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme } from 'naive-ui';
import { useAppStore, useTagsStore } from '@/store';

const layouts = new Map();
function getLayout(name: string) {
  // 利用map将加载过的layout缓存起来，防止重新加载layout导致页面闪烁，且能防止keep-alive不生效
  if (layouts.get(name)) return layouts.get(name);
  const layout = markRaw(defineAsyncComponent(() => import(`@/layouts/${name}/index.vue`)));
  layouts.set(name, layout);
  return layout;
}

const appStore = useAppStore();
const route = useRoute();
const Layout = computed(() => {
  const layout = getLayout(route.meta.layout || 'default');
  return layout;
});

const tagsStore = useTagsStore();
const { reloading, tags } = storeToRefs(tagsStore);

const keepAliveNames = computed(() => {
  return tags.value.filter((item) => item.meta.keepAlive).map((item) => item.name);
});
console.log(keepAliveNames);
</script>
