import React, { useContext, createContext } from 'react';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../lib/Constants';
import { Product } from './types';

type ProductContextProps = {
  products: UseQueryResult<Product[], unknown>;
};

const ProductContext = createContext<ProductContextProps | null>(null);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const postQuery: UseQueryResult<Product[], unknown> = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data;
    },
  });

  const productContextValues = {
    products: postQuery,
  };

  return <ProductContext.Provider value={productContextValues}>{children}</ProductContext.Provider>;
};

const useProductContext = (): ProductContextProps => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a Product Provider');
  }
  return context;
};

export { useProductContext, ProductProvider };
