import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import CreateUserDTO from '../dto/users.dto';

@Injectable()
export class AuthPipe implements PipeTransform {
  transform(value: CreateUserDTO<string>, metadata: ArgumentMetadata) {
    const validateUsername = new RegExp(/\w+/g);
    const validatePassword = new RegExp(/^[a-zA-Z0-9].{8, 16}/);
    const validateEmail = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z].{2,3}/);
    const validatePhoto = new RegExp(/\.(gif|jpe?g|tiff?|webp|bmp)$/i);

    // if (validateUsername.test(username))
    //   throw new HttpException(
    //     'Имя пользователя должно содержать заглавные буквы и числа',
    //     HttpStatus.FORBIDDEN,
    //   );

    // if (validatePassword.test(password))
    //   throw new HttpException(
    //     'Пароль должен содержать одну заглавную букву и цифры',
    //     HttpStatus.FORBIDDEN,
    //   );

    // if (validateEmail.test(email))
    //   throw new HttpException(
    //     'Email должен содеражть "@"',
    //     HttpStatus.FORBIDDEN,
    //   );

    // if (validatePhoto.test(photo))
    //   throw new HttpException(
    //     `Вы не можете вставлять гифку ${photo}, только .jpg и .png`,
    //     HttpStatus.FORBIDDEN,
    //   );

    return value;
  }
}
