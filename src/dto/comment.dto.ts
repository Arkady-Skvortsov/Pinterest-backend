import { ApiProperty } from '@nestjs/swagger';

export default class CreateCommentDTO<T> {
  @ApiProperty({
    type: String,
    example: 'Arkadiy',
    description: 'Author of the current comment',
  })
  readonly author: T;

  @ApiProperty({
    type: Date,
    example: '',
    description:
      'Date, where was sended a current comment under current comments',
  })
  readonly date: Date;

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
  readonly pin: T;
}
