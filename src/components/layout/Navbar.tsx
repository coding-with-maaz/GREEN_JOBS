import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Briefcase, User, LogOut, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  // Close mobile menu and profile dropdown when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto h-16 px-4 flex items-center justify-between">
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
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-colors",
              isActive('/') ? "text-primary" : "hover:text-primary"
            )}
          >
            Home
          </Link>
          <Link 
            to="/jobs" 
            className={cn(
              "text-sm font-medium transition-colors",
              isActive('/jobs') ? "text-primary" : "hover:text-primary"
            )}
          >
            Find Jobs
          </Link>
          <Link 
            to="/categories" 
            className={cn(
              "text-sm font-medium transition-colors",
              isActive('/categories') ? "text-primary" : "hover:text-primary"
            )}
          >
            Categories
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "text-sm font-medium transition-colors",
              isActive('/about') ? "text-primary" : "hover:text-primary"
            )}
          >
            About
          </Link>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/search" className="relative group">
            <Search className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
          
          {currentUser ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors focus:outline-none"
                onClick={toggleProfile}
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {currentUser.displayName ? (
                    currentUser.displayName.charAt(0).toUpperCase()
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <span className="hidden sm:inline">{currentUser.displayName || 'User'}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {currentUser.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link 
                to="/login" 
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive('/login') ? "text-primary" : "hover:text-primary"
                )}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          {currentUser && (
            <button
              onClick={toggleProfile}
              className="p-1 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {currentUser.displayName ? (
                  currentUser.displayName.charAt(0).toUpperCase()
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
            </button>
          )}
          <button 
            className="focus:outline-none" 
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
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-x-0 top-16 z-50 bg-background border-b border-border/40 md:hidden transform transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container mx-auto px-4 py-6 space-y-6">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={cn(
                "text-base font-medium",
                isActive('/') ? "text-primary" : "hover:text-primary"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/jobs" 
              className={cn(
                "text-base font-medium",
                isActive('/jobs') ? "text-primary" : "hover:text-primary"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link 
              to="/categories" 
              className={cn(
                "text-base font-medium",
                isActive('/categories') ? "text-primary" : "hover:text-primary"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "text-base font-medium",
                isActive('/about') ? "text-primary" : "hover:text-primary"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </nav>
          <div className="flex flex-col space-y-4">
            {currentUser ? (
              <>
                {profileOpen && (
                  <div className="py-2 border-t border-gray-200">
                    <div className="px-2 py-1">
                      <p className="text-sm font-medium">{currentUser.displayName || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full mt-2 px-2 py-1 text-base font-medium text-gray-700 hover:text-primary"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-base font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 text-sm font-medium text-center text-white bg-primary hover:bg-primary/90 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Profile Menu */}
      {currentUser && profileOpen && (
        <div className="fixed inset-x-0 top-16 z-50 bg-background border-b border-border/40 md:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col">
              <div className="px-2 py-2 border-b border-gray-200">
                <p className="text-sm font-medium">{currentUser.displayName || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center w-full mt-2 px-2 py-2 text-base font-medium text-gray-700 hover:text-primary"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
