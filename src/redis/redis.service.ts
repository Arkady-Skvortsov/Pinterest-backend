import { Inject, Injectable } from '@nestjs/common';
import * as Redis from 'redis';

@Injectable()
export class MyRedisAdapter {
  constructor() {}

  // async get(key): Promise<any> {

  // }

  // async set(key, value, ttl = 0) {
  //   if (ttl !== 0) {
  //     await this.cache.get(key, value, ttl);
  //   }

  //   await this.cache.set(key, value);
  // }

  // async mhget() {}

  // async mgset() {}

  // async reset() {
  //   await this.cache.reset();
  // }

  // async del(key) {
  //   await this.cache.del(key);
  // }
}
