import { DataSource, Repository } from 'typeorm';
import { Task } from "./task.entity";
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksRepository extends Repository<Task> {
    constructor(private datasource: DataSource) {
        super(Task, datasource.createEntityManager());
    }
}