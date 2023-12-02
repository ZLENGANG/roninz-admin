<template>
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="x"
    :y="y"
    :options="options"
    :show="visible"
    :on-clickoutside="onClickoutside"
    @select="handleSelect"
  >
  </n-dropdown>
</template>

<script setup lang="ts">
import { renderIcon } from '@/utils';
import { DropdownOption } from 'naive-ui';
import { useTagsStore } from '@/store';

type ContextMenuProps = {
  x: number;
  y: number;
  curPath: string;
  visible: boolean;
};

const props = withDefaults(defineProps<ContextMenuProps>(), {
  visible: false,
  curPath: '',
  x: 0,
  y: 0,
});

const emit = defineEmits(['update:visible']);

const tagsStore = useTagsStore();

const options = computed<DropdownOption[]>(() => [
  {
    label: '重新加载',
    key: 'reload',
    disabled: props.curPath !== tagsStore.activeTag,
    icon: renderIcon('mdi:refresh', { size: 18 }),
  },
  {
    label: '关闭',
    key: 'close',
    disabled: tagsStore.tags.length <= 1,
    icon: renderIcon('mdi:close', { size: 18 }),
  },
  {
    label: '关闭其他',
    key: 'close-other',
    disabled: tagsStore.tags.length <= 1,
    icon: renderIcon('mdi:arrow-expand-horizontal', { size: 14 }),
  },
  {
    label: '关闭左侧',
    key: 'close-left',
    disabled: tagsStore.tags[0].path === props.curPath,
    icon: renderIcon('mdi:arrow-expand-left', { size: 14 }),
  },
  {
    label: '关闭右侧',
    key: 'close-right',
    disabled: tagsStore.tags[tagsStore.tags.length - 1].path === props.curPath,
    icon: renderIcon('mdi:arrow-expand-right', { size: 14 }),
  },
]);

const hideDropdown = () => {
  emit('update:visible', false);
};

const onClickoutside = () => {
  hideDropdown();
};

const handleSelect = (key: string) => {
  console.log(key);
  hideDropdown();
};
</script>

<style></style>
