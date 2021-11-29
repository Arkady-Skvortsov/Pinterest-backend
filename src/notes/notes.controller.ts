import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotesService } from './notes.service';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}
}
