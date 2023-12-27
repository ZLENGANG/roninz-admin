<template>
  <div>用户</div>
  <n-button v-permission="'AddUser'" type="primary">有AddUser权限才能看到</n-button>
  <!-- <i class="i-ot-gitee"></i> -->
  <!-- <i class="i-menu-home"></i> -->
  <!-- <i class="i-menu-filtering"></i> -->
</template>

<script setup lang="ts">
defineOptions({ name: 'UserMgt' });
</script>

<style></style>
