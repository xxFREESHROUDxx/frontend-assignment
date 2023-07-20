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
    <div>
      <ToastContainer />
      <h1 className='mt-10'>All Products</h1>
      <Search onSearch={handleSearch} />
      {searchResults.length === 0 && <h1>No results found.</h1>}
      {searchResults.length > 0 && (
        <div className='grid p-5 grid-cols-4 gap-4'>
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
