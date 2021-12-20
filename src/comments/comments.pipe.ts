import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
  Request,
} from '@nestjs/common';
import { PinsService } from '../pins/pins.service';

@Injectable()
export class CommentsPipe implements PipeTransform {
  constructor(
    @Request() private request: any,
    private pinsService: PinsService,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      const pin = await this.pinsService.getCurrentPin(value.title);
      let str;

      if (pin.censooret) {
        const badWords = [...pin.author.user_settings.filtration_words];

        for (let i = 1; i < badWords.length; i++) {
          str += pin.author.user_settings.filtration_figure;
        }

        this.request.censorText = str;
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
