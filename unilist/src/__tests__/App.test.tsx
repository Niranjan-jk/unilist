import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add a new todo', () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const addButton = screen.getByText('Add Task');
    
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('should filter todos based on search term', () => {
    render(<App />);
    
    // Add a few todos
    const input = screen.getByPlaceholderText('Add a new task...');
    const addButton = screen.getByText('Add Task');
    
    fireEvent.change(input, { target: { value: 'First Todo' } });
    fireEvent.click(addButton);
    
    fireEvent.change(input, { target: { value: 'Second Todo' } });
    fireEvent.click(addButton);
    
    // Search for the first todo
    const searchInput = screen.getByPlaceholderText('Search tasks...');
    fireEvent.change(searchInput, { target: { value: 'First' } });
    
    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.queryByText('Second Todo')).not.toBeInTheDocument();
  });

  it('should update todo status', () => {
    render(<App />);
    
    // Add a todo
    const input = screen.getByPlaceholderText('Add a new task...');
    const addButton = screen.getByText('Add Task');
    
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);
    
    // Change status to ongoing
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'ongoing' } });
    
    // Check that the todo is in the ongoing column
    const ongoingColumn = screen.getByText('Ongoing');
    expect(ongoingColumn).toBeInTheDocument();
  });
});