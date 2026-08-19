import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, MenuItem } from '../types';
import { useToast } from './ToastContext';
import { useLanguage } from './LanguageContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  totalCount: number;
  confirmedSubtotal: number;
  itemsToConfirmCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  customizingProduct: MenuItem | null;
  setCustomizingProduct: (product: MenuItem | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'smokeme_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse stored cart', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [customizingProduct, setCustomizingProduct] = useState<MenuItem | null>(null);

  const { showToast } = useToast();
  const { t, language } = useLanguage();

  // Save to localStorage on cart change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (newItemData: Omit<CartItem, 'cartItemId'>) => {
    // Generate a distinct ID based on product, dining option and selected extras
    const extrasKey = newItemData.selectedExtras.map((e) => e.id).sort().join('-');
    const cartItemId = `${newItemData.productId}_${newItemData.diningOption || 'default'}_${extrasKey}_${newItemData.specialInstructions || ''}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += newItemData.quantity;
        return updated;
      }
      return [...prevCart, { ...newItemData, cartItemId }];
    });

    const itemName = language === 'ar' ? newItemData.nameAr : newItemData.nameFr;
    showToast(t.toasts.addedToCart, itemName, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast(t.toasts.clearedCart, undefined, 'info');
  };

  const totalCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const confirmedSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      if (item.unitPrice !== null) {
        return acc + item.unitPrice * item.quantity;
      }
      return acc;
    }, 0);
  }, [cart]);

  const itemsToConfirmCount = useMemo(() => {
    return cart.reduce((acc, item) => {
      if (item.unitPrice === null) {
        return acc + item.quantity;
      }
      return acc;
    }, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        confirmedSubtotal,
        itemsToConfirmCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        customizingProduct,
        setCustomizingProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
