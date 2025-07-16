import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskByID(@Param('id') id: string): Promise<Task>{
    return this.tasksService.getTaskByID(id);
  }
  
  @Delete('/:id')
  deleteTaskByID(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskByID(id)
  }

  // In this approach we can give whatever parameters to the body.
  // In simple this is bad approach as this could pass unknown parameters
  //   @Post()
  //   createTask(@Body() body) {
  //     console.log('body', body);
  //   }

  @Post()
  creatTask(
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: updateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}