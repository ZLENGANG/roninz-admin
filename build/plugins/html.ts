import { PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { APP_TITLE } from '../../settings';

export const configHtmlPlugin = (): PluginOption => {
  const htmlPlugin = createHtmlPlugin({
    entry: 'src/main.ts',
    inject: {
      data: {
        title: APP_TITLE,
      },
    },
  });
  return htmlPlugin;
};
