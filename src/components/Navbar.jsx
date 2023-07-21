import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { BsCart2 } from 'react-icons/bs';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className='sticky top-0 bg-white z-10 h-20 border-b-2 shadow-sm flex items-center px-4 justify-between'>
      <Link to='/'>
        <h1>
          Online<span className='text-yellow-500'>Store</span>
        </h1>
      </Link>
      <Link to='/cart'>
        <button className='relative rounded-full'>
          <BsCart2 className='text-3xl' size={34} />
          {cartItems.length > 0 && (
            <div className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center'>
              {cartItems.length}
            </div>
          )}
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
