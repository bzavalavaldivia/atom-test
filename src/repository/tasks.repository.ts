// Create a firestore repository for tasks

// Path: src\repository\tasks.repository.ts

import { Service } from 'typedi';
import { db } from '../db/firestore';
import { Task } from '../models/task.model';

@Service()
export class TasksRepository {
  public async getTasks(): Promise<Task[]> {
    const tasks = await db.collection('tasks').get();
    return tasks.docs.map((task) => {
      return {
        id: task.id,
        ...task.data(),
      };
    }) as unknown as Task[];
  }

  public async getTaskById(id: string): Promise<Task> {
    const task = await db.collection('tasks').doc(id).get();
    return {
      id: task.id,
      ...task.data(),
    } as unknown as Task;
  }

  public async createTask(task: Task): Promise<Task> {
    const newTask = await db.collection('tasks').add(task);
    return {
      id: newTask.id,
      ...task,
    } as unknown as Task;
  }

  public async updateTask(id: string, task: Task): Promise<Task> {
    await db
      .collection('tasks')
      .doc(id)
      .update({ ...task });
    return {
      id,
      ...task,
    } as unknown as Task;
  }

  public async deleteTask(id: string): Promise<Task> {
    const task = await this.getTaskById(id);
    await db.collection('tasks').doc(id).delete();
    return task;
  }
}
