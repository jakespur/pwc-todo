import { groupByStatusAndSummary } from './groupByStatusAndSummary';
import { PersistedToDoItem, PriorityLevel, TodoStatus } from '../interfaces/interfaces';

describe('groupByStatusAndSummary', () => {
  it('takes an flat array of todos and groups and sorts', () => {
    const todos: PersistedToDoItem[] = [
      {
        id: 2,
        action: 'Run Linting',
        priority: PriorityLevel.High,
        state: TodoStatus.Active,
      },
      {
        id: 1,
        action: 'Add accessibility',
        priority: PriorityLevel.High,
        state: TodoStatus.Active,
      },
      {
        id: 3,
        action: 'Call back Hospital',
        priority: PriorityLevel.High,
        state: TodoStatus.Completed,
      },
      {
        id: 4,
        action: 'Cut Grass',
        priority: PriorityLevel.High,
        state: TodoStatus.Deleted,
      },
      {
        id: 5,
        action: 'Add e2e',
        priority: PriorityLevel.High,
        state: TodoStatus.Active,
      },
    ];

    // Potentially code use toMatchInlineSnapshot to save time
    expect(groupByStatusAndSummary(todos)).toEqual({
      summary: {
        [TodoStatus.Active]: 3,
        [TodoStatus.Completed]: 1,
        [TodoStatus.Deleted]: 1,
      },
      todos: {
        [TodoStatus.Active]: [
          {
            id: 1,
            action: 'Add accessibility',
            priority: PriorityLevel.High,
            state: TodoStatus.Active,
          },
          {
            id: 5,
            action: 'Add e2e',
            priority: PriorityLevel.High,
            state: TodoStatus.Active,
          },
          {
            id: 2,
            action: 'Run Linting',
            priority: PriorityLevel.High,
            state: TodoStatus.Active,
          },
        ],
        [TodoStatus.Deleted]: [
          {
            id: 4,
            action: 'Cut Grass',
            priority: PriorityLevel.High,
            state: TodoStatus.Deleted,
          },
        ],
        [TodoStatus.Completed]: [
          {
            id: 3,
            action: 'Call back Hospital',
            priority: PriorityLevel.High,
            state: TodoStatus.Completed,
          },
        ],
      },
    });
  });
});
