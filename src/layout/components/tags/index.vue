<template>
  <scroll-x ref="scrollXRef">
    <n-tag
      v-for="tag in tags"
      ref="tagsRef"
      :key="tag.path"
      :closable="tags.length > 1"
      class="mx-5 cursor-pointer rounded-4 px-15 hover:color-primary"
      :type="tag.path === route.path ? 'primary' : 'default'"
      @click="handleTagClick(tag)"
      @close="handleCloseTag(tag)"
      @contextmenu.prevent="handleContextMenu($event, tag)"
    >
      {{ tag.meta.title }}
      <template #icon>
        <component :is="renderIcon(tag.meta.icon)" />
      </template>
    </n-tag>
  </scroll-x>

  <context-menu v-bind="contextMenuOption" v-model:visible="contextMenuOption.visible" />
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { useTagsStore } from '@/store';
import { renderIcon } from '@/utils';
import { TagRef } from 'naive-ui/es/tag/src/Tag';
import ContextMenu from './context-menu.vue';

const route = useRoute();
const router = useRouter();
const tagsStore = useTagsStore();
const tags = computed(() => tagsStore.tags);
const tagsRef = ref<TagRef[]>();
const scrollXRef = ref<ScrollXRef>();

const contextMenuOption = ref({
  x: 0,
  y: 0,
  visible: false,
  curPath: '',
});

watch(
  () => route.path,
  () => {
    const { path, meta } = route;
    tagsStore.addTag({
      path,
      meta,
    });
  },
  { immediate: true },
);

watch(
  () => tagsStore.activeTagIndex,
  (index) => {
    nextTick(() => {
      const activeElement = tagsRef.value?.[index]?.$el;
      if (!activeElement) {
        return;
      }
      const { offsetLeft, offsetWidth } = activeElement;

      scrollXRef.value?.handleScroll(offsetLeft, offsetWidth);
    });
  },
  { immediate: true },
);

const handleTagClick = (tag: RouteTag) => {
  tagsStore.setActiveTag(tag.path);
  router.push(tag.path);
};

const handleCloseTag = (tag: RouteTag) => {
  tagsStore.removeTag(tag);
};

const handleContextMenu = (e: MouseEvent, tag: RouteTag) => {
  contextMenuOption.value = {
    x: e.clientX,
    y: e.clientY,
    curPath: tag.path,
    visible: true,
  };
};
</script>

<style lang="scss" scoped></style>
