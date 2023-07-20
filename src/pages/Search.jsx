import React, { useEffect, useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm, onSearch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='p-5 flex'>
      <input
        type='text'
        placeholder='Enter product name...'
        value={searchTerm}
        onChange={handleSearch}
        className='w-full px-4 py-2 text-lg border border-gray-400 rounded-lg'
      />
      <div>
        <button type='submit' className='ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg'>
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
