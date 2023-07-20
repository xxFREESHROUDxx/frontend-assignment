import React, { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../lib/Constants';

const ProductContext = createContext(null);

const ProductProvider = ({ children }) => {
  const postQuery = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data;
    },
  });

  return <ProductContext.Provider value={postQuery}>{children}</ProductContext.Provider>;
};

export { ProductContext, ProductProvider };
