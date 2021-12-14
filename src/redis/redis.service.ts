import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async get(key): Promise<any> {
    await this.cache.get(key);
  }

  async set(key, value) {
    await this.cache.set(key, value);
  }

  async reset() {
    await this.cache.reset();
  }

  async del(key) {
    await this.cache.del(key);
  }

  async mset(...key) {
    await this.cache.store.mset(key);
  }

  async mget(...key) {
    await this.cache.store.mget(key);
  }
}
