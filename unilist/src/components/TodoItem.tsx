import { useState } from 'react';
import { Todo, Status } from '../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Edit, Trash2 } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onUpdateStatus: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ todo, onUpdateStatus, onDelete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    // In a real app, we would update the todo here
    setIsEditing(false);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateStatus(todo.id, e.target.value as Status);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl shadow-md border border-white border-opacity-30 p-4 transition-all duration-200 hover:bg-opacity-30"
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full bg-white bg-opacity-20 rounded-lg px-3 py-2 text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full bg-white bg-opacity-20 rounded-lg px-3 py-2 text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
            rows={3}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-500 bg-opacity-30 rounded-lg text-white hover:bg-opacity-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-pink-500 bg-opacity-70 rounded-lg text-white hover:bg-opacity-90 transition"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-white">{todo.title}</h3>
            <div className="flex space-x-1">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-pink-200 hover:text-white hover:bg-pink-500 hover:bg-opacity-30 rounded transition"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-1 text-pink-200 hover:text-white hover:bg-pink-500 hover:bg-opacity-30 rounded transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          {todo.description && (
            <p className="text-pink-100 text-sm mt-2">{todo.description}</p>
          )}
          
          <div className="mt-3 flex items-center">
            <select
              value={todo.status}
              onChange={handleStatusChange}
              className="bg-white bg-opacity-20 text-white text-sm rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="not-started" className="bg-purple-900">Haven't Started</option>
              <option value="ongoing" className="bg-purple-900">Ongoing</option>
              <option value="completed" className="bg-purple-900">Completed</option>
            </select>
            
            <button
              {...attributes}
              {...listeners}
              className="ml-auto text-pink-200 hover:text-white cursor-grab active:cursor-grabbing"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="12" r="1"></circle>
                <circle cx="15" cy="12" r="1"></circle>
                <circle cx="9" cy="6" r="1"></circle>
                <circle cx="15" cy="6" r="1"></circle>
                <circle cx="9" cy="18" r="1"></circle>
                <circle cx="15" cy="18" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;