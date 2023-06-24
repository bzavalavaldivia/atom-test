import { Controller, Delete, Get, Params, Post, Put, Request, Response } from '@decorators/express';
import { Task } from '../models/task.model';
import { TasksService } from '../services/task.service';
import Container from 'typedi';
import Joi from 'joi';
import { Response as ExpressResponse } from 'express';

const tasksService = Container.get(TasksService);

@Controller('/tasks')
export class TasksController {
  @Get('/')
  public async getTasks(): Promise<Task[]> {
    return tasksService.getTasks();
  }

  @Get('/:id')
  public async getTaskById(@Params('id') id: string): Promise<Task> {
    return tasksService.getTaskById(id);
  }

  @Post('/')
  public async createTask(@Response() res: Response, @Request() req: Request): Promise<Task> {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.valid('COMPLETED', 'PENDING').required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      (res as unknown as ExpressResponse).status(400).json({
        message: error.message,
      });
    }

    return tasksService.createTask(value);
  }

  @Put('/:id')
  public async updateTask(@Response() res: Response, @Params('id') id: string, @Request() req: Request): Promise<Task> {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.valid('COMPLETED', 'PENDING').required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      (res as unknown as ExpressResponse).status(400).json({
        message: error.message,
      });
    }

    return tasksService.updateTask(id, value);
  }

  @Delete('/:id')
  public async deleteTask(@Params('id') id: string): Promise<Task> {
    return await tasksService.deleteTask(id);
  }
}
