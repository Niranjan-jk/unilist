import { useState, useEffect } from 'react';
import type { Todo, Status } from './types';
import { v4 as uuidv4 } from 'uuid';
import Column from './components/Column';
import AddTodoForm from './components/AddTodoForm';
import SearchBar from './components/SearchBar';
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  const addTodo = (title: string, description?: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      description,
      status: 'not-started',
      createdAt: new Date(),
    };
    
    setTodos([...todos, newTodo]);
  };
  
  const updateTodoStatus = (id: string, status: Status) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, status } : todo
    ));
  };
  
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const todoId = active.id as string;
      const newStatus = over.id as Status;
      
      updateTodoStatus(todoId, newStatus);
    }
  };
  
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (todo.description && todo.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const columns: { id: Status; title: string }[] = [
    { id: 'not-started', title: 'Haven\'t Started' },
    { id: 'ongoing', title: 'Ongoing' },
    { id: 'completed', title: 'Completed' },
  ];
  
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Unilist</h1>
            <p className="text-pink-200">A minimal, modern todo list</p>
          </header>
          
          <div className="mb-6">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
          
          <div className="mb-6">
            <AddTodoForm onAdd={addTodo} />
          </div>
          
          <SortableContext items={columns.map(col => col.id)} strategy={horizontalListSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {columns.map(column => (
                <Column
                  key={column.id}
                  column={column}
                  todos={filteredTodos.filter(todo => todo.status === column.id)}
                  onUpdateStatus={updateTodoStatus}
                  onDelete={deleteTodo}
                />
              ))}
            </div>
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}

export default App;
