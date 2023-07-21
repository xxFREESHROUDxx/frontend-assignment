import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);

  const handleNavigation = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (e) => {
    // prevent event propagatioin to avoid redirection when clicked on the button
    e.stopPropagation();
    addToCart();
  };

  return (
    <div
      className={`rounded-xl shadow-md overflow-hidden cursor-pointer bg-[#c3c3c3] border-0 p-4 flex flex-col justify-between ${
        darkTheme ? 'bg-purple' : 'bg-gray'
      }`}
      onClick={() => handleNavigation(product.id)}
    >
      <figure className='relative w-full h-80'>
        <img
          className='w-full h-full object-cover rounded-xl'
          src={product.image}
          alt={product.title}
        />
      </figure>
      <div className='py-2'>
        <h2 className='text-base font-bold mb-2'>{product.title}</h2>
        <p className='text-lg font-semibold mb-2'>Price: ${product.price}</p>
        <button
          className='px-4 py-2 rounded-lg w-full border border-black'
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
