export default interface CreateCommentDTO<T> {
  readonly author: T;
  readonly date: Date;
  readonly photo: Express.Multer.File;
  readonly title: T;
  readonly pin?: T;
}
