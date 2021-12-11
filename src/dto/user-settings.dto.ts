import { ApiProperty } from '@nestjs/swagger';

export type theme = 'Light' | 'Dark';
export type notification_type = 'application' | 'email';

export default class UpdateSettingsDTO<T> {
  @ApiProperty({
    type: String,
    example: 'Light',
    description: 'Color theme of the application',
  })
  readonly app_theme: theme;

  @ApiProperty({
    type: String,
    example: 'On',
    description: 'Sounds of the application',
  })
  readonly sounds: T;

  @ApiProperty({ type: String, example: '', description: '' })
  readonly deactivate: T;
  readonly notifications: notification_type;
}
