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
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { AuthGuard } from '../auth/auth.guard';
import { AccessGuard } from '../media/access.guard';
import { VisibilityGuard } from '../media/visibility.guard';
import CreateNotesDTO from '../dto/notes.dto';
import NotesEntity from '../entities/notes.entity';
import { RequestCustom } from '../interfaces/auth.interface';
import INotes from '../interfaces/notes.interface';

@ApiTags('Notes')
@UseGuards(AuthGuard, VisibilityGuard, AccessGuard)
@Controller('notes')
export class NotesController implements INotes {
  constructor(private notesService: NotesService) {}

  @ApiOperation({ summary: 'Get all notes from current board' })
  @ApiResponse({ type: () => [NotesEntity], status: 200 })
  @Get('/all/:title')
  async getAllNotes(
    @Request() request: RequestCustom,
    @Param('title') title: string,
  ) {
    try {
      return this.notesService.getAllNotes(request.user, title);
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
  async getCurrentNote(
    @Request() request: RequestCustom,
    @Param('title') title: string,
    @Param('id') id: number,
  ) {
    try {
      return this.notesService.getCurrentNote(request.user, title, id);
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
  async createNewNote(
    @Request() request: RequestCustom,
    @Param('title') title: string,
    @Body() dto: CreateNotesDTO<string>,
  ) {
    try {
      return this.notesService.createNewNote(request.user, title, dto);
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
    @Request() request: RequestCustom,
    @Param('title') title: string,
    @Param('id') id: number,
    @Body() dto: CreateNotesDTO<string>,
  ) {
    try {
      return this.notesService.updateCurrentNote(request.user, title, id, dto);
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
    @Request() request: RequestCustom,
    @Param('title') title: string,
    @Param('id') id: number,
  ) {
    try {
      return this.notesService.deleteCurrentNote(request.user, title, id);
    } catch (e) {
      throw new HttpException(
        `Не удалось удалить заметку "${id}" под доской "${title}"`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
