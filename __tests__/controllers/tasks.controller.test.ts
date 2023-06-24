import request from 'supertest';
import app from '../../src/index';

describe('Tasks Controller tests', () => {
  test('Get all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test('Get task by id', async () => {
    const res = await request(app).get('/tasks/U50Ym1KGSDAeFR9xp9hu');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  test('Get task by id with wrong id', async () => {
    const res = await request(app).get('/tasks/123');
    expect(res.status).toBe(404);
    expect(JSON.parse(res.text)).toMatchObject({
      message: 'Task not found',
    });
  });
});
