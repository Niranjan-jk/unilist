import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoItem from '../components/TodoItem';
import { Todo } from '../types';

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: '1',
    title: 'Test Todo',
    description: 'Test Description',
    status: 'not-started',
    createdAt: new Date(),
  };

  const mockUpdateStatus = vi.fn();
  const mockDelete = vi.fn();

  it('should render todo title and description', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdateStatus={mockUpdateStatus}
        onDelete={mockDelete}
      />
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should call delete function when delete button is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdateStatus={mockUpdateStatus}
        onDelete={mockDelete}
      />
    );

    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledWith('1');
  });

  it('should update status when select is changed', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdateStatus={mockUpdateStatus}
        onDelete={mockDelete}
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'completed' } });

    expect(mockUpdateStatus).toHaveBeenCalledWith('1', 'completed');
  });
});