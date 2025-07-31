import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Project } from '../projects/project.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  async create(data: CreateTaskDto) {
    const project = await this.projectRepo.findOneBy({ id: data.projetoId });
    if (!project) throw new Error('Projeto não encontrado');

    const task = this.taskRepo.create({
      titulo: data.titulo,
      descricao: data.descricao,
      projeto: project,
    });

    return this.taskRepo.save(task);
  }

  findAll() {
    return this.taskRepo.find({ relations: ['projeto'] });
  }

  findOne(id: number) {
    return this.taskRepo.findOne({ where: { id }, relations: ['projeto'] });
  }

  update(id: number, data: UpdateTaskDto) {
    return this.taskRepo.update(id, data);
  }

  remove(id: number) {
    return this.taskRepo.delete(id);
  }
}
