import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key): Promise<any> {
    return await this.cache.get(key);
  }

  async set(key, value, ttl = 0) {
    if (ttl !== 0) {
      await this.cache.get(key, value, ttl);
    }

    await this.cache.set(key, value);
  }

  async reset() {
    await this.cache.reset();
  }

  async del(key) {
    await this.cache.del(key);
  }
}
