import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import Search from './Search';
import { CartContext } from '../context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const productData = useContext(ProductContext);
  const { cartItems, addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Initially, display all products
    if (productData.data) {
      setSearchResults(productData.data);
    }
  }, [productData.data]);

  if (productData.isLoading) return <h1 className='mt-10'>Loading...</h1>;
  if (productData.isError) return <h1>Error Loading Data!</h1>;

  const handleSearch = (searchTerm) => {
    if (productData.data) {
      const results = productData.data.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className='p-5 md:p-10 lg:p-16'>
      <ToastContainer />
      <h1>All Products</h1>
      <Search onSearch={handleSearch} />
      {searchResults.length === 0 && (
        <h1 className='h-[500px] flex items-center justify-center'>No results found.</h1>
      )}
      {searchResults.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
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
