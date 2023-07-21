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
      <h1 className='mt-10 mb-4 text-3xl font-bold'>My Cart</h1>
      {cartItems.length === 0 ? (
        <h1 className='h-[500px] flex items-center justify-center'>Your cart is empty.</h1>
      ) : (
        <div>
          <table className='w-full mb-4'>
            <thead>
              <tr className='border-b'>
                <th className='py-2'></th>
                <th className='py-2'>Product Name</th>
                <th className='py-2'>Quantity</th>
                <th className='py-2'>Unit Price</th>
                <th className='py-2'>Total</th>
                <th className='py-2'></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className='border-b'>
                  <td className='py-4'>
                    <img src={item.image} alt={item.title} className='w-24 h-24' />
                  </td>
                  <td className='py-4'>
                    <h3 className='text-lg font-bold'>{item.title}</h3>
                  </td>
                  <td className='py-4'>
                    <div className='flex items-center'>
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
                  </td>
                  <td className='py-4'>${item.price}</td>
                  <td className='py-4'>${(item.price * item.quantity).toFixed(2)}</td>
                  <td className='py-4'>
                    <button
                      className='bg-red-500 text-white px-4 py-2 rounded-lg'
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
            <button
              onClick={() => handleCheckout()}
              className='bg-primary text-white py-3 px-6 rounded-lg shadow-md hover:bg-primary-light'
            >
              Checkout
            </button>
            <button
              onClick={() => navigate('/')}
              className='bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-400'
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
