import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useThemeContext } from './ThemeContext';
import { Product } from './types';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextProps | null>(null);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { darkTheme } = useThemeContext();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (storedCartItems && storedCartItems.length > 0) {
      setCartItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    // Save cart items to local storage whenever cartItems change
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, { ...product, quantity: 1 }]);
    }

    toast.success('Product added to cart!', {
      position: 'bottom-right',
      theme: `${darkTheme ? 'dark' : 'light'}`,
    });
  };

  const increaseQuantity = (id: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== id));
    toast.success('Item successfully removed from Cart!', {
      position: 'bottom-right',
      theme: `${darkTheme ? 'dark' : 'light'}`,
    });
  };

  const cartContextValues = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return <CartContext.Provider value={cartContextValues}>{children}</CartContext.Provider>;
};

const useCartContext = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a Cart Provider');
  }
  return context;
};

export { CartProvider, useCartContext };
