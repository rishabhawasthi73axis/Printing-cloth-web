
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { formatCurrency, convertUSDtoINR } from '@/utils/currencyFormatter';
import { useAuth } from '@/contexts/AuthContext';

// Define the product type
export interface CartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
  color?: string;
  size?: string;
}

interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  formattedTotal: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const { user } = useAuth();
  
  // Generate a unique key for the current user's cart
  const getCartKey = () => {
    return user ? `cart_${user.id}` : 'cart_guest';
  };
  
  // Load cart from localStorage on component mount or when user changes
  useEffect(() => {
    const cartKey = getCartKey();
    const savedCart = localStorage.getItem(cartKey);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    } else {
      // Reset cart when switching users
      setCart([]);
    }
  }, [user]);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, user]);
  
  // Calculate cart total in INR
  const cartTotal = cart.reduce((total, item) => {
    return total + (convertUSDtoINR(item.price) * item.quantity);
  }, 0);
  
  // Format cart total as INR currency
  const formattedTotal = formatCurrency(cartTotal);
  
  // Calculate total number of items in cart
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  const addToCart = (product: CartProduct) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingProductIndex >= 0) {
        // Update quantity if product already exists
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += product.quantity;
        
        toast({
          title: "Cart updated",
          description: `${product.name} quantity updated to ${updatedCart[existingProductIndex].quantity}`,
        });
        
        return updatedCart;
      } else {
        // Add new product to cart
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart`,
        });
        
        return [...prevCart, product];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const product = prevCart.find(item => item.id === productId);
      
      if (product) {
        toast({
          title: "Removed from cart",
          description: `${product.name} removed from your cart`,
        });
      }
      
      return prevCart.filter(item => item.id !== productId);
    });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };
  
  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };
  
  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      formattedTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};