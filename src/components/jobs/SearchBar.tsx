import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  defaultValue?: string;
  defaultLocation?: string;
  onSearch?: (query: string, location?: string) => void;
  className?: string;
}

const SearchBar = ({ 
  defaultValue = "", 
  defaultLocation = "",
  onSearch, 
  className 
}: SearchBarProps) => {
  const [query, setQuery] = useState(defaultValue);
  const [location, setLocation] = useState(defaultLocation);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setLocation(defaultLocation);
  }, [defaultLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(query, location);
    } else {
      // Build query parameters for navigation
      const params = new URLSearchParams();
      if (query) params.set('query', query);
      if (location) params.set('location', location);
      
      navigate(`/search?${params.toString()}`);
    }
  };

  const clearSearch = () => {
    setQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const clearLocation = () => {
    setLocation("");
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "bg-white rounded-2xl overflow-hidden border border-border/60 transition-all",
        "hover:shadow-md focus-within:shadow-md focus-within:border-primary/30",
        className
      )}
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 flex items-center relative border-b md:border-b-0 md:border-r border-border/60">
          <div className="pl-4">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Job title, keyword, or company"
            className="flex-1 py-4 px-3 focus:outline-none text-foreground placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="pr-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex-1 md:flex-none md:w-1/3 flex items-center relative">
          <div className="pl-4">
            <MapPin className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location (optional)"
            className="flex-1 py-4 px-3 focus:outline-none text-foreground placeholder:text-muted-foreground"
          />
          {location && (
            <button
              type="button"
              onClick={clearLocation}
              className="text-muted-foreground hover:text-foreground mr-2"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="submit"
            className="h-full px-6 bg-primary text-white font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
