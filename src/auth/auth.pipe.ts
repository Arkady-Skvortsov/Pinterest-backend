import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class AuthPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const validateUsername = new RegExp(/\[A-Z]/g);
      const validatePassword = new RegExp(/\[A-Z]/g);
      const validateEmail = new RegExp(/\[A-Z]/g);

      console.log(value, metadata);

      return value;
    } catch (e) {
      throw new HttpException('Данные не валидны', HttpStatus.FORBIDDEN);
    }
  }
}
