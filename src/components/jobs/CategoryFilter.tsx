
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  _id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  className?: string;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
  className
}: CategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (categoryId: string | null) => {
    onSelectCategory(categoryId);
    setIsOpen(false);
  };

  const selectedCategoryName = selectedCategory 
    ? categories.find(cat => cat._id === selectedCategory)?.name || 'All Categories'
    : 'All Categories';

  return (
    <div className={cn("relative", className)}>
      <button 
        onClick={toggleDropdown}
        className="w-full flex items-center justify-between bg-white border border-border/60 rounded-lg px-4 py-2.5 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="block truncate">{selectedCategoryName}</span>
        <ChevronDown 
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform duration-200",
            isOpen ? "transform rotate-180" : ""
          )} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-border/60 py-1 max-h-60 overflow-auto">
          <ul 
            className="py-1" 
            role="listbox"
            aria-labelledby="categories-button"
          >
            <li>
              <button
                className={cn(
                  "w-full text-left px-4 py-2 text-sm hover:bg-secondary/50 transition-colors",
                  !selectedCategory ? "bg-secondary/50 font-medium" : ""
                )}
                onClick={() => handleCategoryClick(null)}
              >
                All Categories
              </button>
            </li>
            {categories.map((category) => (
              <li key={category._id}>
                <button
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm hover:bg-secondary/50 transition-colors flex items-center justify-between",
                    selectedCategory === category._id ? "bg-secondary/50 font-medium" : ""
                  )}
                  onClick={() => handleCategoryClick(category._id)}
                >
                  <span>{category.name}</span>
                  <span className="text-xs text-muted-foreground bg-secondary rounded-full px-2 py-0.5">
                    {category.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
