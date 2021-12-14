import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { cacheTypes } from '../dto/media.dto';
import { RedisService } from './redis.service';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  private redisService: RedisService;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const typeForChache: cacheTypes = this.reflector.get<cacheTypes>(
      'ChacheType',
      context.getHandler(),
    );

    console.log(context, next);

    console.log(context.switchToHttp().getRequest());

    return next.handle();
  }
}
