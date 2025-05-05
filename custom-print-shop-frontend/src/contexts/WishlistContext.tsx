
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';

// Define the product type for wishlist
export interface WishlistProduct {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
}

interface WishlistContextType {
  wishlist: WishlistProduct[];
  addToWishlist: (product: WishlistProduct) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: WishlistProduct) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const { user } = useAuth();
  
  // Generate a unique key for the current user's wishlist
  const getWishlistKey = () => {
    return user ? `wishlist_${user.id}` : 'wishlist_guest';
  };
  
  // Load wishlist from localStorage on component mount or when user changes
  useEffect(() => {
    const wishlistKey = getWishlistKey();
    const savedWishlist = localStorage.getItem(wishlistKey);
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error parsing wishlist from localStorage:', error);
      }
    } else {
      // Reset wishlist when switching users
      setWishlist([]);
    }
  }, [user]);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    const wishlistKey = getWishlistKey();
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  }, [wishlist, user]);
  
  // Get total items count
  const wishlistCount = wishlist.length;
  
  const addToWishlist = (product: WishlistProduct) => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to log in to add items to your wishlist",
        variant: "destructive"
      });
      return;
    }
    
    setWishlist(prevWishlist => {
      // Check if product already exists in wishlist
      if (prevWishlist.some(item => item.id === product.id)) {
        return prevWishlist;
      }
      
      toast({
        title: "Added to wishlist",
        description: `${product.name} added to your wishlist`,
      });
      
      return [...prevWishlist, product];
    });
  };
  
  const removeFromWishlist = (productId: string) => {
    setWishlist(prevWishlist => {
      const product = prevWishlist.find(item => item.id === productId);
      
      if (product) {
        toast({
          title: "Removed from wishlist",
          description: `${product.name} removed from your wishlist`,
        });
      }
      
      return prevWishlist.filter(item => item.id !== productId);
    });
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some(item => item.id === productId);
  };
  
  const toggleWishlist = (product: WishlistProduct) => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to log in to add items to your wishlist",
        variant: "destructive"
      });
      return;
    }
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const clearWishlist = () => {
    setWishlist([]);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    });
  };
  
  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      clearWishlist,
      wishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};