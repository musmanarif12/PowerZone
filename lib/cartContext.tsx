'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from './products';
import { useAuth } from './authContext';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  buyNow: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user, isLoaded } = useAuth();
  
  const storageKey = user ? user.cartKey : 'pz_cart_guest';

  // Load cart from storage on mount & on user change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const saved = localStorage.getItem(storageKey);
      setCart(saved ? JSON.parse(saved) : []);
    } catch {
      setCart([]);
    }
  }, [user, isLoaded, storageKey]);

  // Save cart on cart change
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, isLoaded, storageKey]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const buyNow = (product: Product) => setCart([{ ...product, quantity: 1 }]);

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => setCart([]);
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, buyNow, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
