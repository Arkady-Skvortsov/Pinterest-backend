import UpdateSettingsDTO from 'src/dto/user-settings.dto';
import AccountSettingsEntity from '../entities/account-settings.entity';
import { RequestCustom } from './auth.interface';

export default abstract class IUsersSettings<
  T = AccountSettingsEntity,
  K = RequestCustom,
  C = UpdateSettingsDTO<boolean, string>,
> {
  abstract getAllSettings(request: K): Promise<T[]>;
  abstract getCurrentSettings(request: K): Promise<T>;
  abstract updateCurrentSettings(request: K, dto: C): Promise<T>;
  abstract createNewSettings(request: K, dto: C): Promise<T>;
  abstract deleteCurrentSettings(request: K): Promise<T>;
}
