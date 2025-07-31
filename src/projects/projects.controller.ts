import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

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
}
