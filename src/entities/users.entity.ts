import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import PinEntity from './pin.entity';
import RoleEntity from './roles.entity';
import CommentEntity from './comment.entity';
import { BoardEntity } from './board.entity';
import HistoryEntity from './history.entity';
import AccountSettingsEntity from './account-settings.entity';
import NotificationEntity from './notification.entity';
import { FileEntity } from './file.entity';
import ChatEntity from './chat.entity';
import banDTO, { banDueTo } from '../dto/ban.dto';

@Entity({ name: 'users' })
@ObjectType('users')
export default class UserEntity {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Primary key of the current column',
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    type: String,
    example: 'Arkadiy',
    description: 'Username of the user',
  })
  @Column({ type: 'varchar', nullable: false, unique: true })
  public username: string;

  @ApiProperty({
    type: String,
    example: 'Saimon',
    description: 'Firstname of the user',
  })
  @Column({ type: 'varchar', nullable: false })
  public firstname: string;

  @ApiProperty({
    type: String,
    example: 'Perikov',
    description: 'Lastname of the user',
  })
  @Column({ type: 'varchar', nullable: false })
  public lastname: string;

  @ApiProperty({
    type: String,
    example: 'cat@catsmail.com',
    description: 'Mail of the user',
  })
  @Column({ type: 'varchar', nullable: false })
  public email: string;

  @ApiProperty({
    type: String,
    example: 'resurse123',
    description: 'Password of the user',
  })
  @Column({ type: 'varchar', nullable: false })
  public password: string;

  @ApiProperty({
    type: String,
    example: 'cat.jpg',
    description:
      'Photo of the User account(But if he hasn"t that -> we give a basic photo to him',
  })
  @OneToOne(() => FileEntity, (file) => file.filepath)
  public photo?: string;

  @ApiProperty({
    type: String,
    example: '123FUjkI908&f2',
    description: 'RefreshToken of the user(He safety in the cookies)',
  })
  @Column({ type: 'text', nullable: true })
  public refreshToken: string;

  @ApiProperty({
    type: Boolean,
    example: 'true',
    description: 'Check -> is user banned of no?',
  })
  @Column({ type: 'boolean', nullable: false, default: false })
  public isBan: boolean;

  @ApiProperty({
    type: String,
    example: '"Bad words in the comments"',
    description: 'The reason of the ban',
  })
  @Column({ type: 'varchar', nullable: true })
  public ban_reason: banDueTo;

  @ApiProperty({
    type: Date,
    example: '6d',
    description:
      'Time after that user can do things, that he cought before ban',
  })
  @Column({ type: 'date', nullable: true })
  public ban_time: Date;

  @ApiProperty({ type: () => banDTO, example: '', description: '' })
  @Column({ type: 'varchar', nullable: true })
  public banDTO: banDTO;

  @ApiProperty({
    type: Boolean,
    example: 'true',
    description:
      'From that param dependency Users functionality, because if he didn"t activate account he can"t use some functions(or all?)',
  })
  @Column({ type: 'boolean', nullable: true, default: false })
  public activate: boolean;

  @ApiProperty({
    type: String,
    example: 'sime_link',
    description: 'Link of the activation sending to the user mail',
  })
  @Column({ type: 'varchar', nullable: true })
  public activate_link: string;

  @ApiProperty({
    type: () => RoleEntity,
    example: 'User',
    description: 'Role of the user(Logic dependency by her)',
  })
  @OneToOne(() => RoleEntity, (role) => role)
  public role: RoleEntity;

  @ApiProperty({
    type: () => PinEntity,
    example: '[Joel with gunshot, atomic flower, Grizli bear]',
    description: 'Saved Pin of the user',
  })
  @Field((type) => [PinEntity], { nullable: true })
  @OneToMany(() => PinEntity, (pin) => pin.author)
  public pins: PinEntity[];

  @ApiProperty({
    type: () => BoardEntity,
    example: 'Uncharted 4, Tlou2, Joel has been right',
    description: 'Username of the user',
  })
  @Field((type) => [BoardEntity], { nullable: true })
  @OneToMany(() => BoardEntity, (board) => board.author)
  public boards: BoardEntity[];

  @ApiProperty({
    type: () => HistoryEntity,
    example:
      '[No country for old man, Anton Chigur, Arthur Morgan, Petya Leviy]',
    description: 'History about what user seen last few hour or all time',
  })
  @OneToMany(() => HistoryEntity, (history) => history.user)
  @JoinColumn()
  public history: HistoryEntity[];

  @ApiProperty({
    type: () => CommentEntity,
    example:
      '{pin: "Ellie love Dina", text: "I Love her like a man", date: 05.05.2020}',
    description: 'Comments of the user(which had written theme)',
  })
  @OneToMany(() => CommentEntity, (comment) => comment.author)
  public comments: CommentEntity[]; //Todo: Fix structure of that later...

  @ApiProperty({
    type: String,
    example: 'Kasha',
    description: 'Link, which user would be share with him friends',
  })
  @Column({ type: 'varchar', nullable: false })
  public profile_link: string;

  @ApiProperty({
    type: () => AccountSettingsEntity,
    example: 'App theme: light [:(]',
    description: 'Settings of the user account',
  })
  @OneToOne(() => AccountSettingsEntity, (settings) => settings.user)
  @JoinColumn()
  public user_settings: AccountSettingsEntity;

  @ApiProperty({ type: () => FileEntity, example: '', description: '' })
  @OneToMany(() => FileEntity, (file) => file)
  public files: FileEntity[];

  @ApiProperty({
    type: () => NotificationEntity,
    description: 'User has a some notifications',
  })
  @ManyToMany(() => NotificationEntity, (notification) => notification)
  @JoinTable()
  public notifications: NotificationEntity[];

  @ApiProperty({
    type: () => ChatEntity,
    description: 'Chat of the current user',
    example: 'Arkadiy',
  })
  @OneToMany(() => ChatEntity, (chat) => chat.channelName)
  public chat: ChatEntity[];
}
