import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { AlreadExistsError, TaskIdNotFound } from './tasks-custom.error';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  // :::::::::::::::::: GET ALL TASK ::::::::::::::::::
  getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  // :::::::::::::::::: GET TASK BY ID ::::::::::::::::::
  async getTaskByID(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });

    if (!found) {
      throw new TaskIdNotFound(`Task with ID: ${id} not found`);
    }

    return found;
  }

  // :::::::::::::::::: CREATE TASK ::::::::::::::::::
  async createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = CreateTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.tasksRepository.save(task);
    return task;
  }

  // :::::::::::::::::: DELETE TASK BY ID ::::::::::::::::::
  async deleteTaskByID(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new TaskIdNotFound(`Task with ID: ${id} not found`);
    }
  }

  // :::::::::::::::::: UPDATE TASK STATUS BY ID ::::::::::::::::::
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task: Task = await this.getTaskByID(id);

    // http Exception arises if same status is passed
    if (task.status === status) {
      throw new AlreadExistsError(`Status is already ${status}`);
    }

    // Update required column
    task.status = status;

    // Save after update object
    await this.tasksRepository.save(task);

    return task;
  }
}
