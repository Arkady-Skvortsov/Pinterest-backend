import { ApiProperty } from '@nestjs/swagger';
import CreateUserDTO from './users.dto';

export type theme = 'Light' | 'Dark';
export type notification_type = 'application' | 'email';

export default class UpdateSettingsDTO<T = boolean, R = string, N = number> {
  @ApiProperty({
    type: String,
    example: 'Light',
    description: 'Color theme of the application',
  })
  readonly app_theme?: theme;

  @ApiProperty({
    type: String,
    example: 'avatar.jpg',
    description: 'Avatar of the current user',
  })
  readonly avatar?: R;

  @ApiProperty({ type: () => CreateUserDTO, example: '', description: '' })
  readonly owner: CreateUserDTO;

  @ApiProperty({
    type: String,
    example: 'On',
    description: 'Sounds of the application',
  })
  readonly sounds?: T;

  @ApiProperty({
    type: String,
    example: false,
    description:
      'It means that other users can"t found you"r account somewhere',
  })
  readonly deactivate?: T;

  @ApiProperty({
    type: Number,
    example: 100,
    description: 'Authors, that u follow',
  })
  readonly subscribe_count?: N;

  @ApiProperty({
    type: Number,
    example: 50,
    description: 'People, that follows on you',
  })
  readonly subscribers_count?: N;

  @ApiProperty({
    type: [String],
    example: '[Arkadiy, Sergey, Petya, SlamDunk]',
    description: 'Users, which you subscribed',
  })
  readonly subscribe_users?: R[];

  @ApiProperty({
    type: [String],
    example: '[Sergey, Masha, Petya, Sasha]',
    description: 'Users, which subscribed on you',
  })
  readonly subscribers_users?: R[];

  @ApiProperty({
    type: String,
    example: 'application',
    description:
      'It means, that if you choose of that type -> notification would be sended to you (in app, in email)',
  })
  readonly notifications?: notification_type;

  @ApiProperty({
    type: String,
    example: 'some.mail@mail.ru',
    description: 'Users email',
  })
  readonly email?: R;

  @ApiProperty({
    type: String,
    example: 'I love JavaScript in my heart :)',
    description: 'Information about current user',
  })
  readonly about_me?: R;

  @ApiProperty({
    type: String,
    example: 'New York city, Broadwey street',
    description: 'Location of the current user',
  })
  readonly location?: R;

  @ApiProperty({
    type: String,
    example: 'my-website.com',
    description: 'Website of the current user',
  })
  readonly website?: R;

  @ApiProperty({
    type: String,
    example: 'USA',
    description: 'Country of the current user',
  })
  readonly country?: R;

  @ApiProperty({
    type: String,
    example: 'Los-Angeles',
    description: 'Region of the current user',
  })
  readonly region?: R;

  @ApiProperty({
    type: String,
    example: 'man',
    description: 'Gender of the current user',
  })
  readonly gender?: R;

  @ApiProperty({
    type: Number,
    example: 13,
    description: 'Age of the current user',
  })
  readonly age?: N;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Switch on/off some sound effects of the notifications',
  })
  readonly has_voices?: T;

  @ApiProperty({
    type: String,
    example: '../sounds/some_sound.mp3',
    description:
      'What is the sound would be played, when notification would be come',
  })
  readonly notification_voice: R;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Filtration for comments',
  })
  readonly filtration?: R;

  @ApiProperty({
    type: String,
    example: '🦸',
    description: 'Filtration figure, which would be close a bad word',
  })
  readonly filtration_figure?: R;

  @ApiProperty({
    type: [String],
    example: '[бля, сук]',
    description: 'Words, which would be filtered :)',
  })
  readonly filtration_words?: R[];

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Account would be private',
  })
  readonly hide_profile?: T;
}
