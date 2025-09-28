
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import HandDrawnButton from '../ui/HandDrawnButton';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Plans', path: '/plans' },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="py-4 border-b-2 border-black bg-white sticky top-0 z-50">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-handwritten font-bold tracking-tight">
              <span className="text-blue-600">Invest</span>Pro
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-handwritten text-lg transition duration-200 ease-in-out relative group ${
                    isActive(item.path) ? 'font-bold text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform origin-left transition-transform duration-300 ${
                      isActive(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}>
                  </span>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <Link to="/dashboard">
                  <HandDrawnButton 
                    variant="primary" 
                    size="sm"
                  >
                    Dashboard
                  </HandDrawnButton>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <HandDrawnButton 
                      variant="outline" 
                      size="sm"
                    >
                      Log In
                    </HandDrawnButton>
                  </Link>
                  <Link to="/register">
                    <HandDrawnButton 
                      variant="primary" 
                      size="sm"
                    >
                      Sign Up
                    </HandDrawnButton>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mt-4 md:hidden animate-fade-in">
            <div className="flex flex-col space-y-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-handwritten text-lg px-2 py-1 ${
                    isActive(item.path) 
                      ? 'font-bold text-blue-600 border-l-4 border-blue-600 pl-2' 
                      : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col space-y-2 pt-4 border-t border-dashed border-gray-300">
              {user ? (
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <HandDrawnButton 
                    variant="primary" 
                    className="w-full"
                  >
                    Dashboard
                  </HandDrawnButton>
                </Link>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <HandDrawnButton 
                      variant="outline" 
                      className="w-full"
                    >
                      Log In
                    </HandDrawnButton>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <HandDrawnButton 
                      variant="primary" 
                      className="w-full"
                    >
                      Sign Up
                    </HandDrawnButton>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
