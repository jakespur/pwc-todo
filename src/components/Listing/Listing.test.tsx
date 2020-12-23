import { screen, render, fireEvent, cleanup } from '@testing-library/react';
import { Listing } from './Listing';
import { PersistedToDoItem, PriorityLevel, TodoStatus } from '../../interfaces/interfaces';

describe('Listing component', () => {
  afterEach(cleanup);

  const todos: PersistedToDoItem[] = [
    {
      id: 1,
      action: 'Add accessibility',
      priority: PriorityLevel.High,
      state: TodoStatus.Active,
    },
    {
      id: 2,
      action: 'Add e2e tests',
      priority: PriorityLevel.High,
      state: TodoStatus.Active,
    },
    {
      id: 3,
      action: 'Add more unit tests',
      priority: PriorityLevel.High,
      state: TodoStatus.Active,
    },
  ];

  it('should render a table of todos', async () => {
    render(<Listing showActions={true} todos={todos} onChangeState={jest.fn()} />);
    expect(screen.getByTestId('actionHeading')).toBeInTheDocument();
    expect(screen.getByTestId('priorityHeading')).toBeInTheDocument();
    expect(screen.getByTestId('markAsCompletedAction')).toBeInTheDocument();
    expect(screen.getByTestId('markAsDeletedAction')).toBeInTheDocument();
    const rows = await screen.findAllByTestId('todoRow-', { exact: false });
    expect(rows.length).toEqual(3);
  });

  describe('Completing a todo', () => {
    it('should trigger prop "onChangeState"', () => {
      const mockOnChangeState = jest.fn();
      render(<Listing showActions={true} todos={todos} onChangeState={mockOnChangeState} />);
      fireEvent.click(screen.getByTestId('mark-complete-1'));
      fireEvent.click(screen.getByTestId('markAsCompletedAction'));
      expect(mockOnChangeState).toHaveBeenCalled();
      expect(mockOnChangeState).toHaveBeenCalledWith([{ id: 1, newState: TodoStatus.Completed }]);
    });
  });

  describe('Deleting a todo', () => {
    it('should trigger prop "onChangeState"', () => {
      const mockOnChangeState = jest.fn();
      render(<Listing showActions={true} todos={todos} onChangeState={mockOnChangeState} />);
      fireEvent.click(screen.getByTestId('mark-delete-1'));
      fireEvent.click(screen.getByTestId('markAsDeletedAction'));
      expect(mockOnChangeState).toHaveBeenCalled();
      expect(mockOnChangeState).toHaveBeenCalledWith([{ id: 1, newState: TodoStatus.Deleted }]);
    });
  });
});
