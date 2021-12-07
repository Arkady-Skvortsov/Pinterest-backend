import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caretaker, Originator } from '../history/history.service';
import { gMedia, mediaDTO } from '../dto/media.dto';
import { BoardEntity } from '../entities/board.entity';
import PinEntity from '../entities/pin.entity';
import { historyMedia } from 'src/dto/history.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(PinEntity) private pinEntity: Repository<PinEntity>,
    @InjectRepository(BoardEntity)
    private boardEntity: Repository<BoardEntity>,
  ) {}
}

export class MediaServiceFactory {
  constructor(private careTaker: Caretaker, private originator: Originator) {}

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

    this.careTaker.addMemento(this.originator.commit());
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

  async deleteCurrentMedia(type: gMedia, title: string) {
    if (type === 'pin') {
    }

    if (type === 'board') {
    }
  }
}
