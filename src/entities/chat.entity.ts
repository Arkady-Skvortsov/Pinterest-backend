import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import UserEntity from './users.entity';

@Entity({ name: 'chats' })
export default class ChatEntity {
  @ApiProperty({
    type: Number,
    example: 23,
    description: 'Primary generated key for the table',
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    type: String,
    example: 'Sergey',
    description: 'Name of the current websocket channel',
  })
  @Column({ type: 'varchar', nullable: false })
  public channelName: string;

  @ApiProperty({
    type: () => UserEntity,
    example: 'Arkadiy',
    description: 'Main, which created that chat',
  })
  @OneToOne(() => UserEntity, (user) => user)
  public owner: UserEntity;

  @ApiProperty({
    type: () => UserEntity,
    example: 'Eva',
    description: 'Catcher',
  })
  @OneToOne(() => UserEntity, (user) => user)
  public catcher: UserEntity;

  // @ApiProperty({ type: () => [MessageEntity], example: '', description: '' })
  // @OneToMany(() => MessageEntity, (message) => message)
  // public messages: MessageEntity[];

  @ApiProperty({ type: Boolean, example: false, description: '' })
  @Column({ type: 'boolean', nullable: true })
  public mute: boolean;

  @ApiProperty({ type: Boolean, example: true, description: '' })
  @Column({ type: 'boolean', nullable: true })
  public censoret: boolean;
}
