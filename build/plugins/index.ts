import vue from '@vitejs/plugin-vue';
import { configHtmlPlugin } from './html';
import Unocss from 'unocss/vite';
import { ViteEnv } from '../../types/env';
import autoImport from './autoImport';

export const createVitePlugins = (env: ViteEnv, isBuild: boolean) => {
  const plugins = [vue(), ...autoImport, configHtmlPlugin(env, isBuild), Unocss()];
  return plugins;
};
