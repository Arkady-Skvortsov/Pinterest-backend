import { ApiProperty } from '@nestjs/swagger';
import PinEntity from '../entities/pin.entity';
import AccountSettingsEntity from '../entities/account-settings.entity';
import { BoardEntity } from '../entities/board.entity';
import ChatEntity from '../entities/chat.entity';
import CommentEntity from '../entities/comment.entity';
import { FileEntity } from '../entities/file.entity';
import HistoryEntity from '../entities/history.entity';
import NotificationEntity from '../entities/notification.entity';
import banDTO, { banDueTo } from './ban.dto';
import CreateBoardDTO from './board.dto';
import CreateChatDTO from './chat.dto';
import CreateCommentDTO from './comment.dto';
import createNewFile from './file.dto';
import CreateHistoryDTO from './history.dto';
import CreatePinDTO from './pin.dto';
import CreateRoleDTO from './role.dto';
import UpdateSettingsDTO from './user-settings.dto';

export type gender = 'Man' | 'Woman' | 'Custom';
export type finder = string | number;

export default class CreateUserDTO<T = string> {
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
    example: 'mail.stepanov@mail.ru',
    description: 'Email of the current user',
  })
  readonly email: T;

  @ApiProperty({
    type: String,
    example: 'Starov123',
    description: 'Password of the current user',
  })
  readonly password: T;

  @ApiProperty({
    type: String,
    example: 'User.jpg',
    description: 'Photo of the current user',
  })
  readonly photo?: T;

  @ApiProperty({
    type: String,
    example: 'somerandomnumbers/username',
    description: 'ProfileLink of the current profile',
  })
  readonly profile_link?: T;

  @ApiProperty({
    type: String,
    example: 'sometoken',
    description: 'RefreshToken of the current user',
  })
  refreshToken?: T;

  @ApiProperty({ type: Boolean, description: 'Is ban param', example: false })
  isBan?: boolean;

  @ApiProperty({
    type: String,
    description: 'F',
    example: 'Подозрительная активность',
  })
  ban_reason?: banDueTo;

  @ApiProperty({ type: () => Date, example: '', description: '' })
  ban_time?: Date;

  @ApiProperty({
    type: banDTO,
    description: 'Ban form for user',
    example: 'ban for current user',
  })
  banDTO?: banDTO<string>;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'You have activated an account',
  })
  activate?: boolean;

  @ApiProperty({
    type: String,
    description: 'Link for account activation',
    example: 'yghjbiu7yuu8767tyfgvbhu6tfgvhy67ttfv',
  })
  activate_link?: T;

  @ApiProperty({
    type: () => CreateRoleDTO,
    example: 'admin',
    description: 'Role of the current user',
  })
  readonly role: CreateRoleDTO;

  @ApiProperty({ type: () => [CreateBoardDTO], description: '', example: '{}' })
  boards?: BoardEntity[];

  @ApiProperty({ type: () => [CreateHistoryDTO] })
  history?: HistoryEntity[];

  @ApiProperty({ type: () => [CreateCommentDTO] })
  comments?: CommentEntity[];

  @ApiProperty({ type: () => [CreatePinDTO] })
  pins?: PinEntity[];

  @ApiProperty({ type: () => [FileEntity] })
  files?: createNewFile[];

  @ApiProperty({ type: () => UpdateSettingsDTO })
  user_settings?: AccountSettingsEntity;

  @ApiProperty({
    type: () => [NotificationEntity],
    description: 'Notifications, which has a current user',
    example: '{text: "User has been subscribed on you"}',
  })
  readonly notifications?: NotificationEntity[];

  @ApiProperty({
    type: () => [CreateChatDTO],
    description: 'Chats, which has a current user',
    example: 'SlamDunker',
  })
  readonly chat?: ChatEntity[];
}
