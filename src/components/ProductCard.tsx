import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';
import { Product } from '../context/types';

interface ProductCardProps {
  product: Product;
  addToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const navigate = useNavigate();
  const { darkTheme } = useThemeContext();

  const handleNavigation = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // prevent event propagation to avoid redirection when clicked on the button
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
