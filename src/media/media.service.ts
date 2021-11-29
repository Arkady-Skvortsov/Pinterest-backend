import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MediaService {
  // constructor() {}
}

export class MediaServiceFactory {
  create(type = 'audio') {
    if (type === 'audio') {
    }

    if (type === 'photo') {
    }
  }
}
