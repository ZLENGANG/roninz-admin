import vue from '@vitejs/plugin-vue';
import { configHtmlPlugin } from './html';
import Unocss from 'unocss/vite';
import { ViteEnv } from '../../types/env';
import autoImport from './autoImport';
import topLevelAwait from 'vite-plugin-top-level-await';

export const createVitePlugins = (env: ViteEnv, isBuild: boolean) => {
  const plugins = [
    vue(),
    // 自动导入插件
    ...autoImport,
    // html插件，给index.html注入变量
    configHtmlPlugin(env, isBuild),
    // 原子化css插件
    Unocss(),
    // 顶层await插件，解决打包编译出错问题
    topLevelAwait({
      promiseExportName: '__tla',
      promiseImportName: (i) => `__tla_${i}`,
    }),
  ];
  return plugins;
};
