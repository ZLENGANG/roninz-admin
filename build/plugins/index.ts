import vue from '@vitejs/plugin-vue';
import { configHtmlPlugin } from './html';
import Unocss from 'unocss/vite';

export const createVitePlugins = () => {
  const plugins = [vue(), configHtmlPlugin(), Unocss()];
  return plugins;
};
