import React, { ReactNode } from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import TodoProvider from '../../context/todoContext';
import { ToDo } from './ToDo';

const renderWithContext = (component: ReactNode) => {
  return render(<TodoProvider>{component}</TodoProvider>);
};

describe('ToDo Container component', () => {
  afterEach(cleanup);

  it('should have a heading', () => {
    renderWithContext(<ToDo />);
    expect(screen.getByTestId('heading')).toBeInTheDocument();
  });

  it('should render the form', () => {
    renderWithContext(<ToDo />);
    expect(screen.getByTestId('addNewTodo')).toBeInTheDocument();
  });

  it('should render the filter', () => {
    renderWithContext(<ToDo />);
    expect(screen.getByTestId('filter')).toBeInTheDocument();
  });

  it('should render a list of todos', () => {
    renderWithContext(<ToDo />);
    expect(screen.getByTestId('todo-listing')).toBeInTheDocument();
  });
});
