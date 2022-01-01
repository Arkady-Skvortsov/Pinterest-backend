import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import CreateUserDTO, { gender } from '../dto/users.dto';
import { theme } from '../dto/user-settings.dto';
import UserEntity from './users.entity';

@Entity({ name: 'account_settings' })
export default class AccountSettingsEntity {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Autogenerated primary key',
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    type: () => UserEntity,
    example: 'Arkadiy',
    description: 'User, which use current settings',
  })
  @OneToOne(() => UserEntity, (user) => user.user_settings)
  public user: UserEntity;

  @ApiProperty({
    type: String,
    example: 'cat.jpg',
    description: 'Avatar of the current user',
  })
  @Column({ type: 'varchar', default: '', nullable: false })
  public avatar: string;

  @ApiProperty({
    type: Number,
    example: 13,
    description: 'Which author"s user like to see(them pins)',
  })
  @Column({ type: 'int', nullable: false, default: 0 })
  public subscribe_count: number;

  @ApiProperty({
    type: Number,
    example: 200,
    description: 'Subscribers of the current user',
  })
  @Column({ type: 'int', nullable: false, default: 0 })
  public subscribers_count: number;

  @ApiProperty({
    type: () => UserEntity,
    example: '[Petya, Simpl@123, Lunaraxe63]',
    description: 'List of the likes subscribe authors of the current user',
  })
  @OneToMany(() => UserEntity, (user) => user)
  public subscribe_users: UserEntity[];

  @ApiProperty({
    type: () => UserEntity,
    example: '[Orlov_Viktor, Susi, Kettu16)]',
    description: 'List of the subscribers by current user',
  })
  @OneToMany(() => UserEntity, (user) => user)
  public subscribers_users: UserEntity[];

  @ApiProperty({
    type: String,
    example: 'some_example@gmail.com',
    description: 'Email address of the current user',
  })
  @Column({ type: 'varchar', nullable: false })
  public email: string;

  @ApiProperty({
    type: String,
    example: 'Adventurer; I was born in Tampere city)))',
    description: 'Information about User',
  })
  @Column({ type: 'text', nullable: false, default: '' })
  public about_me: string;

  @ApiProperty({
    type: String,
    example: 'Tampere, FI',
    description: 'Location of the current User',
  })
  @Column({ type: 'text', nullable: false, default: '' })
  public location: string;

  @ApiProperty({
    type: String,
    example: 'Arkadiy',
    description: 'Username of the user',
  })
  @Column({ type: 'text', nullable: true, default: '' })
  public website: string;

  @ApiProperty({
    type: String,
    example: 'Poland',
    description: 'Country (geolocation param) of the user',
  })
  @Column({ type: 'varchar', nullable: true, default: '' })
  public country: string;

  @ApiProperty({
    type: String,
    example: 'South',
    description: 'Region (geolocation param) of the user',
  })
  @Column({ type: 'varchar', nullable: true, default: '' })
  public region: string;

  @ApiProperty({
    type: String,
    example: 'Man',
    description: 'Gender of the user',
  })
  @Column({ type: 'varchar', nullable: true, default: '' })
  public gender: gender;

  @ApiProperty({
    type: Number,
    example: 23,
    description: 'Age of the user, which has it account',
  })
  @Column({ type: 'int', nullable: true, default: 0 })
  public age: number;

  @ApiProperty({
    type: String,
    example: 'Light',
    description: 'Color theme of the application, which can set a user',
  })
  @Column({ type: 'varchar', nullable: false, default: 'Light' })
  public app_theme: theme;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'If would be true -> than account become a private.!)',
  })
  @Column({ type: 'boolean', nullable: false, default: false })
  public deactivate: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
    description:
      'User has a chance switch on or switch off voices of the notification',
  })
  @Column({ type: 'boolean', nullable: false, default: false })
  public has_voices: boolean;

  @ApiProperty({
    type: String,
    example: 'newsound.mp3',
    description: 'Sound, which would be played when I catch a notification',
  })
  @Column({ type: 'varchar', nullable: true })
  public notification_voice: string;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'User can filter comment data under all his pins',
  })
  @Column({ type: 'boolean', nullable: false, default: false })
  public filtration: boolean;

  @ApiProperty({
    type: String,
    example: '💝',
    description: 'Figure, which would be using for close a bad word',
  })
  @Column({ type: 'varchar', nullable: true })
  public filtration_figure?: string;

  @ApiProperty({
    type: [String],
    example: '[бля, сука]',
    description: 'Words, which would be filtration OR banned :)',
  })
  @Column({ type: 'varchar', array: true })
  public filtration_words: string[];

  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'User can hide his profile from search system',
  })
  @Column({ type: 'boolean', nullable: false, default: false })
  public hide_profile: boolean;
}
