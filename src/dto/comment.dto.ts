import { ApiProperty } from '@nestjs/swagger';
import CreatePinDTO from './pin.dto';
import CreateUserDTO from './users.dto';

export default class CreateCommentDTO<T = string, R = number> {
  @ApiProperty({ type: Number })
  readonly id?: R;

  @ApiProperty({
    type: String,
    example: 'Arkadiy',
    description: 'Author of the current comment',
  })
  readonly author: CreateUserDTO;

  @ApiProperty({
    type: Date,
    example: '',
    description:
      'Date, where was sended a current comment under current comments',
  })
  readonly date: Date;

  @ApiProperty({
    type: Number,
    description: 'Likes, which has a current comment',
    example: 10,
  })
  readonly like?: R;

  @ApiProperty({
    type: String,
    example: 'Joke.png',
    description: 'photo of the current comment',
  })
  readonly photo?: Express.Multer.File[];

  @ApiProperty({
    type: String,
    example: 'Hi, we love what u do',
    description: 'Text of the current comment',
  })
  readonly text: T;

  @ApiProperty({
    type: String,
    example: 'Lego world - new art',
    description: 'Pin, under was sended a current Pin',
  })
  readonly pin: CreatePinDTO;
}
