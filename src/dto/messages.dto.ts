import UserEntity from '../entities/users.entity';

export type pinMedia = 'Board' | 'Pin';

export default interface CreateMessagesDTO<T> {
  readonly owner: UserEntity;
  readonly text: T;
  readonly media: T;
  readonly pinMedia: T;
  readonly time: Date;
  readonly catcher: UserEntity;
}
