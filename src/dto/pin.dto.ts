import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import UserEntity from '../entities/users.entity';
import CommentEntity from '../entities/comment.entity';
import CreateCommentDTO from './comment.dto';
import CreateUserDTO from './users.dto';

@InputType('CreatePinDTO')
export default class CreatePinDTO<T = string> {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Key of the current table',
  })
  readonly id?: number;

  @ApiProperty({
    type: String,
    example: 'Arkadiy123',
    description: 'Author of the current Pin',
  })
  @Field(() => String!)
  readonly author: CreateUserDTO;

  @ApiProperty({
    type: String,
    example: 'https://website.com',
    description: 'Website of the current Pin',
  })
  @Field(() => String!)
  readonly website?: T;

  @ApiProperty({
    type: String,
    example: 'TLOU2 art',
    description: 'Title of the current Pin',
  })
  @Field(() => String!)
  readonly title: T;

  @ApiProperty({ example: 'file.jpg', description: 'Photo of the current Pin' })
  @Field(() => String!)
  readonly photo: Express.Multer.File;

  @ApiProperty({
    type: Number,
    example: 23,
    description: 'Count of likes under pin',
  })
  @Field(() => Int)
  like?: number;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Excees type of the current Pins',
  })
  @Field({ nullable: true, defaultValue: false })
  readonly private?: boolean;

  @ApiProperty({
    type: String,
    example: 'The last of us 2 - Abby cool art',
    description: 'Description of the current Pin',
  })
  @Field(() => String!)
  readonly description: T;

  @ApiProperty({ type: () => [CommentEntity], description: '', example: '' })
  readonly comments?: CommentEntity[];

  @ApiProperty({
    type: [String],
    example: '[Game, TLOU2, PS4]',
    description: 'List tags of the current Pin',
  })
  @Field(() => [String!])
  readonly tags: T[];
}
