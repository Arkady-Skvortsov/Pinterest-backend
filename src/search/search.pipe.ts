import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SearchPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const badSearchWords = [];

    return value;
  }
}
