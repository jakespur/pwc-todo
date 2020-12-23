export enum PriorityLevel {
  High = 0,
  Medium = 1,
  Low = 2,
}

export enum TodoStatus {
  Deleted = 0,
  Active = 1,
  Completed = 2,
}

export type Deleted = 0;
export type Active = 1;
export type Completed = 2;

export type States = Deleted | Active | Completed;
export type ActionStates = Completed | Deleted;

export type UnPersistedToDo = {
  action: string;
  priority: PriorityLevel;
  state: States;
};

export type PersistedToDoItem = UnPersistedToDo & {
  id: number;
};

export type ToDoStateUpdate = {
  id: number;
  newState: ActionStates;
};

export type ToDoSummaryCounts = {
  [TodoStatus.Active]: number;
  [TodoStatus.Completed]: number;
  [TodoStatus.Deleted]: number;
  [name: number]: number;
};

export type TodoGroupByStatus = {
  [TodoStatus.Active]: PersistedToDoItem[];
  [TodoStatus.Completed]: PersistedToDoItem[];
  [TodoStatus.Deleted]: PersistedToDoItem[];
  [name: number]: PersistedToDoItem[];
};
