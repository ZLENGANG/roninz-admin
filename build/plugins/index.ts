import vue from '@vitejs/plugin-vue';
import { configHtmlPlugin } from './html';

export const createVitePlugins = () => {
  const plugins = [vue(), configHtmlPlugin()];
  return plugins;
};
