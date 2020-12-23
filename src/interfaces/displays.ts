import { PriorityLevel, TodoStatus } from './interfaces';

export const TodoStatusDisplay = new Map<number, string>([
  [TodoStatus.Active, 'Active'],
  [TodoStatus.Completed, 'Completed'],
  [TodoStatus.Deleted, 'Deleted'],
]);

export const PriorityLevelDisplay = new Map<number, string>([
  [PriorityLevel.High, 'High'],
  [PriorityLevel.Medium, 'Medium'],
  [PriorityLevel.Low, 'Low'],
]);
