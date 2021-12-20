import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from '../entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity) private fileEntity: Repository<FileEntity>,
  ) {}

  async createFile() {
    const newFile = await this.fileEntity.create();

    return newFile;
  }
}
