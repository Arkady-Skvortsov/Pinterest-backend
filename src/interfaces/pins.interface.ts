import CreatePinDTO from '../dto/pin.dto';
import PinEntity from '../entities/pin.entity';
import { RequestCustom } from './auth.interface';

export default abstract class IPins<
  T = PinEntity,
  R = string,
  H = CreatePinDTO,
  K = RequestCustom,
> {
  abstract getAllPins(): Promise<T[]>;
  abstract getCurrentPin(title: R): Promise<T>;
  abstract createNewPin(request: K, dto: H): Promise<T>;
  abstract updateCurrentPin(request: K, title: R, dto: H): Promise<T>;
  abstract deleteCurrentPin(request: K, title: R): Promise<R>;
}
