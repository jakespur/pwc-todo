import { screen, render, fireEvent, cleanup } from '@testing-library/react';
import { Filter } from './Filter';
import { Active, TodoStatus, ToDoSummaryCounts } from '../../interfaces/interfaces';

describe('Filter component', () => {
  afterEach(cleanup);

  const totals: ToDoSummaryCounts = {
    [TodoStatus.Active]: 10,
    [TodoStatus.Completed]: 2,
    [TodoStatus.Deleted]: 1,
  };

  it('has the correct filters', () => {
    render(<Filter currentFilter={TodoStatus.Active} onFilterSelected={jest.fn()} totals={totals} />);
    expect(screen.getByText(/Active/).textContent).toBe('Active (10)');
    expect(screen.getByText(/Completed/).textContent).toBe('Completed (2)');
    expect(screen.getByText(/Deleted/).textContent).toBe('Deleted (1)');
  });

  describe('button click triggers prop', () => {
    it('should trigger passed in function', () => {
      const mockFn = jest.fn();
      render(<Filter currentFilter={TodoStatus.Active} onFilterSelected={mockFn} totals={totals} />);
      fireEvent.click(screen.getByText(/Completed/));
      expect(mockFn).toHaveBeenCalled();
    });
  });
});
