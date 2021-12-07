import { CacheModule, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  providers: [RedisService],
  exports: [RedisService],
  imports: [CacheModule.register()],
})
export class RedisModule {}
