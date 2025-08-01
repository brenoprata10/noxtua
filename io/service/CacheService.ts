import { LRUCache } from "lru-cache";
import getUuid from "uuid-by-string";

class CacheService {
  private static instance: CacheService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private cache?: LRUCache<string, any>;

  constructor() {
    if (CacheService.instance) {
      return CacheService.instance;
    }
    this.cache = new LRUCache({
      max: 1000,
      ttl: 60 * 60 * 1000,
    });
    CacheService.instance = this;
  }

  getValue<T>(key: string): T | undefined {
    const value = this.cache?.get(getUuid(key)) as T | undefined;

    return value;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue(key: string, value: any) {
    this.cache?.set(getUuid(key), value);
  }
}

// Instancing CacheService here because it needs to behave as a Singleton
const cacheService = new CacheService();
export default cacheService;

export const cached = async <T>(
  key: string,
  callback: () => Promise<T>
): Promise<T> => {
  const cachedValue = cacheService.getValue<T>(key);
  if (cachedValue) {
    return cachedValue;
  }

  const data = await callback();
  cacheService.setValue(key, data);
  return data;
};
