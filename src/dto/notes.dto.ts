export type status = 'Done' | 'In progress' | 'Do it later';

export default interface CreateNotesDTO<T> {
  title: T;
  text: T;
  status: status;
}
