import { CacheModule, Module } from '@nestjs/common';
import type { ClientOpts as RedisClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from './redis.service';

@Module({
  providers: [RedisService],
  imports: [
    CacheModule.register<RedisClientOpts>({
      store: redisStore,
      host: 'redis',
      port: 6379,
    }),
  ],
  exports: [RedisService],
})
export class RedisModule {}
