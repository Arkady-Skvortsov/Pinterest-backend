import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import UserEntity from './users.entity';

@Entity({ name: 'roles' })
export default class RoleEntity {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Autoincremented primary key of the column',
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    type: String,
    example: 'Admin',
    description: 'Title of the role',
  })
  @Column({ type: 'varchar', unique: true, nullable: true })
  public title: string;

  @ApiProperty({
    type: String,
    example:
      'Admin would give you special patrols(you can ban users and do some interesting things',
    description: 'Description of the role',
  })
  @Column({ type: 'varchar', nullable: true })
  public description: string;

  @ApiProperty({ type: () => UserEntity, example: '', description: '' })
  @OneToOne(() => UserEntity, (user) => user)
  public role: UserEntity;
}
