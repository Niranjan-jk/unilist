import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface AddTodoFormProps {
  onAdd: (title: string, description?: string) => void;
}

const AddTodoForm = ({ onAdd }: AddTodoFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title, description || undefined);
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl border border-white border-opacity-20 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 bg-transparent text-white placeholder-pink-200 border-0 focus:outline-none focus:ring-0"
          />
          <Button
            type="submit"
            className="ml-2 p-2 bg-pink-500 bg-opacity-70 rounded-full text-white hover:bg-opacity-90 transition"
          >
            <Plus size={20} />
          </Button>
        </div>
        
        {isExpanded && (
          <div className="mt-3">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="w-full bg-white bg-opacity-20 rounded-lg px-3 py-2 text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 mt-2 border-0"
              rows={2}
            />
          </div>
        )}
        
        <div className="mt-2 flex justify-between">
          {!isExpanded && (
            <Button
              type="button"
              onClick={() => setIsExpanded(true)}
              variant="ghost"
              className="text-pink-200 text-sm hover:text-white transition p-0 h-auto"
            >
              Add description
            </Button>
          )}
          <Button
            type="submit"
            className="ml-auto bg-pink-500 bg-opacity-70 text-white px-4 py-1 rounded-full text-sm hover:bg-opacity-90 transition"
          >
            Add Task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTodoForm;