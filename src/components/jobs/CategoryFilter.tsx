
import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
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
        className="w-full flex items-center justify-between bg-white border border-border/60 rounded-lg px-4 py-3 text-left text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 shadow-sm"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="block truncate font-medium">{selectedCategoryName}</span>
        <ChevronDown 
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen ? "transform rotate-180" : ""
          )} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded-lg border border-border/60 py-1 max-h-60 overflow-auto">
          <ul 
            className="py-1" 
            role="listbox"
            aria-labelledby="categories-button"
          >
            <li>
              <button
                className={cn(
                  "w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between",
                  !selectedCategory ? "bg-primary/5 font-medium text-primary" : ""
                )}
                onClick={() => handleCategoryClick(null)}
              >
                <span>All Categories</span>
                {!selectedCategory && <Check className="h-4 w-4 text-primary" />}
              </button>
            </li>
            {categories.map((category) => (
              <li key={category._id}>
                <button
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between",
                    selectedCategory === category._id ? "bg-primary/5 font-medium text-primary" : ""
                  )}
                  onClick={() => handleCategoryClick(category._id)}
                >
                  <div className="flex items-center">
                    <span 
                      className="inline-block w-2 h-2 rounded-full mr-2" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground bg-gray-100 rounded-full px-2 py-0.5 mr-2">
                      {category.count}
                    </span>
                    {selectedCategory === category._id && <Check className="h-4 w-4 text-primary" />}
                  </div>
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
