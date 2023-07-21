import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ThemeContext } from '../context/ThemeContext';

const MyCart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const { darkTheme } = useContext(ThemeContext);
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
    <div className={`p-8 rounded-xl ${darkTheme ? 'bg-purple' : ''}`}>
      <ToastContainer />
      <div className='my-6'>
        <h1 className={`text-4xl font-bold ${darkTheme ? 'text-white' : ''}`}>My Cart</h1>
      </div>
      {cartItems.length === 0 ? (
        <div className='h-[500px] flex items-center justify-center'>
          <h1 className={`${darkTheme ? 'text-dark' : ''}`}>Your cart is empty.</h1>
        </div>
      ) : (
        <div>
          <table className='w-full mb-4'>
            <thead>
              <tr className='border-b-2 border-gray-400 text-lg'>
                <th className='py-2'>Image</th>
                <th className='py-2'>Product Name</th>
                <th className='py-2'>Quantity</th>
                <th className='py-2'>Unit Price</th>
                <th className='py-2'>Total</th>
                <th className='py-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className='border-b-2 border-gray-400'>
                  <td className='py-4'>
                    <img src={item.image} alt={item.title} className='w-24 h-24 rounded-xl' />
                  </td>
                  <td className='py-4'>
                    <h3 className='text-base font-bold'>{item.title}</h3>
                  </td>
                  <td className='py-4'>
                    <div className='flex items-center'>
                      <button
                        className='bg-blue-500 border-0 hover:bg-blue-700 text-white px-2 py-1 rounded-lg mr-2'
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className='text-lg font-medium'>{item.quantity}</span>
                      <button
                        className='bg-blue-500 border-0 hover:bg-blue-700 text-white px-2 py-1 rounded-lg ml-2'
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className='py-4 text-lg font-semibold'>${item.price}</td>
                  <td className='py-4 text-lg font-semibold'>
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className='py-4'>
                    <button
                      className='bg-red-500 border-0 hover:bg-red-600 text-white px-4 py-2 shadow-md'
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className='text-4xl font-semibold my-6'>Total: ${getTotalPrice()}</h2>
          <div className='flex justify-center gap-6 my-6'>
            <button onClick={() => handleCheckout()} className='py-3 px-6 shadow-md'>
              Checkout
            </button>
            <button
              onClick={() => navigate('/')}
              className='bg-blue-600 border-0 text-white py-3 px-6 shadow-md hover:bg-blue-700'
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
