import React, { createContext, useReducer } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cartItems: state.cartItems.filter((item) => item.id !== action.payload) };
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const { state, dispatch } = useReducer(cartReducer, { cartItems: [] });

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success('Product added to cart!');
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const increaseQuantity = (id) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  };

  return (
    <CartContext.Provider
      value={{ state, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
