import { SetMetadata } from '@nestjs/common';

export type requestType = 'http' | 'ws';

export const RequestType = (request: requestType) =>
  SetMetadata('requestType', request);
