<template>
  <scroll-x>
    <n-tag v-for="tag in tags" :key="tag.key" closable class="mx-5 cursor-pointer rounded-4 px-15 hover:color-primary">
      {{ tag.label }}
    </n-tag>
  </scroll-x>
</template>

<script lang="ts" setup>
const tags = [
  {
    key: '1',
    label: '爱在西元前',
  },
  {
    key: '2',
    label: '爱在西元前',
  },
  {
    key: '3',
    label: '爱在西元前',
  },
  {
    key: '41',
    label: '爱在西元前',
  },
  {
    key: '42',
    label: '爱在西元前',
  },
  {
    key: '43',
    label: '爱在西元前',
  },
  {
    key: '433',
    label: '爱在西元前',
  },
  {
    key: '44',
    label: '爱在西元前',
  },
  {
    key: '45',
    label: '爱在西元前',
  },
  {
    key: '46',
    label: '爱在西元前',
  },
  {
    key: '466',
    label: '爱在西元前',
  },
  {
    key: '47',
    label: '爱在西元前',
  },
  {
    key: '48',
    label: '爱在西元前',
  },
  {
    key: '418',
    label: '爱在西元前',
  },
  {
    key: '482',
    label: '爱在西元前',
  },
  {
    key: '483',
    label: '爱在西元前',
  },
  {
    key: '448',
    label: '爱在西元前',
  },
  {
    key: '458',
    label: '爱在西元前',
  },
  {
    key: '468',
    label: '爱在西元前',
  },
];
</script>

<style lang="scss" scoped></style>
