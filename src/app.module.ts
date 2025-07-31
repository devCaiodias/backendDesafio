import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Project } from './projects/project.entity';
import { Task } from './tasks/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.USERNAMEDB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASEDB,
      entities: [User, Project, Task],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProjectsModule,
    TasksModule,
  ],
  exports: [TypeOrmModule]
})
export class AppModule {}
