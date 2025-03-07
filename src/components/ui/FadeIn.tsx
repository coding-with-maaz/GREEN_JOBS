
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  once?: boolean;
}

const FadeIn = ({
  children,
  delay = 0,
  duration = 500,
  direction = 'up',
  className,
  once = true,
}: FadeInProps) => {
  const getAnimationClass = () => {
    switch (direction) {
      case 'up':
        return 'animate-fade-in-up';
      case 'right':
        return 'animate-slide-in-right';
      case 'left':
        return 'animate-slide-in-left';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div
      className={cn(getAnimationClass(), className)}
      style={{
        opacity: 0,
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        animationFillMode: 'forwards',
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
