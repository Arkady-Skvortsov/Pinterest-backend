import UserEntity from '../entities/users.entity';

export default interface CreateBoardDTO<T> {
  readonly title: T;
  readonly photo?: T;
  readonly author: T;
  readonly collaborators?: UserEntity[];
  readonly private: boolean;
  readonly pins: T[];
}
