import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { attachControllers, ERROR_MIDDLEWARE } from '@decorators/express';
import { TasksController } from './controllers/tasks.controller';
import { Container } from '@decorators/di';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

function serverErrorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
  next();
}

Container.provide([{ provide: ERROR_MIDDLEWARE, useValue: serverErrorMiddleware }]);

app.use(express.json());

attachControllers(app, [TasksController]);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
