import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import UserEntity from './users.entity';

@Entity({ name: 'messages' })
export default class MessageEntity {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Autogenerated primary key of the column',
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    type: () => UserEntity,
    example: 'Arakdiy',
    description: 'The author of the message',
  })
  @ManyToOne(() => UserEntity, (user) => user)
  public author: UserEntity;

  @ApiProperty({
    type: () => UserEntity,
    example: 'Eva',
    description: 'Catcher of the message(one to one chat)',
  })
  @ManyToOne(() => UserEntity, (user) => user)
  public catcher: UserEntity;

  @ApiProperty({
    type: Date,
    example: '(24.02.2020) - 14:15am',
    description: 'Time of the message sending',
  })
  @Column({ type: Date, nullable: false })
  public date: Date;

  @ApiProperty({
    type: String,
    example: 'Hello Eva, how are you?)',
    description: 'Text of the message',
  })
  @Column({ type: String, nullable: false })
  public text: string;
}
