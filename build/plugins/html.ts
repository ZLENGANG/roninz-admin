import { PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export const configHtmlPlugin = (): PluginOption => {
  const htmlPlugin = createHtmlPlugin({
    entry: 'src/main.ts',
    inject: {
      data: {
        title: 'XXX管理系统',
      },
    },
  });
  return htmlPlugin;
};
