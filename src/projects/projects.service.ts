import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from '../users/user.entity';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createProject(dto: CreateProjectDto, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const projeto = this.projectRepository.create({ ...dto, owner: user });
    return this.projectRepository.save(projeto);
  }

  findAllByUser(userId: number) {
    return this.projectRepository.find({
      where: { owner: { id: userId } },
      relations: ['tasks'],
    });
  }

  update(id: number, data: UpdateProjectDto) {
      return this.projectRepository.update(id, data);
    }

  remove(id: number) {
    return this.projectRepository.delete(id);
  }
}
