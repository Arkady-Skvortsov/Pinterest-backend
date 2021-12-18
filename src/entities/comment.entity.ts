import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from '@nestjs/graphql';
import UserEntity from './users.entity';
import PinEntity from './pin.entity';

@Entity({ name: 'comments' })
@ObjectType('comment')
export default class CommentEntity {
  @ApiProperty({
    example: 1,
    description: 'Autoincremented primary key of this column',
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    type: () => UserEntity,
    example: 'Arkadiy',
    description: 'Author of the current comment',
  })
  @ManyToOne(() => UserEntity, (user) => user.comments)
  public author: UserEntity;

  @ApiProperty({
    example: 23,
    description: 'Count of the likes under current comment',
  })
  @Column({ type: 'int', default: 0 })
  public like: number;

  @ApiProperty({
    type: String,
    example: 'Hyvin teksti',
    description: 'Text of the message',
  })
  @Column({ type: 'text', nullable: false })
  public text: string;

  @ApiProperty({
    type: String,
    example: 'Author.jpg',
    description: 'File for the response under current pin',
  })
  @Column({ type: 'varchar', nullable: true })
  public file: string;

  @ApiProperty({
    type: Date,
    example: '21:08pm (05.02.2021)',
    description: 'Date of comment sending',
  })
  @Column({ type: 'timestamptz', nullable: false })
  public date: Date;

  @ApiProperty({
    example: 'Alexey comment',
    description: 'Yeah, you are right))',
  })
  @OneToMany(() => CommentEntity, (comment) => comment.replies)
  public replies: CommentEntity[];

  @ApiProperty({
    type: () => PinEntity,
    example: 'Young fox around the trees))',
    description: 'Title of the Pin under that we had replied our response',
  })
  @Field((type) => PinEntity, { nullable: false })
  @ManyToOne(() => PinEntity, (pin) => pin.comments)
  public pin: PinEntity;
}
