
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container-custom h-16 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">GreenJobs</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/jobs" className="text-sm font-medium hover:text-primary transition-colors">
            Find Jobs
          </Link>
          <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors">
            Categories
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/search">
            <Search className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
          <Link 
            to="/login" 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="btn btn-primary px-4 py-2"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-x-0 top-16 z-50 bg-background border-b border-border/40 md:hidden transform transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container-custom py-6 space-y-6">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-base font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/jobs" 
              className="text-base font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link 
              to="/categories" 
              className="text-base font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="text-base font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </nav>
          <div className="flex flex-col space-y-4">
            <Link 
              to="/login" 
              className="text-base font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="btn btn-primary w-full py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
