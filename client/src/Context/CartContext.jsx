// src/Context/CartContext.js

import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add to cart
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
     
      if (existingItem) {
        toast.error("Item already in cart");
        return prevItems;
      }
      toast.success(`${product.productname} added to cart`);
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== id));
    toast.error("Item removed from cart");
  };

  // Update quantity
  const updateQuantity = (id, newQty) => {
    setCartItems(prevItems => {
      if (newQty < 1) {
        toast.info("Item removed from cart");
        return prevItems.filter(item => item._id !== id);
      }
      return prevItems.map(item =>
        item._id === id ? { ...item, quantity: newQty } : item
      );
    });
  };

  //clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
    toast.success("Cart cleared");
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
