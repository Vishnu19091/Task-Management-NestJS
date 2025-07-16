import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { retry } from 'rxjs';
import { count } from 'console';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository:TasksRepository
  ){}
  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskWithFilters(filterDto: GetTaskFilterDto): Task[]{
  //   const { status, search } = filterDto;

  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.toLocaleLowerCase().includes(search) || task.description.toLocaleLowerCase().includes(search)) {
  //         return true;
  //       }

  //       return false;
  //     })
  //   }

  //   return tasks;
  // }

  async getAllTasks(): Promise<Task []>{
    const data = await this.tasksRepository.find();
    return data;
  }

  async getTaskByID(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({where:{id}});

    if (!found) {
      throw new NotFoundException(`Task with ID: ${id} not found`);
    }

    return found;
  }

  async createTask(CreateTaskDto:CreateTaskDto): Promise<Task> {
    const { title, description } = CreateTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.tasksRepository.save(task);
    return task;
  }

  // deleteTaskByID(id: string): void {
  //   const found = this.getTaskByID(id)
  //   this.tasks = this.tasks.filter((task) => found.id !== id)
  // }

  deleteTaskByID(id: string): void{
    if (!this.getTaskByID(id)) {
      throw new NotFoundException(`Task with ID: ${id} not found`);
    }
    else {
      this.tasksRepository.delete(id);
    }
  }

  
  // createTask(CreateTaskDto): Task {
  //   const {title, description} = CreateTaskDto
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task: Task = this.getTaskByID(id);
  // if (!task) {
  //   throw new Error(`Task with ID ${id} not found`);
  // }
  // task.status = status;
  // return task;
  // }
}
