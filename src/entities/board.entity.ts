import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import PinEntity from './pin.entity';
import UserEntity from './users.entity';
import NotesEntity from './notes.entity';

@Entity({ name: 'boards' })
@ObjectType('board')
export class BoardEntity {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Autogenerated primary key of the column',
  })
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    type: () => UserEntity,
    example: 'Arkadiy',
    description: 'Author of the board',
  })
  @Field((type) => [UserEntity], { nullable: false })
  @ManyToOne(() => UserEntity, (user) => user.boards)
  public author: UserEntity;

  @ApiProperty({
    type: String,
    example: 'Bird.jpg',
    description: 'Photo of the current board',
  })
  @Field()
  @Column({ type: 'varchar', nullable: false })
  public photo: string;

  @ApiProperty({
    type: String,
    example: 'Games',
    description: 'Title of the current board',
  })
  @Field()
  @Column({ type: 'varchar', nullable: false })
  public title: string;

  @ApiProperty({
    type: () => UserEntity,
    example: '[Ilya, EvaNikitin8]',
    description:
      'Collaborators - this is people, who can see this board if that is the privat and catch some updates',
  })
  @Field((type) => [UserEntity], { nullable: false })
  @OneToOne(() => UserEntity)
  @JoinColumn()
  public collaborators: UserEntity[];

  @ApiProperty({
    type: Boolean,
    example: 'true',
    description: 'Visibility for search by other users',
  })
  @Column({ type: 'boolean', nullable: true })
  public visibility: boolean;

  @ApiProperty({
    example: true,
    description:
      'If Board is private - no one can see it(exception -> collaborators, which user can added to his board)',
  })
  @Field()
  @Column({ type: Boolean, nullable: false })
  public private: boolean;

  @ApiProperty({
    type: () => NotesEntity,
    example: 'title: Add a new pins',
    description: 'Notes from the current board',
  })
  @Field((type) => [NotesEntity], { nullable: true })
  @OneToMany(() => NotesEntity, (notes) => notes)
  public notes: NotesEntity[];

  @ApiProperty({
    type: () => PinEntity,
    example: 'Angry birds',
    description: 'Pins, which placed in the current board',
  })
  @Field((type) => [PinEntity], { nullable: false })
  @OneToMany(() => PinEntity, (pin) => pin.board)
  public pins: PinEntity[];
}
