import { SetMetadata } from '@nestjs/common';
import { gMedia } from '../dto/media.dto';

export const Media = (media: gMedia) => SetMetadata('mediaType', media);
