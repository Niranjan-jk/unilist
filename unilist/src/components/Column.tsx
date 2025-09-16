import type { Todo, Status, Column as ColumnType } from '../types';
import TodoItem from './TodoItem';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

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
    <Card className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20">
      <CardHeader className="pb-2 border-b border-white border-opacity-20">
        <CardTitle className="text-xl font-semibold text-white flex items-center justify-between">
          {column.title} 
          <Badge variant="secondary" className="text-pink-300 bg-pink-900/30">
            {todos.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
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
      </CardContent>
    </Card>
  );
};

export default Column;