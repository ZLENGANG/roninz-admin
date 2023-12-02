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
    >
      {{ tag.meta.title }}
      <template #icon>
        <component :is="renderIcon(tag.meta.icon)" />
      </template>
    </n-tag>
  </scroll-x>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { usetTagsStore } from '@/store';
import { renderIcon } from '@/utils';
import { TagRef } from 'naive-ui/es/tag/src/Tag';

const route = useRoute();
const router = useRouter();
const tagsStore = usetTagsStore();
const tags = computed(() => tagsStore.tags);
const tagsRef = ref<TagRef[]>();
const scrollXRef = ref<ScrollXRef>();

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
      console.dir(activeElement);
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
</script>

<style lang="scss" scoped></style>
