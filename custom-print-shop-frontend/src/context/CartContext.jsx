import { createContext, useState } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, variant, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(p => p.product._id === product._id && p.variant === variant);
      if (existing) {
        return prev.map(item =>
          item.product._id === product._id && item.variant === variant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, variant, quantity }];
    });
  };

  const removeFromCart = (id, variant) => {
    setCart(prev => prev.filter(item => item.product._id !== id || item.variant !== variant));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
