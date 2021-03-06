import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BoardEntity } from './board.entity';
import CommentEntity from './comment.entity';
import PinEntity from './pin.entity';
import UserEntity from './users.entity';

@Entity({ name: 'histories' })
export default class HistoryEntity {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Autogenerated primary key for that table',
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    type: () => UserEntity,
    example: 'Misha, Daniil, Seva, Masha, Arkasha',
    description: 'User, which has that history about seen pins',
  })
  @ManyToOne(() => UserEntity, (user) => user.username)
  public user: UserEntity;

  @ApiProperty({
    type: () => PinEntity,
    example: 'Star Butterfly, TLOU2, Finnish Language, Programming',
    description: 'Pin, which would be in history',
  })
  @OneToMany(() => PinEntity, (pin) => pin)
  public saved_pins: PinEntity[];

  @ApiProperty({ type: () => BoardEntity, example: '', description: '' })
  @OneToMany(() => BoardEntity, (board) => board)
  public saved_boards: BoardEntity[];
}
