import CreateNotesDTO from '../dto/notes.dto';
import NotesEntity from '../entities/notes.entity';
import { RequestCustom } from './auth.interface';

export default abstract class INotes<
  T = NotesEntity,
  R = number,
  C = string,
  K = RequestCustom,
  H = CreateNotesDTO<string>,
> {
  abstract getAllNotes(request: K, title: C): Promise<T[]>;
  abstract getCurrentNote(request: K, title: C, id: R): Promise<T>;
  abstract createNewNote(request: K, title: C, dto: H): Promise<T>;
  abstract updateCurrentNote(request: K, title: C, id: R, dto: H): Promise<T>;
  abstract deleteCurrentNote(request: K, title: C, id: R): Promise<R>;
}
