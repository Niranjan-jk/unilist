import { Search } from 'lucide-react';
import { Input } from "./ui/input";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-pink-200">
        <Search size={20} />
      </div>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className="w-full bg-white bg-opacity-10 backdrop-blur-lg rounded-full py-3 pl-10 pr-4 text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 border border-white border-opacity-20"
      />
    </div>
  );
};

export default SearchBar;