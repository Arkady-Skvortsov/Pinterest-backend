import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import UserEntity from './users.entity';

@Entity({ name: 'files' })
export class FileEntity {
  @ApiProperty({
    type: Number,
    example: 12,
    description: 'Primary generated key of the table',
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    type: String,
    example: 'author.jpg',
    description: 'Name of the current file',
  })
  @Column({ type: 'varchar', nullable: false })
  public filename: string;

  @ApiProperty({
    type: String,
    example: '../assets/author.jpg',
    description: 'Path of the current file',
  })
  @Column({ type: 'varchar', nullable: false })
  public filepath: string;

  @ApiProperty({
    type: () => UserEntity,
    example: 'Arkadiy',
    description: 'User, which has a file',
  })
  @OneToOne(() => UserEntity, (user) => user)
  public user: UserEntity;
}
