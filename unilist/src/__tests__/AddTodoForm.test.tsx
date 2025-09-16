import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AddTodoForm from '../components/AddTodoForm';

describe('AddTodoForm', () => {
  it('should call onAdd when form is submitted', () => {
    const mockAdd = vi.fn();
    render(<AddTodoForm onAdd={mockAdd} />);

    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);

    expect(mockAdd).toHaveBeenCalledWith('New Todo', undefined);
  });

  it('should expand to show description field when "Add description" is clicked', () => {
    const mockAdd = vi.fn();
    render(<AddTodoForm onAdd={mockAdd} />);

    const addDescriptionButton = screen.getByText('Add description');
    fireEvent.click(addDescriptionButton);

    expect(screen.getByPlaceholderText('Description (optional)')).toBeInTheDocument();
  });

  it('should not call onAdd when title is empty', () => {
    const mockAdd = vi.fn();
    render(<AddTodoForm onAdd={mockAdd} />);

    const button = screen.getByText('Add Task');
    fireEvent.click(button);

    expect(mockAdd).not.toHaveBeenCalled();
  });
});