import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';
import { Project } from '../projects/project.entity';
import { AuthModule } from '../auth/auth.module'; // <-- Importa o módulo que fornece JwtAuthGuard

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Project]),
    AuthModule, // <-- Adicionado
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
