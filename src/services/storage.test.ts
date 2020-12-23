import { PriorityLevel, ToDoStateUpdate, TodoStatus, UnPersistedToDo } from '../interfaces/interfaces';
import { addToDo, bulkUpdateStatus, clear } from './storage';

describe('ToDo storage', () => {
  afterEach(() => {
    global.localStorage.clear();
    clear();
    jest.clearAllMocks();
  });

  describe('Adding a new todo', () => {
    it('should be able to add a todo to localStorage', () => {
      const newTodo: Partial<UnPersistedToDo> = {
        action: 'Take package to post office',
        priority: PriorityLevel.High,
      };
      jest.spyOn(window.localStorage, 'setItem');
      addToDo(newTodo);
      expect(localStorage.setItem).toHaveBeenCalled();
      const expected = [
        {
          id: 1,
          state: TodoStatus.Active,
          action: 'Take package to post office',
          priority: PriorityLevel.High,
        },
      ];
      expect(localStorage.setItem).toHaveBeenCalledWith('todos_0', JSON.stringify(expected));
    });
  });
  describe('Update the state of a todo', () => {
    it('should set the status from "active" to "completed"', () => {
      const todos: Partial<UnPersistedToDo>[] = [
        {
          state: TodoStatus.Active,
          action: 'Add accessibility',
          priority: PriorityLevel.High,
        },
        {
          state: TodoStatus.Active,
          action: 'Add linting',
          priority: PriorityLevel.High,
        },
      ];

      todos.forEach(addToDo);

      const updateStatusAction: ToDoStateUpdate[] = [
        { id: 1, newState: TodoStatus.Completed },
        { id: 2, newState: TodoStatus.Completed },
      ];

      bulkUpdateStatus(updateStatusAction);

      const expected = [
        {
          id: 1,
          state: TodoStatus.Completed,
          action: 'Add accessibility',
          priority: PriorityLevel.High,
        },
        {
          id: 2,
          state: TodoStatus.Completed,
          action: 'Add linting',
          priority: PriorityLevel.High,
        },
      ];

      expect(localStorage.setItem).lastCalledWith('todos_0', JSON.stringify(expected));
    });
  });
});
