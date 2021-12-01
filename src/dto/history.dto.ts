import UserEntity from '../entities/users.entity';
import PinEntity from '../entities/pin.entity';

// export default interface CreateCommentDTO<T> {
//   readonly author: UserEntity;
//   readonly date: Date;
//   readonly photo: Express.Multer.File;
//   readonly title: T;
//   readonly pin?: PinEntity;
// }

export default interface CreateHistoryDTO {
  somthing: string;
}
