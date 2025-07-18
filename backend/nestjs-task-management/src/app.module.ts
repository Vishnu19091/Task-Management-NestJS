import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AppController } from './app.controller';

@Module({
  imports: [TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-nest',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
    })
  ],
  controllers:[AppController],
})
export class AppModule {}
