export interface StorageConstrutorParams {
  prefixKey?: string;
  storage: Storage;
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set(key: K, value: any, expire?: number) {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: expire ? Date.now() + expire * 1000 * 60 * 60 * 24 : null,
    });
    this.storage.setItem(this.getUpperKey(key), stringData);
  }

  getItem(key: K, def: T) {
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

  remove(key: K) {
    this.storage.removeItem(this.getUpperKey(key));
  }

  clear() {
    this.storage.clear();
  }
}

export const createStorage = <T, K>({
  prefixKey = '',
  storage = sessionStorage,
}: StorageConstrutorParams): MyStorage<T, K> => {
  return new MyStorage<T, K>({ prefixKey, storage });
};
