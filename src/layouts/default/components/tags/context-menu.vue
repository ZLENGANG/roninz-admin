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
const route = useRoute();

const options = computed<DropdownOption[]>(() => [
  {
    label: '重新加载',
    key: 'reload',
    disabled: props.curPath !== tagsStore.activeTagPath,
    icon: renderIcon('i-cm-refresh', { size: 18 }),
  },
  {
    label: '关闭',
    key: 'close',
    disabled: tagsStore.tags.length <= 1,
    icon: renderIcon('i-cm-close', { size: 18 }),
  },
  {
    label: '关闭其他',
    key: 'close-other',
    disabled: tagsStore.tags.length <= 1,
    icon: renderIcon('i-cm-arrow-expand-horizontal', { size: 14 }),
  },
  {
    label: '关闭左侧',
    key: 'close-left',
    disabled: tagsStore.tags[0].path === props.curPath,
    icon: renderIcon('i-cm-arrow-expand-left', { size: 14 }),
  },
  {
    label: '关闭右侧',
    key: 'close-right',
    disabled: tagsStore.tags[tagsStore.tags.length - 1].path === props.curPath,
    icon: renderIcon('i-cm-arrow-expand-right', { size: 14 }),
  },
]);

const actionMap = new Map([
  [
    'reload',
    () => {
      console.log(route);
      tagsStore.reloadTag(route);
    },
  ],

  [
    'close',
    () => {
      tagsStore.removeTag({ path: props.curPath });
    },
  ],

  [
    'close-other',
    () => {
      tagsStore.closeOtherTags(props.curPath);
    },
  ],

  [
    'close-left',
    () => {
      tagsStore.closeLeftTags(props.curPath);
    },
  ],

  [
    'close-right',
    () => {
      tagsStore.closeRightTags(props.curPath);
    },
  ],
]);

const hideDropdown = () => {
  emit('update:visible', false);
};

const onClickoutside = () => {
  hideDropdown();
};

const handleSelect = (key: string) => {
  const actionFn = actionMap.get(key);
  actionFn && actionFn();
  hideDropdown();
};
</script>

<style></style>
