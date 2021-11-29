import UserEntity from 'src/entities/users.entity';

export default class CreateBoardDTO<T> {
  readonly title: T;
  readonly photo: Express.Multer.File;
  readonly author: T;
  readonly collaborators?: UserEntity[];
  readonly private: boolean;
  readonly notes?: [];
  readonly pins?: [];
}
