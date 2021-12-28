import { ApiProperty } from '@nestjs/swagger';
import CreateBoardDTO from './board.dto';

export type status = 'Done' | 'In progress' | 'Do it later';

export default class CreateNotesDTO<T = string> {
  @ApiProperty({ type: Number })
  readonly id?: number;

  @ApiProperty({
    type: String,
    example: 'New character',
    description: 'Title of the current note',
  })
  readonly title: T;

  @ApiProperty({
    type: String,
    example:
      'I love it character, maybe i need... I need to try proof my ideas',
    description: 'Text of the current note',
  })
  readonly text: T;

  @ApiProperty({
    type: () => CreateBoardDTO,
    example: 'The last of us 2 - my mind',
    description: 'Board, under that was sended a current note',
  })
  readonly board?: CreateBoardDTO;

  @ApiProperty({ type: [String] })
  readonly photos?: string[];

  @ApiProperty({
    type: String,
    example: 'In progress',
    description: 'Status of the note',
  })
  readonly status: status;
}
