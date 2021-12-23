import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import CreateNotesDTO from './notes.dto';
import CreatePinDTO from './pin.dto';
import CreateUserDTO from './users.dto';

@InputType('CreateBoardDTO')
export default class CreateBoardDTO<T = string> {
  @ApiProperty({
    type: String,
    example: 'Tlou2 art',
    description: 'Title of the current Board',
  })
  @Field(() => String!)
  readonly title: T;

  @ApiProperty({
    type: String,
    example: 'Ellie.jpg',
    description: 'Photo of the current Board',
  })
  @Field(() => String!)
  readonly photo: Express.Multer.File;

  @ApiProperty({
    type: String,
    example: 'Arkadiy',
    description: 'Author of the current board',
  })
  @Field(() => String!)
  readonly author: CreateUserDTO<string>;

  @ApiProperty({
    type: [String],
    example: '[Arkadiy, Eva, Natasha]',
    description:
      'Users, which can change a current board with u (like author) :)',
  })
  @Field(() => String, { nullable: true })
  readonly collaborators?: CreateUserDTO<string>[]; //Todo: Fix that value later

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Can users see you"r board OR no',
  })
  @Field(() => Boolean, { nullable: true })
  readonly private?: boolean;

  @ApiProperty({
    type: [String],
    example: '{text: "I need to try it thing later...."}',
    description: 'some note in you"r Pin',
  })
  @Field((type) => String!, { nullable: true })
  readonly notes?: CreateNotesDTO<string>[];

  @ApiProperty({
    type: [],
    example: '[TLOu2, Rdr2, PS5, Anime]',
    description: 'Pins, which can sended into current pin when he has created',
  })
  @Field((type) => String, { nullable: true })
  readonly pins?: CreatePinDTO[];
}
