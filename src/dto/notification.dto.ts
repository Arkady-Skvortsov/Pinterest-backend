import { ApiProperty } from '@nestjs/swagger';
import UserEntity from '../entities/users.entity';
import CreateBoardDTO from './board.dto';
import CreateCommentDTO from './comment.dto';
import CreatePinDTO from './pin.dto';
import CreateUserDTO from './users.dto';

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
  | 'Автор добавил вас в доску'
  | 'Сообщение в чате';

export type subscriber<T = UserEntity> = { author: T; subscribers: T[] };
export type chatSubscriber<T = CreateUserDTO> = { owner: T; catcher: T };

export default class CreateNotificationDTO<T = string, U = CreateUserDTO> {
  @ApiProperty({ type: Number, example: '', description: '' })
  readonly id?: number;

  @ApiProperty({
    type: String,
    example: 'Автора выложил новую доску',
    description: 'Text of the current notification',
  })
  readonly text: T;

  @ApiProperty({
    type: String,
    example: 'Автор выложил новую доску',
    description: 'Event of the current notification',
  })
  readonly event: event;

  @ApiProperty({
    type: String,
    example: 'Natasha',
    description: 'User, which catched a current notification',
  })
  readonly user: U;

  @ApiProperty({ type: String, example: '', description: '' })
  readonly channel: T;

  @ApiProperty({
    type: String,
    example: 'Arkadiy',
    description:
      'Author of the current notification, which was sended to current user',
  })
  readonly author: U;

  @ApiProperty({ type: () => CreateCommentDTO, example: '', description: '' })
  readonly comment?: CreateCommentDTO;

  @ApiProperty({ type: () => CreatePinDTO, example: '', description: '' })
  readonly pin?: CreatePinDTO;

  @ApiProperty({ type: () => CreateBoardDTO, example: '', description: '' })
  readonly board?: CreateBoardDTO;
}
