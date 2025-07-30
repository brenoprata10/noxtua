import NodeCache from "node-cache";
import getUuid from "uuid-by-string";

class CacheService {
  private static instance: CacheService;
  private cache?: NodeCache;

  constructor() {
    if (CacheService.instance) {
      return CacheService.instance;
    }
    this.cache = new NodeCache();
    CacheService.instance = this;
  }

  getValue<T>(key: string): T | undefined {
    const value = this.cache?.get(getUuid(key)) as T | undefined;

    return value;
  }

  setValue(key: string, value: any) {
    this.cache?.set(getUuid(key), value);
  }
}

// Instancing CacheService here because it needs to behave as a Singleton
const cacheService = new CacheService();
export default cacheService;

export const cached = <T>(key: string, callback: () => T): T => {
  const cachedValue = cacheService.getValue<T>(key);
  if (cachedValue) {
    return cachedValue;
  }

  const data = callback();
  cacheService.setValue(key, data);
  return data;
};
