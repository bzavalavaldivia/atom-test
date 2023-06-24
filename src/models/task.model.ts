enum TaskStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
}

export class Task {
  id!: number;
  title!: string;
  description!: string;
  status!: TaskStatus;
}
