import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import UserEntity from './users.entity';

@Entity({ name: 'roles' })
export default class RoleEntity {
  @ApiProperty({
    example: 1,
    description: 'Autoincremented primary key of the column',
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({ example: 'Admin', description: 'Title of the role' })
  @Column({ type: 'varchar', unique: true, nullable: true })
  public title: string;

  @ApiProperty({
    type: () => UserEntity,
    example: 'Arkadiy',
    description: 'User, which has some role',
  })
  @OneToOne(() => UserEntity, (user) => user.username)
  public user: UserEntity;

  @ApiProperty({
    example:
      'Admin would give you special patrols(you can ban users and do some interesting things',
    description: 'Description of the role',
  })
  @Column({ type: 'varchar', nullable: true })
  public description: string;
}
