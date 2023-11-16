import { createStorage } from './storage';

const PREFIX_KEY = 'Xxx_Adimin';

export const createLocalStorage = (prefixKey: string) => {
  return createStorage({
    prefixKey: prefixKey || PREFIX_KEY,
    storage: localStorage,
  });
};

export const createSessionStorage = (prefixKey: string) => {
  return createStorage({
    prefixKey: prefixKey || PREFIX_KEY,
    storage: sessionStorage,
  });
};

export const lStorage = createLocalStorage(PREFIX_KEY);
export const sStorage = createSessionStorage(PREFIX_KEY);
