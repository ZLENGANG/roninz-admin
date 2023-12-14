import { hasBtnPermission } from '@/utils';
import { Directive } from 'vue';

export const permission: Directive = {
  mounted(el: HTMLElement, binding) {
    if (!hasBtnPermission(binding.value)) {
      el.remove();
    }
  },
};
