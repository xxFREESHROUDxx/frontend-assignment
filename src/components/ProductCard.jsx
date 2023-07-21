import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();

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
      className='rounded-xl overflow-hidden bg-primary cursor-pointer hover:bg-[#1e204c] border p-4 flex flex-col justify-between'
      onClick={() => handleNavigation(product.id)}
    >
      <figure className='relative w-full h-80'>
        <img className='w-full h-full object-cover' src={product.image} alt={product.title} />
      </figure>
      <div className='py-2'>
        <h2 className='text-base font-medium mb-2'>{product.title}</h2>
        <p className='text-base font-semibold mb-2'>Price: ${product.price}</p>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-lg w-full'
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
