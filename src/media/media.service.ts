import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MediaService {
  // constructor() {}
}

export class MediaServiceFactory {
  create(type = 'pin') {
    if (type === 'pin') {
    }

    if (type === 'board') {
    }
  }
}
