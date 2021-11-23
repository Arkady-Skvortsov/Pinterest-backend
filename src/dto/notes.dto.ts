export type status = 'Done' | 'In progress' | 'Do it later';

export default interface CreateNotesDTO {
  title: string;
  text: string;
  status: status;
}
