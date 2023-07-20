import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { BsCart2 } from 'react-icons/bs';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className='bg-[#646cff] h-20 flex items-center px-4 justify-between'>
      <Link to='/'>
        <h1>OnlineStore</h1>
      </Link>
      <Link to='/cart'>
        <div className='relative'>
          <BsCart2 className='text-white text-3xl' />
          {cartItems.length > 0 && (
            <div className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center'>
              {cartItems.length}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
