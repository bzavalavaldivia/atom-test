import { Controller, Delete, Get, Params, Post, Put, Request, Response } from '@decorators/express';
import { Task } from '../models/task.model';
import { TasksService } from '../services/task.service';
import Container from 'typedi';
import { Response as ExpressResponse } from 'express';
import { validateRequest } from '../helpers/functions.helper';
import { taskSchema } from '../schemas/tasks.schema';

const tasksService = Container.get(TasksService);

@Controller('/tasks')
export class TasksController {
  @Get('/')
  public async getTasks(): Promise<Task[]> {
    return tasksService.getTasks();
  }

  @Get('/:id')
  public async getTaskById(@Response() res: ExpressResponse, @Params('id') id: string): Promise<Task> {
    const task = await tasksService.getTaskById(id);
    if (!task.title) res.status(404).json({ message: 'Task not found' });

    return task;
  }

  @Post('/')
  public async createTask(@Response() res: ExpressResponse, @Request() req: Request): Promise<void> {
    const { error, value } = validateRequest(taskSchema, req.body as unknown as Task);
    if (error) res.status(400).json({ message: error.message });

    res.status(201).json(await tasksService.createTask(value));
  }

  @Put('/:id')
  public async updateTask(@Response() res: ExpressResponse, @Params('id') id: string, @Request() req: Request): Promise<Task> {
    const task = await tasksService.getTaskById(id);
    if (!task.title) res.status(404).json({ message: 'Task not found' });

    const { error, value } = validateRequest(taskSchema, req.body as unknown as Task);
    if (error) res.status(400).json({ message: error.message });

    return await tasksService.updateTask(task.id as string, value);
  }

  @Delete('/:id')
  public async deleteTask(@Response() res: ExpressResponse, @Params('id') id: string): Promise<Task> {
    const task = await tasksService.getTaskById(id);
    if (!task.title) res.status(404).json({ message: 'Task not found' });

    return await tasksService.deleteTask(id);
  }
}
