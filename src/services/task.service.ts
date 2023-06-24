import { TasksRepository } from '../repository/tasks.repository';
import { Task } from '../models/task.model';
import Container, { Service } from 'typedi';

const tasksRepository = Container.get(TasksRepository);

@Service()
export class TasksService {
  public async getTasks(): Promise<Task[]> {
    return await tasksRepository.getTasks();
  }

  public async getTaskById(id: string): Promise<Task> {
    return await tasksRepository.getTaskById(id);
  }

  public async createTask(task: Task): Promise<Task> {
    return await tasksRepository.createTask(task);
  }

  public async updateTask(id: string, task: Task): Promise<Task> {
    return await tasksRepository.updateTask(id, task);
  }

  public async deleteTask(id: string): Promise<Task> {
    return await tasksRepository.deleteTask(id);
  }
}
