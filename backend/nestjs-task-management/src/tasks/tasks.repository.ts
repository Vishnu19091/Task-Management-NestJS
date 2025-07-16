import { DataSource, Repository } from 'typeorm';
import { Task } from "./task.entity";
import { Injectable } from '@nestjs/common';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
    constructor(private datasource: DataSource) {
        super(Task, datasource.createEntityManager());
    }

    // Query builder
    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
        const { status, search } = filterDto;

        const query = this.createQueryBuilder('task');

        // if (status) {
        //     query.andWhere('task')
        // }
            
        // if (search) {
            
        // }

        const tasks = await query.getMany();
        return tasks;
    }
}