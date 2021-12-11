import { ApiProperty } from '@nestjs/swagger';

export type event =
  | 'Лайк комментария'
  | 'Подписка'
  | 'Ответ на комментарий'
  | 'Сохранение доски'
  | 'Сохранение пина'
  | 'Лайк пина'
  | 'Лайк доски'
  | 'Комментарий под пином'
  | 'Вы были забанены, азазаза :)'
  | 'Автор выложил новый пин'
  | 'Автор выложил новую доску'
  | 'Автор добавил вас в доску';

export type subscriber<T> = { author: T; subscribers: T[] };

export default class CreateNotificationDTO<T> {
  @ApiProperty({
    type: String,
    example: 'Автора выложил новую доску',
    description: 'Text of the current notification',
  })
  text: T;

  @ApiProperty({
    type: String,
    example: 'Автор выложил новую доску',
    description: 'Event of the current notification',
  })
  event: event;

  @ApiProperty({
    type: String,
    example: 'Natasha',
    description: 'User, which catched a current notification',
  })
  user: T;

  @ApiProperty({
    type: String,
    example: 'Arkadiy',
    description:
      'Author of the current notification, which was sended to current user',
  })
  author: T;
}
