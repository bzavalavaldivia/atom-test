export enum TaskStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
}

export class Task {
  id?: string;
  title!: string;
  description!: string;
  status!: TaskStatus;
}
