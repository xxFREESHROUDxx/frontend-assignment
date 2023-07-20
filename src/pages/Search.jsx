import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className='p-5'>
      <form onSubmit={handleSearch} className='flex'>
        <input
          type='text'
          placeholder='Enter product name...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full px-4 py-2 text-lg border border-gray-400 rounded-lg'
        />
        <button type='submit' className='ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg'>
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
