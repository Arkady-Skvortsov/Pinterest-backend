import { ApiProperty } from '@nestjs/swagger';
import banDTO, { banDueTo } from './ban.dto';

export type gender = 'Man' | 'Woman' | 'Custom';
export type finder = string | number;

export default class CreateUserDTO<T> {
  @ApiProperty({
    type: Number,
    example: 12,
    description: 'Primary key of the current table',
  })
  id?: number;

  @ApiProperty({
    type: String,
    example: 'Arkadiy',
    description: 'Username of the current User',
  })
  readonly username: T;

  @ApiProperty({
    type: String,
    example: 'Sasha',
    description: 'Firstname of the current user',
  })
  readonly firstname: T;

  @ApiProperty({
    type: String,
    example: 'Sharpov',
    description: 'Lastname of the current user',
  })
  readonly lastname: T;

  @ApiProperty({
    type: String,
    example: 'Starov123',
    description: 'Password of the current user',
  })
  readonly password: T;

  @ApiProperty({
    type: String,
    example: 'somerandomnumbers/username',
    description: 'ProfileLink of the current profile',
  })
  readonly profile_link?: string;

  @ApiProperty({
    type: String,
    example: 'mail.stepanov@mail.ru',
    description: 'Email of the current user',
  })
  readonly email: T;

  @ApiProperty({
    type: String,
    example: 'User.jpg',
    description: 'Photo of the current user',
  })
  readonly photo?: T;

  @ApiProperty({
    type: String,
    example: 'sometoken',
    description: 'RefreshToken of the current user',
  })
  refreshToken?: T;

  @ApiProperty({})
  readonly role: any;

  @ApiProperty({ type: banDTO, description: '', example: '' })
  banDTO?: banDTO<string>;

  @ApiProperty({
    type: Boolean,
    description: 'Is user banned(flag) ?',
    example: true,
  })
  isBan?: boolean;
}

export class UpdateUserDTO<T> {
  readonly useranme: T;
  readonly firstname: T;
  readonly lastname: T;
  readonly password: T;
  readonly email: T;
  readonly photo: T;
  readonly role: T;
  readonly boards: [];
  readonly pins: [];
  readonly comments: [];
}
