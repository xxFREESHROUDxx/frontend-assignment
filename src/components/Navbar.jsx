import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='bg-[#646cff] h-20 flex items-center px-4 justify-between'>
      <Link to='/'>
        <h1>OnlineStore</h1>
      </Link>
      <div className='border-2 cursor-pointer font-medium hover:bg-red-500 rounded-full h-14 w-14 bg-red-400 flex items-center justify-center'>
        <p>User</p>
      </div>
    </div>
  );
};

export default Navbar;
