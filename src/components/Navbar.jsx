import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className='bg-[#646cff] h-20 flex items-center px-4 justify-between'>
      <Link to='/'>
        <h1>OnlineStore</h1>
      </Link>
      {/* <div className='border-2 cursor-pointer font-medium hover:bg-red-500 rounded-full h-14 w-14 bg-red-400 flex items-center justify-center'>
        <p>User</p>
      </div> */}
      <Link to='/cart'>
        <div className='border-2 cursor-pointer font-medium hover:bg-red-500 rounded-full h-14 w-14 bg-red-400 flex items-center justify-center'>
          <p className='text-white'>{cartItems.length}</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 ml-1'
            fill='none'
            viewBox='0 0 24 24'
            stroke='white'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 4h16M4 8h16M4 12h16M4 16h16'
            />
          </svg>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
