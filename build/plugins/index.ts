import vue from '@vitejs/plugin-vue';
import { configHtmlPlugin } from './html';
import Unocss from 'unocss/vite';
import { ViteEnv } from '../../types/env';
import autoImport from './autoImport';
import topLevelAwait from 'vite-plugin-top-level-await';

export const createVitePlugins = (env: ViteEnv, isBuild: boolean) => {
  const plugins = [
    vue(),
    ...autoImport,
    configHtmlPlugin(env, isBuild),
    Unocss(),
    topLevelAwait({
      promiseExportName: '__tla',
      promiseImportName: (i) => `__tla_${i}`,
    }),
  ];
  return plugins;
};
