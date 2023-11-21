<template>
  <app-page bg-cover :style="{ backgroundImage: `url(${bgImg})` }">
    <div class="m-auto max-w-700 min-w-345 f-c-c rounded-10 bg-white bg-opacity-60 p-15 card-shadow">
      <div hidden w-380 px-20 py-35 md:block>
        <img src="@/assets/images/login_banner.webp" w-full alt="login_banner" />
      </div>

      <n-form
        ref="loginFormRef"
        :model="loginInfo"
        :show-label="false"
        :rules="loginRules"
        class="w-320 flex-col px-20 px-35"
      >
        <h5 f-c-c text-24 mb-32 font-normal color="#6a6a6a">
          <img src="/resource/logo.png" height="50" rounded-10 class="mr-10" />
          {{ VITE_APP_NAME }}
        </h5>

        <n-form-item path="name">
          <n-input
            v-model:value="loginInfo.name"
            placeholder="请输入用户名"
            autofocus
            class="h-48 items-center text-16"
          >
            <template #prefix>
              <n-icon mr-8>
                <AccountCircleRound class="text-20 opacity-40" />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>

        <n-form-item path="password">
          <n-input
            v-model:value="loginInfo.password"
            placeholder="请输入密码"
            type="password"
            class="h-48 items-center text-16"
            show-password-on="click"
            :maxlength="20"
            @keydown.enter="handleLogin"
          >
            <template #prefix>
              <n-icon mr-8>
                <LockFilled class="text-20 opacity-40" />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>

        <n-checkbox :checked="isRemember" label="记住我" :on-update:checked="(val: boolean) => (isRemember = val)" />

        <div mt-20>
          <n-button h-50 w-full rounded-5 text-16 type="primary" :loading="loading" @click="handleLogin">
            登录
          </n-button>
        </div>
      </n-form>
    </div>
  </app-page>
</template>

<script lang="ts" setup>
import { login } from '@/service';
import { lStorage, setToken } from '@/utils';
import { NButton, NInput, NIcon, NCheckbox, NForm, NFormItem, FormInst } from 'naive-ui';
import { useRouter } from 'vue-router';
import appPage from '@/components/common/app-page.vue';
import { defineComponent, ref } from 'vue';
import bgImg from '@/assets/images/login_bg.webp';
import { AccountCircleRound, LockFilled } from '@vicons/material';
defineComponent({
  appPage,
});

const loginInfo = ref({
  name: '',
  password: '',
});
const isRemember = ref(false);
const router = useRouter();
const loading = ref(false);
const { VITE_APP_NAME } = import.meta.env;
const loginRules = {
  name: {
    required: true,
    trigger: 'blur',
    message: '请输入用户名',
  },
  password: {
    required: true,
    trigger: 'blur',
    message: '请输入密码',
  },
};
const loginFormRef = ref<FormInst | null>(null);

const initLoginInfo = () => {
  const info = lStorage.get('loginInfo');
  const isRe = lStorage.get('isRemember');
  if (info) {
    loginInfo.value = info;
  }
  isRemember.value = isRe ? true : false;
};

const setLoginInfo = () => {
  if (isRemember.value) {
    lStorage.set('loginInfo', loginInfo.value);
    lStorage.set('isRemember', isRemember.value);
  }
};

const jump = () => {
  router.push('/');
};

const handleLogin = () => {
  loginFormRef.value?.validate((valid) => {
    if (!valid) {
      loading.value = true;
      login(loginInfo.value)
        .then((res) => {
          setToken(res.data.token);
          setLoginInfo();
          jump();
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};

initLoginInfo();
</script>

<style></style>
