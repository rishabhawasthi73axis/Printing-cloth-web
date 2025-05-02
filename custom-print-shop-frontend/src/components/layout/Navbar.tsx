
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          PrintWear
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="space-x-6">
            <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/custom-designer" className="text-gray-700 hover:text-primary transition-colors">
              Custom Designer
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/custom-designer">
              <Button>Start Designing</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="outline" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-3 shadow-md bg-white absolute top-16 left-0 right-0 z-50">
          <div className="flex flex-col space-y-3">
            <Link to="/products" className="text-gray-700 hover:text-primary transition-colors py-2">
              Products
            </Link>
            <Link to="/custom-designer" className="text-gray-700 hover:text-primary transition-colors py-2">
              Custom Designer
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors py-2">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors py-2">
              Contact
            </Link>
            <hr className="my-2" />
            <div className="flex items-center space-x-4 py-2">
              <Link to="/cart" className="flex items-center text-gray-700">
                <ShoppingCart className="h-5 w-5 mr-2" /> Cart
              </Link>
            </div>
            <div className="flex items-center space-x-4 py-2">
              <Link to="/login" className="flex items-center text-gray-700">
                <User className="h-5 w-5 mr-2" /> Account
              </Link>
            </div>
            <Link to="/custom-designer" className="py-2">
              <Button className="w-full">Start Designing</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
