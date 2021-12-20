import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { status } from '../dto/notes.dto';
import { BoardEntity } from './board.entity';

@Entity({ name: 'notes' })
@ObjectType('notes')
export default class NotesEntity {
  @ApiProperty({ example: 2, description: 'Autogenerated primary key' })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    example: 'Add new pin into current board',
    description: 'Title of the Note',
  })
  @Column({ type: 'varchar' })
  public title: string;

  @ApiProperty({
    type: String,
    example:
      "I had liked 2 some cool pins: 1) Uncharted 4 A thief's end and 2) Young Nathan Drake",
    description: 'Text which has a note',
  })
  @Column({ type: 'varchar' })
  public text: string;

  @ApiProperty({
    example: 'In progress',
    description: 'Status of the note activity',
  })
  @Column({ type: 'varchar' })
  public status: status;

  @ApiProperty({
    type: [String],
    example: 'hello.jpg',
    description: 'photo liek a response in note',
  })
  @Column({ type: 'varchar', nullable: false })
  public photos?: string[];

  @ApiProperty({
    type: () => BoardEntity,
    example: 'Best game ever',
    description: 'Current board for current note',
  })
  @Field((type) => BoardEntity, { nullable: false })
  @ManyToOne(() => BoardEntity, (board) => board)
  public board: BoardEntity;
}
