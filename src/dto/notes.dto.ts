import { ApiProperty } from '@nestjs/swagger';

export type status = 'Done' | 'In progress' | 'Do it later';

export default class CreateNotesDTO<T> {
  @ApiProperty({
    type: String,
    example: 'New character',
    description: 'Title of the current note',
  })
  title: T;

  @ApiProperty({
    type: String,
    example:
      'I love it character, maybe i need... I need to try proof my ideas',
    description: 'Text of the current note',
  })
  text: T;

  @ApiProperty({
    type: String,
    example: 'The last of us 2 - my mind',
    description: 'Board, under that was sended a current note',
  })
  board: T;

  @ApiProperty({
    type: String,
    example: 'In progress',
    description: 'Status of the note',
  })
  status: status;
}
