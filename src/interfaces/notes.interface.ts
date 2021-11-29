export default abstract class INotes<T, R, H> {
  abstract getAllNotes(): Promise<T[]>;
  abstract getCurrentNote(): Promise<T>;
  abstract createNewNote(): Promise<T>;
  abstract updateCurrentNote(): Promise<T>;
  abstract deleteCurrentNote(id: R): Promise<R>;
}
