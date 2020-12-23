import { screen, render, fireEvent, cleanup } from '@testing-library/react';
import { Form } from './Form';
import { PriorityLevel } from '../../interfaces/interfaces';

describe('Form component', () => {
  afterEach(cleanup);

  it('has the following fields', () => {
    render(<Form onAddTodo={jest.fn()} />);
    expect(screen.getByRole('textbox', { name: /action/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /priority/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add new todo/i })).toBeInTheDocument();
  });

  describe('When fields are empty and the form is submitted', () => {
    it('should show a warning message', () => {
      const mockSubmit = jest.fn();
      render(<Form onAddTodo={mockSubmit} />);
      fireEvent.submit(screen.getByTestId('addNewTodo'));
      expect(mockSubmit).not.toHaveBeenCalled();
      expect(screen.getByTestId('formWarning')).toBeInTheDocument();
    });
  });

  describe('When the form is filled in correctly and then submitted', () => {
    it('should trigger onAddTodo prop', async () => {
      const mockSubmit = jest.fn();
      render(<Form onAddTodo={mockSubmit} />);
      fireEvent.change(screen.getByRole('textbox', { name: /action/i }), {
        target: { value: 'Call the Police' },
      });

      fireEvent.change(screen.getByRole('combobox', { name: /priority/i }), {
        target: { value: PriorityLevel.High },
      });

      fireEvent.submit(screen.getByTestId('addNewTodo'));
      expect(mockSubmit).toHaveBeenCalled();
      expect(mockSubmit).toHaveBeenCalledWith({
        action: 'Call the Police',
        priority: PriorityLevel.High,
      });
    });
  });
});
