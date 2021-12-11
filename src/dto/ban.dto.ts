import { ApiProperty } from '@nestjs/swagger';
import { gMedia } from './media.dto';

export type banDueTo =
  | 'Булинг в комментариях'
  | 'Сексуальный контент в пине'
  | 'Подозрительная активность'
  | 'Осокрбление чувств черующих'
  | ':(';

export default class banDTO<T> {
  @ApiProperty({
    type: String,
    example: 'Arkadiy',
    description: 'User, which had been banned',
  })
  readonly username: T;
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Current media, under that user had been banned',
  })
  readonly currentMedia?: T;
  @ApiProperty({
    type: String,
    example: 'pin',
    description: 'Media type of the ban',
  })
  readonly mediaType: gMedia;
  @ApiProperty({
    type: String,
    example: 'Сексуальный контент в пине',
    description: 'Due to user had been banned',
  })
  readonly dueTo: T;
  @ApiProperty({
    type: String,
    example: '1h',
    description:
      'Time, which would be banned a current user(m - minute, h - hour, d - day)',
  })
  readonly time: T;
}
