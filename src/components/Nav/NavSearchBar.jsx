import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SearchBarWrap = styled.div`
  width: 100%;
`;

const SearchBar = styled.input`
  width: 200px;
  padding: 15px;
  background: rgba(200, 200, 200, 0.5);
`;

const NavSearchBar = () => {
  const [keyword, setKeyword] = useState('');

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setKeyword(value);
  };

  console.log(keyword);

  return (
    <SearchBarWrap>
      <SearchBar type="text" onChange={onChange} placeholder="검색" />
      <Link to={{ pathname: `/search/${keyword}` }}>
        <button>검색</button>
      </Link>
    </SearchBarWrap>
  );
};

export default NavSearchBar;
