export default abstract class IPins<T, R, H> {
  abstract getAllPins(): Promise<T[]>;
  abstract getCurrentPin(id: R): Promise<T>;
  abstract createNewPin(dto: H): Promise<T>;
  abstract updateCurrentPin(id: R, dto: H): Promise<T>;
  abstract deleteCurrentPin(id: R): Promise<R>;
}
