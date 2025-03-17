import React from 'react';
import { Input } from 'antd';

const Search = ({ onSearch }) => {
  return (
    <Input
      className="search-bar"
      placeholder="Search movies..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default Search;