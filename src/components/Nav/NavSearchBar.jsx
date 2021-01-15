import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

const SearchBarWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBar = styled.input`
  width: 200px;
  padding: 15px;
  background: rgba(200, 200, 200, 0.5);
`;

const NavSearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const history = useHistory();

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setKeyword(value);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      history.push({
        pathname: `/search/${keyword}`,
      });
    }
  };

  return (
    <SearchBarWrap>
      <SearchBar
        type="text"
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="검색"
      />
      <Link to={`/search/${keyword}`}>
        <button>검색</button>
      </Link>
    </SearchBarWrap>
  );
};

export default NavSearchBar;