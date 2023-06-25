import { Schema, ValidationResult } from 'joi';
import { Task } from '../models/task.model';

export const validateRequest = (schema: Schema, data: Task): ValidationResult => {
  return schema.validate(data);
};
