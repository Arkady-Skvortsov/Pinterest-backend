import { SetMetadata } from '@nestjs/common';
import { cacheTypes } from '../dto/media.dto';

export const CacheType = (cacheType: cacheTypes) =>
  SetMetadata('CacheType', cacheType);
