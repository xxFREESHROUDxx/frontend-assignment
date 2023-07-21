import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import { ToastContainer } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const productData = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  if (productData.isLoading) return <h1>Loading...</h1>;
  if (productData.isError) return <h1>Error Loading Data!</h1>;

  const product = productData.data.find((item) => item.id === parseInt(id));

  if (!product) return <h1>Product not found!</h1>;

  const getStarIcon = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starArray.push(
          <span key={i} className='text-yellow-400 text-xl'>
            ★
          </span>
        );
      } else if (i === fullStars && halfStar) {
        starArray.push(
          <span key={i} className='text-yellow-400 text-xl'>
            ★
          </span>
        );
      } else {
        starArray.push(
          <span key={i} className='text-gray-300 text-xl'>
            ★
          </span>
        );
      }
    }
    return starArray;
  };

  return (
    <div className='p-5 flex flex-col justify-between items-center'>
      <ToastContainer />
      <div className='grid md:grid-cols-2 gap-6'>
        <div className='flex items-center justify-center p-4 border shadow-lg shadow-gray-500 rounded-lg bg-gray-100'>
          <img
            src={product.image}
            alt={product.title}
            className='w-[500px] h-[700px] rounded-xl shadow-md mb-4'
          />
        </div>
        <div className='border-0 bg-light-gray shadow-lg shadow-gray-500 rounded-xl flex flex-col items-start justify-evenly gap-4 px-6 py-4 text-left'>
          <div className='w-full text-center rounded-lg px-4 py-2 mb-4'>
            <h1 className='text-3xl font-semibold'>{product.title}</h1>
          </div>
          <p className='text-2xl font-semibold mb-4'>
            Price: $<span className='text-3xl font-semibold'>{product.price}</span>
          </p>
          <p className='text-xl mb-4'>
            <span className='font-bold'>Category:</span> {product.category}
          </p>
          <p className='text-xl mb-4'>
            <p className='font-bold mb-1'>Description:</p> {product.description}
          </p>
          <div className='mb-4'>
            <p className='font-bold text-xl'>Rating:</p>
            <div className='flex gap-1'>
              {getStarIcon(product.rating.rate)}
              <p className='text-xl ml-2 text-left'>
                {product.rating.rate} ({product.rating.count} reviews)
              </p>
            </div>
          </div>
          <div className='flex-grow'></div>
          <button onClick={() => addToCart(product)} className=''>
            Add to Cart
          </button>
        </div>
      </div>
      <Link to='/' className='block mt-8 text-blue-500 hover:underline'>
        &larr; Back to Home
      </Link>
    </div>
  );
};

export default ProductDetail;
