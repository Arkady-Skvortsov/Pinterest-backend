import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
  Request,
} from '@nestjs/common';
import { RequestCustom } from '../interfaces/auth.interface';

@Injectable()
export class MessagesPipe implements PipeTransform {
  constructor(@Request() private request: RequestCustom) {}

  transform(value: RequestCustom, metadata: ArgumentMetadata) {
    try {
      const chat = value.chat;
      let str;

      if (chat.censoret) {
        const badWords = [...chat.owner.user_settings.filtration_words];

        for (let i = 1; i < badWords.length; i++) {
          str += chat.owner.user_settings.filtration_figure;
        }

        this.request.censorText = str;
      }

      console.log(value, metadata);

      return value;
    } catch (e) {
      throw new HttpException(
        'Не удалось провалидировать сообщение',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
