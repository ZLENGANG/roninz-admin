<template>
  <div class="flex items-center">
    <menu-collapse />
    <bread-crumb />
  </div>

  <div class="flex items-center ml-auto">
    <full-screen />
    <user-avatar />
  </div>
</template>

<script lang="ts" setup>
import menuCollapse from './components/menu-collapse.vue';
import breadCrumb from './components/bread-crumb.vue';
import fullScreen from './components/full-screen.vue';
import userAvatar from './components/user-avatar.vue';
</script>

<style lang="scss" scoped></style>
