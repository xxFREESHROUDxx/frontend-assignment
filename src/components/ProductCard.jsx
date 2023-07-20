import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();

  const handleNavigation = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div
      className='rounded-xl flex flex-col justify-center items-center p-5 bg-primary cursor-pointer hover:bg-[#1e204c] border'
      onClick={() => handleNavigation(product.id)}
    >
      <img className='block w-[320px] h-[360px] pb-2' src={product.image} alt={product.title} />
      <div className='h-24 text-center flex flex-col items-center justify-center font-medium'>
        <p className='pb-2'>{product.title}</p>
        <p>Price: ${product.price}</p>
      </div>
      <button className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-4' onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
