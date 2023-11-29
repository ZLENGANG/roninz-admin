import { NIcon } from 'naive-ui';
import { Icon } from '@iconify/vue';

export function renderIcon(icon: string, props = { size: 17 }) {
  return () => h(NIcon, props, { default: () => h(Icon, { icon }) });
}
