import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

export default [
  AutoImport({
    dts: 'types/auto-import.d.ts',
    imports: [
      'vue',
      'vue-router',
      'pinia',
      {
        'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
      },
    ],
  }),
  Icons({
    compiler: 'vue3',
    scale: 1,
    defaultClass: 'inline-block',
  }),
  Components({
    dts: 'types/components.d.ts',
    resolvers: [NaiveUiResolver(), IconsResolver({ componentPrefix: 'icon' })],
  }),
];
