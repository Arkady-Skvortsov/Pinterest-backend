import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { gMedia, mediaDTO } from '../dto/media.dto';
import { BoardEntity } from '../entities/board.entity';
import PinEntity from '../entities/pin.entity';
import { historyMedia } from '../dto/history.dto';
import { BoardsService } from '../boards/boards.service';
import { PinsService } from '../pins/pins.service';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(PinEntity) private pinEntity: Repository<PinEntity>,
    @InjectRepository(BoardEntity)
    private boardEntity: Repository<BoardEntity>,
  ) {}
}

export class MediaServiceFactory {
  //Todo: done with implementing Factory pattern in app after testing...
  constructor(
    private boardsService: BoardsService,
    private pinsService: PinsService,
  ) {}

  async getAllMedia(type: gMedia = 'pin') {
    let media;

    if (type === 'pin') {
      media = 1;
    }

    if (type === 'board') {
      media = 2;
    }
  }

  async createNewMedia(type: gMedia = 'pin', dto: mediaDTO) {
    let newMedia: historyMedia;

    if (type === 'pin') {
    }

    if (type === 'board') {
    }
  }

  async getCurrentMedia(type: gMedia) {
    if (type === 'pin') {
    }

    if (type === 'board') {
    }
  }

  async updateCurrentMedia(type: gMedia, title: string, dto: mediaDTO) {
    if (type === 'pin') {
    }

    if (type === 'board') {
    }
  }

  async setAccessMedia(type: gMedia, title: string, access: boolean) {
    if (type === 'pin') {
    }

    if (type === 'board') {
    }
  }

  async addNewMedia(type: gMedia, title: string) {
    if (type === 'pin') {
    }

    if (type === 'board') {
    }
  }

  async likeCurrentMedia(type: gMedia, title: string) {
    if (type === 'pin') {
    }

    if (type === 'board') {
    }
  }

  async setVisibilityMedia(type: gMedia, title: string, visibility: boolean) {
    if (type === 'pin') {
    }

    if (type === 'board') {
    }
  }

  async shareWithSubscribers(type: gMedia, title: string, channel: string) {
    if (type === 'pin') {
    }

    if (type === 'board') {
    }
  }

  async deleteCurrentMedia(type: gMedia, title: string) {
    if (type === 'pin') {
    }

    if (type === 'board') {
    }
  }
}
