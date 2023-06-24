import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Task } from './models/task.model';
import { db } from './db/firestore';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', async (_req: Request, res: Response) => {
  const tasks = await db
    .collection('tasks')
    .get()
    .then((snapshot) => {
      const tasks: Task[] = [];
      snapshot.forEach((doc) => {
        tasks.push(doc.data() as Task);
        console.log(doc.id, '=>', doc.data());
      });
      return tasks;
    });

  res.send(tasks);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
