
import { useState, FormEvent } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

const SearchBar = ({
  defaultValue = '',
  placeholder = 'Search jobs, companies, or keywords...',
  className = '',
  onSearch
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery.trim());
      } else {
        navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 pl-12 rounded-xl border border-border/60 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm hover:shadow-md"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-primary px-5 py-2 text-sm rounded-lg font-medium shadow-sm hover:shadow"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
