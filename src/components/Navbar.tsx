import React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { BsCart2 } from 'react-icons/bs';
import { useThemeContext } from '../context/ThemeContext'; // Import the ThemeContext

const Navbar = () => {
  const { cartItems } = useCartContext();
  const { darkTheme, toggleTheme } = useThemeContext(); // Get the theme and toggleTheme function

  return (
    <div
      className={`sticky top-0 ${
        darkTheme
          ? 'bg-purple'
          : 'bg-light-gray  border-b-2' /* Change this to the desired purple/green class */
      } z-10 h-20 shadow-sm flex items-center px-4 justify-between`}
    >
      <Link to='/'>
        <h1>
          Online<span className={`${darkTheme ? 'text-white' : 'text-purple'}`}>Store</span>
        </h1>
      </Link>
      <div className='flex gap-10'>
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

        <button
          className={`${darkTheme ? 'theme-dark hover:bg-white' : 'hover:bg-black'}`}
          onClick={toggleTheme}
        >
          {darkTheme ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
