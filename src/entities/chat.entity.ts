import { ApiProperty } from '@nestjs/swagger';
import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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
    type: () => UserEntity,
    example: 'Arkadiy',
    description: 'Main, which created that chat',
  })
  @OneToOne(() => UserEntity, (user) => user)
  public owner: UserEntity;
}
