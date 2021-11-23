import { ApiProperty } from '@nestjs/swagger';
import UserEntity from '../entities/users.entity';

export default class CreatePinDTO {
  @ApiProperty({
    type: String,
    example: 'Arkasha-Skvortsov',
    description: 'Author of the current pin',
  })
  readonly author: UserEntity;

  @ApiProperty({
    type: String,
    example: 'the-last-of-website.firebaseapp.com',
    description: 'Website of the current Pin',
  })
  readonly website?: string;

  @ApiProperty({
    type: String,
    example: 'Death Stranding',
    description: 'Title of the current Pin',
  })
  readonly title: string;

  @ApiProperty({ example: 'Blob?4', description: 'Photo of the current Pin' })
  readonly photo: Express.Multer.File;

  @ApiProperty({
    type: Boolean,
    example: 'true',
    description: 'Status to access of the current Pin',
  })
  readonly private?: boolean;

  @ApiProperty({
    type: String,
    example: 'This is the great game;',
    description: 'Description of the current Pin',
  })
  readonly description: string;

  @ApiProperty({
    type: String,
    example: '[Game, TLOU, Naughty Dog]',
    description: 'Tags of the current Pin',
  })
  readonly tags: string[];
}
