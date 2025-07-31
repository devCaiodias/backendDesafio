import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Req,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() dto: CreateProjectDto, @Req() req) {
    const userId = req.user.userId;
    return this.projectsService.createProject(dto, userId);
  }

  @Get()
  async findAll(@Request() req) {
    const userId = req.user.userId;
    return this.projectsService.findAllByUser(userId);
  }

  @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
      return this.projectsService.update(+id, dto);
    }

  @Delete(':id')
    remove(@Param('id') id: string) {
      return this.projectsService.remove(+id);
    }
}
