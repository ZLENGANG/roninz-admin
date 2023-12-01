<template>
  <scroll-x>
    <n-tag
      v-for="tag in tags"
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

const route = useRoute();
const router = useRouter();
const tagsStore = usetTagsStore();
const tags = computed(() => tagsStore.tags);

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

const handleTagClick = (tag: RouteTag) => {
  router.push(tag.path);
};

const handleCloseTag = (tag: RouteTag) => {
  console.log(tag);
  tagsStore.removeTag(tag);
};
</script>

<style lang="scss" scoped></style>
