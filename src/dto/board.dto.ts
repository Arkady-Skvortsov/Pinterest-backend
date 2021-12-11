import { ApiProperty } from '@nestjs/swagger';
import UserEntity from '../entities/users.entity';

export default class CreateBoardDTO<T> {
  @ApiProperty({
    type: String,
    example: 'Tlou2 art',
    description: 'Title of the current Board',
  })
  readonly title: T;

  @ApiProperty({
    type: String,
    example: 'Ellie.jpg',
    description: 'Photo of the current Board',
  })
  readonly photo: Express.Multer.File;

  @ApiProperty({
    type: String,
    example: 'Arkadiy',
    description: 'Author of the current board',
  })
  readonly author: T;

  @ApiProperty({
    type: [String],
    example: '[Arkadiy, Eva, Natasha]',
    description: '',
  })
  readonly collaborators?: UserEntity[]; //Todo: Fix that value later

  @ApiProperty({ type: Boolean, example: false, description: '' })
  readonly private: boolean;

  @ApiProperty({ type: [String], example: '', description: '' })
  readonly notes?: T[];

  @ApiProperty({})
  readonly pins?: T[];
}
