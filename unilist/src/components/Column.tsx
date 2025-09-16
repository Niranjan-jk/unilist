import { Todo, Status, Column as ColumnType } from '../types';
import TodoItem from './TodoItem';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface ColumnProps {
  column: ColumnType;
  todos: Todo[];
  onUpdateStatus: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
}

const Column = ({ column, todos, onUpdateStatus, onDelete }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div 
      ref={setNodeRef}
      className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl border border-white border-opacity-20 p-4"
    >
      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white border-opacity-20">
        {column.title} <span className="text-pink-300">({todos.length})</span>
      </h2>
      <SortableContext items={todos.map(todo => todo.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3 min-h-[100px]">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdateStatus={onUpdateStatus}
              onDelete={onDelete}
            />
          ))}
          {todos.length === 0 && (
            <p className="text-pink-200 text-center py-4">No tasks here</p>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;