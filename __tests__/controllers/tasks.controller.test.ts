import request from 'supertest';
import app from '../../src/index';
import { Task } from '../../src/models/task.model';

let task: Task;

describe('Tasks Controller tests', () => {
  test('Create task', async () => {
    const res = await request(app).post('/tasks').send({
      title: 'Test task',
      description: 'Test description',
      status: 'PENDING',
    });
    expect(res.status).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('description');
    expect(res.body).toHaveProperty('status');
    task = res.body;
  });

  test('Get all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test('Get task by id', async () => {
    const res = await request(app).get(`/tasks/${task.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('description');
    expect(res.body).toHaveProperty('status');
  });

  test('Get task by id with wrong id', async () => {
    const res = await request(app).get('/tasks/123');
    expect(res.status).toBe(404);
    expect(JSON.parse(res.text)).toMatchObject({
      message: 'Task not found',
    });
  });

  test('Update task', async () => {
    const res = await request(app).put(`/tasks/${task.id}`).send({
      title: 'Test task updated',
      description: 'Test description updated',
      status: 'PENDING',
    });
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('description');
    expect(res.body).toHaveProperty('status');
  });

  test('Update task with wrong id', async () => {
    const res = await request(app).put('/tasks/123').send({
      title: 'Test task updated',
      description: 'Test description updated',
      status: 'PENDING',
    });
    expect(res.status).toBe(404);
    expect(JSON.parse(res.text)).toMatchObject({
      message: 'Task not found',
    });
  });

  test('Delete task', async () => {
    const res = await request(app).delete(`/tasks/${task.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('description');
    expect(res.body).toHaveProperty('status');
  });

  test('Delete task with wrong id', async () => {
    const res = await request(app).delete('/tasks/123');
    expect(res.status).toBe(404);
    expect(JSON.parse(res.text)).toMatchObject({
      message: 'Task not found',
    });
  });
});
