import { createDiscreteApi } from 'naive-ui';

export const setupNaiveDiscreteApi = () => {
  const { message, dialog, notification, loadingBar } = createDiscreteApi([
    'message',
    'dialog',
    'notification',
    'loadingBar',
  ]);
  window.$loadingBar = loadingBar;
  window.$notification = notification;
  window.$message = message;
  window.$dialog = dialog;
};
