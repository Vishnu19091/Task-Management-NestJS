import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: 'admin',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
    })
  ],
})
export class AppModule {}
