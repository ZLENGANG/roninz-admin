/* eslint-disable @typescript-eslint/no-explicit-any */
export interface StorageConstrutorParams {
  prefixKey?: string;
  storage: Storage;
}

interface StorageItem<T> {
  value: T;
  time?: number;
  expire?: number | null;
}

export class MyStorage<T, K> {
  private prefixKey: StorageConstrutorParams['prefixKey'];
  private storage: StorageConstrutorParams['storage'];

  constructor({ prefixKey, storage }: StorageConstrutorParams) {
    this.prefixKey = prefixKey || '';
    this.storage = storage;
  }

  getUpperKey(key: K) {
    return `${this.prefixKey}_${key}`.toUpperCase();
  }

  set(key: K, value: T, expire?: number) {
    const data: StorageItem<T> = {
      value,
      time: Date.now(),
      expire: expire ? Date.now() + expire * 1000 : null,
    };
    const stringData = JSON.stringify(data);
    this.storage.setItem(this.getUpperKey(key), stringData);
  }

  getItem(key: K, def: null = null) {
    const val = this.storage.getItem(this.getUpperKey(key));
    if (!val) {
      return def;
    }
    try {
      const data = JSON.parse(val);
      const { value, expire, time } = data;
      if (!expire || expire > Date.now()) {
        return { value, time };
      }
      this.remove(key);
      return def;
    } catch (error) {
      this.remove(key);
      return def;
    }
  }

  get(key: K): StorageItem<T>['value'] | undefined {
    const result: StorageItem<T> | null = this.getItem(key);
    return result?.value;
  }

  remove(key: K) {
    this.storage.removeItem(this.getUpperKey(key));
  }

  clear() {
    this.storage.clear();
  }
}

export const createStorage = ({
  prefixKey = '',
  storage = sessionStorage,
}: StorageConstrutorParams): MyStorage<any, string> => {
  return new MyStorage<any, string>({ prefixKey, storage });
};
