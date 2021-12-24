import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import CreateCommentDTO from './comment.dto';

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
  readonly author: T;

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

  @ApiProperty({ type: () => CreateCommentDTO, description: '', example: '' })
  readonly comments?: CreateCommentDTO<string>[];

  @ApiProperty({
    type: [String],
    example: '[Game, TLOU2, PS4]',
    description: 'List tags of the current Pin',
  })
  @Field(() => [String!])
  readonly tags: T[];
}
