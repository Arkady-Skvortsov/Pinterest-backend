import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from '../entities/file.entity';
import { FileService } from './file.service';

@Module({
  providers: [FileService],
  imports: [TypeOrmModule.forFeature([FileEntity])],
  exports: [FileService],
})
export class FileModule {}
