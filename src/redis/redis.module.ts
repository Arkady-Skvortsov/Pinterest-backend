import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { MyRedisAdapter } from './redis.service';

@Module({
  providers: [MyRedisAdapter],
  exports: [MyRedisAdapter],
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: configService.get('CACHE_TTL'),
        max: configService.get('MAX_ITEM_IN_CACHE'),
      }),
    }),
  ],
})
export class RedisModule {}
