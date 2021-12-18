import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import CommentEntity from './comment.entity';
import UserEntity from './users.entity';
import { BoardEntity } from './board.entity';

@Entity({ name: 'pins' })
@ObjectType('pin')
export default class PinEntity {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Autogenerated primary key of the current column',
  })
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    type: () => UserEntity,
    example: 'EvaNikitin8)',
    description: 'Author of the current Pin',
  })
  @Field((type) => UserEntity, { nullable: false })
  @ManyToOne(() => UserEntity, (user) => user.pins)
  public author!: UserEntity;

  @ApiProperty({
    type: String,
    example: 'Little_Fox.jpg',
    description: 'Photo of the current Pin',
  })
  @Field()
  @Column({ type: 'varchar', nullable: false })
  public photo!: string;

  @ApiProperty({
    type: [String],
    example: '[first.jpg, second.jpg]',
    description: 'Collection of the photos for the current pin',
  })
  @Column({ type: 'varchar', nullable: false, array: true })
  public photo_collection?: string[];

  @ApiProperty({
    type: Boolean,
    example: 'false',
    description: 'Visibility - it"s param for searching by other user',
  })
  @Column({ type: 'boolean', nullable: true })
  public visibility: boolean;

  @ApiProperty({
    type: () => BoardEntity,
    example: 'Uncharted 4',
    description: 'Board, which Pin was catching...',
  })
  @Field(() => BoardEntity, { nullable: false })
  @ManyToOne(() => BoardEntity, (board) => board.pins)
  public board?: BoardEntity;

  @ApiProperty({
    type: () => CommentEntity,
    example: 'Hyvää Pina, kettu',
    description: 'Comment of the current Pin',
  })
  @Field(() => [CommentEntity], { nullable: true })
  @OneToMany(() => CommentEntity, (comment) => comment.pin)
  public comments: CommentEntity[];

  @ApiProperty({
    type: String,
    example: 'kettujasusi.com',
    description:
      'Link of the website, where author has information about Pin (or) where he had catched Pin',
  })
  @Field()
  @Column({ type: 'varchar', nullable: true })
  public website: string;

  @ApiProperty({
    type: Number,
    example: 23,
    description: 'Count of the current pin likes',
  })
  @Field()
  @Column({ type: 'bigint', default: 0 })
  public like: number;

  @ApiProperty({
    type: String,
    example: 'Little foxy',
    description: 'Title of the Pin',
  })
  @Field()
  @Column({ type: 'varchar', nullable: false, default: 'hey' })
  public title: string;

  @ApiProperty({
    type: String,
    example:
      'A little fox just go to sleep from bad day, but we have a hope, that her oportunity grow up so soon',
    description: 'Description of Pin',
  })
  @Field()
  @Column({ type: 'varchar', default: '', nullable: true })
  public description: string;

  @ApiProperty({
    type: [String],
    example: 'Animals, Fox',
    description: 'Tags of the current Pin',
  })
  @Field((returns) => [String!])
  @Column('varchar', { array: true, nullable: false })
  public tags: string[];

  @ApiProperty({
    type: String,
    example: true,
    description: "You need to invite someone to see you'r private Pin",
  })
  @Field()
  @Column({ type: 'boolean', default: false })
  public private: boolean;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Defense the comments under my my pin from bad words :)',
  })
  @Column({ type: 'boolean', default: false })
  public censooret: boolean;
}
