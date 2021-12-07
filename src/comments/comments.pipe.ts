import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CommentsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
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
      'нигер',
      'снежинка',
      'чурка',
    ];

    if (value.includes({ ...badWords })) {
    }

    return value;
  }
}
