import React, { useEffect, useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='p-5 mb-5 flex'>
      <input
        type='text'
        placeholder='Search product...'
        value={searchTerm}
        onChange={handleSearch}
        className='w-full px-4 py-2 text-lg rounded-3xl bg-white border-2'
      />
    </div>
  );
};

export default Search;
