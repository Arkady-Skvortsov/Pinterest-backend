import { InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

export default class CreatePinDTO {
  @ApiProperty({
    type: String,
    example: 'Arkadiy123',
    description: 'Author of the current Pin',
  })
  readonly author: string;

  @ApiProperty({
    type: String,
    example: 'https://website.com',
    description: 'Website of the current Pin',
  })
  readonly website?: string;

  @ApiProperty({
    type: String,
    example: 'TLOU2 art',
    description: 'Title of the current Pin',
  })
  readonly title: string;

  @ApiProperty({})
  readonly photo: Express.Multer.File;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Excees type of the current Pins',
  })
  readonly private?: boolean;

  @ApiProperty({
    type: String,
    example: 'The last of us 2 - Abby cool art',
    description: 'Description of the current Pin',
  })
  readonly description: string;

  @ApiProperty({
    type: [String],
    example: '[Game, TLOU2, PS4]',
    description: 'List tags of the current Pin',
  })
  readonly tags: string[];
}
