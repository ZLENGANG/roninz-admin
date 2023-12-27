import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import { getIcons } from './build/plugins/icon';
const icons = getIcons();

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetRemToPx({ baseFontSize: 4 }),
    presetIcons({
      warn: true,
      prefix: ['i-'],
      extraProperties: {
        display: 'inline-block',
      },
      collections: {
        ot: FileSystemIconLoader('./src/assets/icons/other'),
        menu: FileSystemIconLoader('./src/assets/icons/menu'),
        cm: FileSystemIconLoader('./src/assets/icons/context-menu'),
      },
    }),
  ],
  safelist: icons,
  shortcuts: {
    'wh-full': 'w-full h-full',
    'f-c-c': 'flex justify-center items-center',
    'flex-col': 'flex flex-col',
  },
  rules: [['card-shadow', { 'box-shadow': '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017' }]],
});
