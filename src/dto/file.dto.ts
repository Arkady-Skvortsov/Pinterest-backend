import { ApiProperty } from '@nestjs/swagger';

export default class createNewFile {
  @ApiProperty({ type: Number })
  public id?: number;

  @ApiProperty({
    type: String,
    example: '../src/public/file.jpg',
    description: 'Path of the current path',
  })
  public filepath: string;

  @ApiProperty({
    type: String,
    example: 'file.jpg',
    description: 'Name of the current file',
  })
  public filename: string;
}
