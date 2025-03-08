import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: {
    _id: string;
    name: string;
    icon: any;
    color: string;
    count: number;
  };
  onClick: (id: string) => void;
  className?: string;
}

const CategoryCard = ({ category, onClick, className }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = category.icon;
  
  return (
    <div
      className={cn(
        "relative overflow-hidden p-6 rounded-xl border border-border/60 cursor-pointer transition-all duration-300",
        "hover:shadow-lg hover:border-primary/30 hover:scale-[1.02] hover:-translate-y-1",
        "flex flex-col items-center text-center h-full",
        className
      )}
      onClick={() => onClick(category._id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M0 0h1v1H0V0zm20 0h1v1h-1V0zM0 20h1v1H0v-1zm20 0h1v1h-1v-1z'/%3E%3C/g%3E%3C/svg%3E\")"
        }}
      ></div>
      
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-4 z-10 transition-all duration-300",
          isHovered ? "scale-110" : ""
        )}
        style={{ backgroundColor: `${category.color}15` }}
      >
        <IconComponent className="h-7 w-7" style={{ color: category.color }} />
      </div>
      
      <h3 className={cn(
        "text-xl font-semibold mb-2 z-10 transition-colors duration-300",
        isHovered ? "text-primary" : ""
      )}>
        {category.name}
      </h3>
      
      <p className="text-muted-foreground z-10">{category.count} Jobs Available</p>
      
      {/* Bottom line accent */}
      <div
        className={cn(
          "absolute bottom-0 left-0 h-1 w-full transition-all duration-300 origin-left",
          isHovered ? "scale-x-100" : "scale-x-0"
        )}
        style={{ backgroundColor: category.color }}
      ></div>
    </div>
  );
};

export default CategoryCard;
