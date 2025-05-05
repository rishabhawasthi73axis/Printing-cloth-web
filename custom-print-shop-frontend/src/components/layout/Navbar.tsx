
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, User, LogOut, Settings, Package, MapPin, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
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
            {user ? (
              <>
                <Link to="/cart">
                  <Button variant="outline" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </Link>
                
                <Link to="/wishlist">
                  <Button variant="outline" size="icon" className="relative">
                    <Heart className="h-5 w-5" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Avatar>
                        <AvatarFallback>{user.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/orders')}>
                      <Package className="mr-2 h-4 w-4" />
                      <span>My Orders</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/addresses')}>
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>Addresses</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/wishlist')}>
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Wishlist</span>
                    </DropdownMenuItem>
                    {user.isAdmin && (
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <span>Admin Panel</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Link to="/custom-designer">
                  <Button>Start Designing</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/cart">
                  <Button variant="outline" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/wishlist">
                  <Button variant="outline" size="icon" className="relative">
                    <Heart className="h-5 w-5" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
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
              </>
            )}
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
            {user ? (
              <>
                <div className="py-2 font-medium">Hello, {user.name}</div>
                <Link to="/profile" className="flex items-center text-gray-700 py-2">
                  <User className="h-5 w-5 mr-2" /> Profile
                </Link>
                <Link to="/orders" className="flex items-center text-gray-700 py-2">
                  <Package className="h-5 w-5 mr-2" /> My Orders
                </Link>
                <Link to="/addresses" className="flex items-center text-gray-700 py-2">
                  <MapPin className="h-5 w-5 mr-2" /> Addresses
                </Link>
                <Link to="/settings" className="flex items-center text-gray-700 py-2">
                  <Settings className="h-5 w-5 mr-2" /> Settings
                </Link>
                <Link to="/wishlist" className="flex items-center text-gray-700 py-2">
                  <Heart className="h-5 w-5 mr-2" /> Wishlist
                </Link>
                <Link to="/cart" className="flex items-center text-gray-700 py-2">
                  <ShoppingCart className="h-5 w-5 mr-2" /> Cart
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="flex items-center text-gray-700 py-2">
                    Admin Panel
                  </Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="flex items-center text-gray-700 py-2"
                >
                  <LogOut className="h-5 w-5 mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/wishlist" className="flex items-center text-gray-700 py-2">
                  <Heart className="h-5 w-5 mr-2" /> Wishlist
                </Link>
                <Link to="/cart" className="flex items-center text-gray-700 py-2">
                  <ShoppingCart className="h-5 w-5 mr-2" /> Cart
                </Link>
                <Link to="/login" className="flex items-center text-gray-700 py-2">
                  <User className="h-5 w-5 mr-2" /> Login
                </Link>
              </>
            )}
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