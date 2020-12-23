import { PersistedToDoItem, TodoGroupByStatus, TodoStatus, ToDoSummaryCounts } from '../interfaces/interfaces';

export type GroupByStatusAndIncludeSummary = {
  summary: ToDoSummaryCounts;
  todos: TodoGroupByStatus;
};

const sortByPriorityAndAction = (previous: PersistedToDoItem, compare: PersistedToDoItem): number => {
  // Sort by priority first
  if (previous.priority > compare.priority) {
    return 1;
  }

  if (previous.priority < compare.priority) {
    return -1;
  }

  // If the priority is identical then order by action
  if (previous.priority === compare.priority) {
    // Sort by action
    if (previous.action > compare.action) {
      return 1;
    }

    if (previous.action < compare.action) {
      return -1;
    }
  }

  return 0;
};

export const groupByStatusAndSummary = (allTodos: PersistedToDoItem[]): GroupByStatusAndIncludeSummary => {
  const activeTodos = allTodos.filter(({ state }) => state === TodoStatus.Active).sort(sortByPriorityAndAction);
  const completedTodos = allTodos.filter(({ state }) => state === TodoStatus.Completed).sort(sortByPriorityAndAction);
  const deletedTodos = allTodos.filter(({ state }) => state === TodoStatus.Deleted).sort(sortByPriorityAndAction);

  return {
    summary: {
      [TodoStatus.Active]: activeTodos.length,
      [TodoStatus.Completed]: completedTodos.length,
      [TodoStatus.Deleted]: deletedTodos.length,
    },
    todos: {
      [TodoStatus.Active]: activeTodos,
      [TodoStatus.Completed]: completedTodos,
      [TodoStatus.Deleted]: deletedTodos,
    },
  };
};
