import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { RequestCustom } from '../interfaces/auth.interface';
import { PinsService } from '../pins/pins.service';

@Injectable()
export class CommentsPipe implements PipeTransform {
  constructor(private pinsService: PinsService) {}

  async transform(value: RequestCustom, metadata: ArgumentMetadata) {
    try {
      const pin = await this.pinsService.getCurrentPin(value.params.pinTitle);
      let str;

      if (pin.censooret) {
        const badWords = [...pin.author.user_settings.filtration_words];

        for (let i = 1; i < badWords.length; i++) {
          str += pin.author.user_settings.filtration_figure;
        }

        value.censorText = str;
      }

      console.log(str, value, metadata);

      return value;
    } catch (e) {
      throw new HttpException(
        `Не удалось провалидировать комментарии`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
