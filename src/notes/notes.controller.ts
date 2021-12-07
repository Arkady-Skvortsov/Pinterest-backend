import { AuthGuard } from '../auth/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { AccessGuard } from '../media/access.guard';
import { VisibilityGuard } from '../media/visibility.guard';
import CreateNotesDTO from '../dto/notes.dto';
import NotesEntity from '../entities/notes.entity';

@ApiTags('Notes')
@UseGuards(AuthGuard, VisibilityGuard, AccessGuard)
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @ApiOperation({ summary: 'Get all notes from current board' })
  @ApiResponse({ type: () => [NotesEntity], status: 200 })
  @Get('/all/:title')
  async getAllNotes(@Param('title') title: string) {
    try {
      return this.notesService.getAllNotes('', title);
    } catch (e) {
      throw new HttpException(
        `Не удалось получить все заметки под доской "${title}""`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Get current note under current board' })
  @ApiResponse({ type: () => NotesEntity, status: 200 })
  @Get('/current/:title/:id')
  async getCurrentNote(@Param('title') title: string, @Param('id') id: number) {
    try {
      return this.notesService.getCurrentNote('', title, id);
    } catch (e) {
      throw new HttpException(
        `Не удалось получить заметку "${id}" под пином "${title}"`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Create new note under current board' })
  @ApiResponse({ type: () => NotesEntity, status: 201 })
  @Post('/create/:title')
  async createCurrentNote(
    @Param('title') title: string,
    @Body() dto: CreateNotesDTO<string>,
  ) {
    try {
      return this.notesService.createNewNote('', title, dto);
    } catch (e) {
      throw new HttpException(
        `Не удалось создать новую заметку "${dto.title}" под пином ${title}`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Update a current note under current board' })
  @ApiResponse({ type: () => NotesEntity, status: 203 })
  @Put('/update/:title/:id')
  async updateCurrentNote(
    @Param('title') title: string,
    @Param('id') id: number,
    @Body() dto: CreateNotesDTO<string>,
  ) {
    try {
      return this.notesService.updateCurrentNote('', title, id, dto);
    } catch (e) {
      throw new HttpException(
        `Не удалось обновить заметку "${id}" под доской "${title}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Delete current note under current board' })
  @ApiResponse({ type: () => Number, status: 204 })
  @Delete('/delete/:title/:id')
  async deleteCurrentNote(
    @Param('title') title: string,
    @Param('id') id: number,
  ) {
    try {
      return this.notesService.deleteCurrentNote('', title, id);
    } catch (e) {
      throw new HttpException(
        `Не удалось удалить заметку "${id}" под доской "${title}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
