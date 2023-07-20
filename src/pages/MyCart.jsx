import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const MyCart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const getTotalPrice = () => {
    const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return total.toFixed(2);
  };

  const handleCheckout = () => {
    alert('Purchase Successful!');
    cartItems.forEach((item) => removeFromCart(item.id));
    localStorage.removeItem('cartItems');
    navigate('/');
  };

  return (
    <div>
      <ToastContainer />
      <h1 className='mt-10 mb-4'>My Cart</h1>
      {cartItems.length === 0 ? (
        <h1>Your cart is empty.</h1>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className='border p-4 mb-4 flex items-center'>
              <img src={item.image} alt={item.title} className='w-20 h-20 mr-4' />
              <div className='flex-grow'>
                <h3 className='text-lg font-bold'>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <div>
                  <button
                    className='bg-blue-500 text-white px-2 py-1 rounded-lg mr-2'
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className='bg-blue-500 text-white px-2 py-1 rounded-lg ml-2'
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className='bg-red-500 text-white px-4 py-2 rounded-lg mt-2'
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h2 className='mt-4'>Total: ${getTotalPrice()}</h2>
          <div className='flex justify-center gap-6'>
            <button
              onClick={() => handleCheckout()}
              className='bg-primary text-white py-3 px-6 rounded-lg shadow-md hover:bg-primary-light mt-4'
            >
              Checkout
            </button>
            <button
              onClick={() => navigate('/')}
              className='bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-400 mt-4'
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart;
