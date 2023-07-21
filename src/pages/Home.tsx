import React, { useState, useEffect } from 'react';
import { useProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import Search from './Search';
import { useCartContext } from '../context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useThemeContext } from '../context/ThemeContext';
import { Product } from '../context/types';

const Home = () => {
  const { products: productData } = useProductContext();
  const { addToCart } = useCartContext();
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const { darkTheme } = useThemeContext();

  useEffect(() => {
    // Initially, display all products
    if (productData.data) {
      setSearchResults(productData.data);
    }
  }, [productData.data]);

  if (productData.isLoading) return <h1 className='mt-10'>Loading...</h1>;
  if (productData.isError) return <h1>Error Loading Data!</h1>;

  const handleSearch = (searchTerm: string) => {
    if (productData.data) {
      const results = productData.data.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className='py-5 md:py-10 lg:py-16'>
      <ToastContainer />
      <h1 className={`${darkTheme ? 'text-white' : ''}`}>All Products</h1>
      <Search onSearch={handleSearch} />
      {searchResults.length === 0 && (
        <h1
          className={`h-[500px] flex items-center justify-center ${darkTheme ? 'text-dark' : ''}`}
        >
          No results found.
        </h1>
      )}
      {searchResults.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {searchResults.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
