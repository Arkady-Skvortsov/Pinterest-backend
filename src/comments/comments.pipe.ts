import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { PinsService } from '../pins/pins.service';

@Injectable()
export class CommentsPipe implements PipeTransform {
  constructor(private pinsService: PinsService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      const pin = await this.pinsService.getCurrentPin(value.title);

      if (pin.censooret) {
        const badWords = [
          'блять',
          'еблан',
          'ебланка',
          'хуй',
          'хуйня',
          'говно',
          'пиздюк',
          'нахуя',
          'пидр',
          'пизда',
          'гомик',
          'срать',
          'ссать',
          'пердеть',
          'дристать',
          'говно',
          'жопа',
          'целка',
          'курва',
          'нигер',
          'снежинка',
          'гандон',
          'малафья',
          'чурка',
          'джуниор',
          'php разработчик',
          'галера',
        ];

        for (let i = 1; i < badWords.length; i++) {
          if (value.contains(badWords[i])) {
            value.replace('**************');
          }
        }

        console.log(value, metadata);

        return value;
      }
    } catch (e) {
      throw new HttpException('Press F to pay respect', HttpStatus.FORBIDDEN);
    }
  }
}
