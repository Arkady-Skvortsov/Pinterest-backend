import { SetMetadata } from '@nestjs/common';
import { gMedia } from '../dto/media.dto';

export const MediaType = (media: gMedia) => SetMetadata('mediaType', media);
