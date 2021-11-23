export type theme = 'Light' | 'Dark';
export type notification_type = 'application' | 'email';

export default interface UpdateSettingsDTO<T> {
  readonly app_theme: theme;
  readonly sounds: T;
  readonly deactivate: T;
  readonly notifications: notification_type;
}
