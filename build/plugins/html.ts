import { PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { ViteEnv } from '../../types/env';

export const configHtmlPlugin = (env: ViteEnv, isBuild: boolean): PluginOption => {
  const { VITE_APP_NAME } = env;

  const htmlPlugin = createHtmlPlugin({
    minify: isBuild,
    entry: 'src/main.ts',
    inject: {
      data: {
        title: VITE_APP_NAME,
      },
    },
  });
  return htmlPlugin;
};
